/**
 * IATA BCBP (Boarding Pass) Parser
 * Biniş kartındaki QR/barcode bilgilerini çıkarır
 */

export interface BoardingPassData {
  passengerName?: string;
  flightNumber?: string;
  flightDate?: string;
  departureAirport?: string;
  arrivalAirport?: string;
  seatNumber?: string;
  boardingTime?: string;
  gate?: string;
  aircraft?: string;
  airlineCode?: string;
  class?: string;
}

/**
 * Biniş kartı metnini parse eder
 * @param text QR/barcode'dan okunan metin
 * @returns Çıkarılan biniş kartı bilgileri
 */
export function parseBoardingPass(text: string): BoardingPassData {
  const result: BoardingPassData = {};
  const cleanText = text.trim().replace(/\s+/g, ' ');

  // M1 formatı (IATA BCBP standart formatı)
  if (cleanText.startsWith('M1')) {
    return parseM1Format(cleanText);
  }

  // Basit metin formatları
  // Format: SURNAME/NAME FLIGHT DATE FROM TO
  const nameMatch = cleanText.match(/([A-Z]{2,20})\/([A-Z]{2,20})/);
  if (nameMatch) {
    result.passengerName = `${nameMatch[2]} ${nameMatch[1]}`;
  }

  // Uçuş numarası (örn: TK1234, LH4567)
  const flightMatch = cleanText.match(/([A-Z]{2}\d{3,4})/i);
  if (flightMatch) {
    result.flightNumber = flightMatch[1].toUpperCase();
  }

  // Havalimanı kodları (3 harfli IATA kodları)
  const airportMatches = cleanText.match(/\b([A-Z]{3})\b/g);
  if (airportMatches && airportMatches.length >= 2) {
    result.departureAirport = airportMatches[0];
    result.arrivalAirport = airportMatches[airportMatches.length - 1];
  }

  // Tarih formatları (DDMMM, DD/MM/YYYY, YYYY-MM-DD)
  const datePatterns = [
    /(\d{2})([A-Z]{3})/i,           // 02JAN, 15DEC
    /(\d{2})\/(\d{2})\/(\d{4})/,    // 15/01/2024
    /(\d{4})-(\d{2})-(\d{2})/,      // 2024-01-15
  ];

  for (const pattern of datePatterns) {
    const match = cleanText.match(pattern);
    if (match) {
      if (match.length === 3) {
        // DDMMM formatı
        const day = match[1].padStart(2, '0');
        const monthAbbr = match[2].toUpperCase();
        const monthMap: Record<string, string> = {
          JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
          JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
        };
        const month = monthMap[monthAbbr] || '01';
        const year = new Date().getFullYear();
        result.flightDate = `${year}-${month}-${day}`;
      } else if (match.length === 4) {
        // DD/MM/YYYY veya YYYY-MM-DD formatı
        result.flightDate = `${match[3]}-${match[2]}-${match[1]}`;
      }
      break;
    }
  }

  // Koltuk numarası (örn: 12A, 5F)
  const seatMatch = cleanText.match(/\b(\d{1,3}[A-Z])\b/);
  if (seatMatch) {
    result.seatNumber = seatMatch[1];
  }

  // Gate (örn: A12, B5)
  const gateMatch = cleanText.match(/(?:GATE|GT)\s*:?\s*([A-Z]\d{1,3})/i);
  if (gateMatch) {
    result.gate = gateMatch[1];
  }

  // Boarding time (örn: 1430, 14:30)
  const timeMatch = cleanText.match(/(?:BOARDING|BRD|BD)\s*:?\s*(\d{4}|\d{2}:\d{2})/i);
  if (timeMatch) {
    let time = timeMatch[1];
    if (time.includes(':')) {
      result.boardingTime = time;
    } else {
      result.boardingTime = `${time.substring(0, 2)}:${time.substring(2)}`;
    }
  }

  return result;
}

/**
 * M1 formatını parse eder (IATA BCBP standart)
 * @param m1Text M1 formatındaki metin
 */
function parseM1Format(m1Text: string): BoardingPassData {
  const result: BoardingPassData = {};
  
  try {
    // M1 formatı: M1[SURNAME/FIRST NAME][FLIGHT DATE][FROM][TO][FLIGHT NUMBER][CLASS][SEAT][BOARDING TIME][...]
    
    // Ad (positions 2-20): Format: SURNAME/FIRST
    const nameStart = 2;
    const nameEnd = 20;
    const namePart = m1Text.substring(nameStart, nameEnd).trim();
    const nameMatch = namePart.match(/([A-Z]{2,20})\/([A-Z]{2,20})/);
    if (nameMatch) {
      result.passengerName = `${nameMatch[2]} ${nameMatch[1]}`;
    }

    // Tarih (positions 21-26): DDMMM format
    const datePart = m1Text.substring(21, 26);
    const day = datePart.substring(0, 2);
    const monthAbbr = datePart.substring(2, 5);
    const monthMap: Record<string, string> = {
      JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
      JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12'
    };
    const month = monthMap[monthAbbr] || '01';
    const year = new Date().getFullYear();
    result.flightDate = `${year}-${month}-${day}`;

    // Kalkış havalimanı (positions 27-29)
    result.departureAirport = m1Text.substring(27, 29);

    // Varış havalimanı (positions 30-32)
    result.arrivalAirport = m1Text.substring(30, 32);

    // Havayolu kodu (positions 33-35)
    result.airlineCode = m1Text.substring(33, 35);

    // Uçuş numarası (positions 35-38)
    const flightNum = m1Text.substring(35, 38).replace(/\s/g, '');
    if (flightNum) {
      result.flightNumber = `${result.airlineCode}${flightNum}`;
    }

    // Sınıf (position 39)
    const classCodes: Record<string, string> = {
      F: 'First', C: 'Business', Y: 'Economy', W: 'Premium Economy'
    };
    result.class = classCodes[m1Text[39]] || 'Economy';

    // Koltuk numarası (positions 40-43)
    const seat = m1Text.substring(40, 43).trim();
    if (seat) {
      result.seatNumber = seat;
    }

    // Boarding time (positions 45-48): HHMM format
    const boardingTime = m1Text.substring(45, 48);
    if (boardingTime) {
      result.boardingTime = `${boardingTime.substring(0, 2)}:${boardingTime.substring(2)}`;
    }

  } catch (error) {
    console.error('Error parsing M1 format:', error);
  }

  return result;
}

/**
 * Biniş kartı verilerini validasyon eder
 * @param data Çıkarılan biniş kartı verileri
 * @returns Validasyon sonucu
 */
export function validateBoardingPassData(data: BoardingPassData): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!data.departureAirport || data.departureAirport.length !== 3) {
    errors.push('Geçerli kalkış havalimanı bulunamadı');
  }

  if (!data.arrivalAirport || data.arrivalAirport.length !== 3) {
    errors.push('Geçerli varış havalimanı bulunamadı');
  }

  if (!data.flightNumber) {
    warnings.push('Uçuş numarası bulunamadı');
  }

  if (!data.flightDate) {
    warnings.push('Uçuş tarihi bulunamadı');
  } else {
    // Tarih geçmiş tarih mi kontrol et
    const flightDate = new Date(data.flightDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (flightDate > today) {
      errors.push('Uçuş tarihi ileri bir tarih');
    } else if (flightDate.getTime() === 0) {
      warnings.push('Uçuş tarihi formatı kontrol edilmeli');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Biniş kartı verilerini ClaimWizard formatına dönüştürür
 * @param data Biniş kartı verileri
 */
export function convertToClaimFormat(data: BoardingPassData): {
  departureAirport?: string;
  arrivalAirport?: string;
  flightNumber?: string;
  flightDate?: string;
  passengerName?: string;
} {
  return {
    departureAirport: data.departureAirport,
    arrivalAirport: data.arrivalAirport,
    flightNumber: data.flightNumber,
    flightDate: data.flightDate,
    passengerName: data.passengerName
  };
}

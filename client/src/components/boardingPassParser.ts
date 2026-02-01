// BoardingPass Parser
// Biniş kartındaki kodu okuma ve doğrulama

export interface BoardingPassData {
  passengerName?: string;
  firstName?: string;
  lastName?: string;
  flightNumber?: string;
  flightDate?: string;
  fromAirport?: string;
  toAirport?: string;
  boardingPass?: string;
}

export function parseBoardingPass(code: string): BoardingPassData | null {
  try {
    const lines = code.split('\n');
    const data: BoardingPassData = {};

    for (const line of lines) {
      // Passenger name (Ad Soyad formatı)
      const nameMatch = line.match(/(?:PASSENGER|NAME|YOLCU)\s*:\s*([A-Z]+(?:\s+[A-Z]+)\s*)/i);
      if (nameMatch) {
        const parts = nameMatch[1].trim().split(/\s+/);
        if (parts.length >= 2) {
          data.firstName = parts.slice(0, -1).join(' ');
          data.lastName = parts.slice(-1)[0];
        }
        continue;
      }

      // Flight number
      const flightMatch = line.match(/(?:FLIGHT|FLIGHT\s+NO|UÇUŞ\s+NO|UÇUŞ)\s*([A-Z]{2}\s*\d{3,4})/i);
      if (flightMatch) {
        data.flightNumber = flightMatch[1].trim();
        continue;
      }

      // Flight date
      const dateMatch = line.match(/\b(\d{1,2}\.\d{1,2})\.\d{4}\b/i);
      if (dateMatch) {
        const [, day, month, year] = dateMatch;
        data.flightDate = `${day}/${month}/${year}`;
        continue;
      }

      // Airports
      const airportCode = line.match(/(?:FROM|TO)\s*([A-Z]{3})\b/i);
      if (airportCode && airportCode[1]) {
        const code = airportCode[1];
        if (!data.fromAirport) {
          data.fromAirport = code;
        }
        if (!data.toAirport) {
          data.toAirport = code;
        }
      }

      // Boarding pass
      const passMatch = line.match(/(?:BOARDING\s*PASS|BOARDING\s+PASS)\s*([A-Z0-9]{6}\s*\d{4}[A-Z0-9]{2})/i);
      if (passMatch) {
        data.boardingPass = passMatch[1].trim();
      }
    }

    // Validate data
    if (data.passingPass && !data.passengerName) {
      data.passengerName = data.boardingPass || 'Bilinmeyen';
    }

    if (!data.flightNumber && !data.flightDate) {
      return null; // Invalid data
    }

    return Object.keys(data).length > 0 ? data : null;
  } catch (error) {
    console.error('Error parsing boarding pass:', error);
    return null;
  }
}

export function validateBoardingPassData(data: BoardingPassData): string[] {
  const warnings: string[] = [];

  if (!data.passengerName) {
    warnings.push('Yolcu adı eksik');
  }

  if (!data.flightNumber) {
    warnings.push('Uçuş numarası eksik');
  }

  if (!data.flightDate) {
    warnings.push('Uçuş tarihi eksik');
  }

  if (!data.fromAirport || !data.toAirport) {
    warnings.push('Havalimanı eksik');
  }

  if (!data.boardingPass) {
    warnings.push('Boarding pass eksik');
  }

  return warnings;
}

export function convertToClaimFormat(data: BoardingPassData) {
  return {
    passengerName: data.passengerName || '',
    lastName: data.lastName || '',
    flightNumber: data.flightNumber || '',
    flightDate: data.flightDate || '',
    departureAirport: data.fromAirport || '',
    arrivalAirport: data.toAirport || '',
    boardingPass: data.boardingPass || '',
  };
};

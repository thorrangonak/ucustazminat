import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Camera, Upload, X, Check, Loader2 } from 'lucide-react';
import { Html5Qrcode, Html5QrcodeResult } from 'html5-qrcode';
import { parseBoardingPass, validateBoardingPassData, convertToClaimFormat, type BoardingPassData } from './boardingPassParser';

interface BoardingPassScannerProps {
  onScanSuccess: (data: BoardingPassData) => void;
  onCancel?: () => void;
}

export default function BoardingPassScanner({ onScanSuccess, onCancel }: BoardingPassScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scannedData, setScannedData] = useState<BoardingPassData | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      // Component unmount olduğunda scanner'ı temizle
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanner = async () => {
    setError(null);
    setIsScanning(true);

    try {
      const html5QrCode = new Html5Qrcode('reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        onScanSuccessHandler,
        (errorMessage) => {
          // Sürekli scan hatalarını yoksay (normal durum)
        }
      );
    } catch (err) {
      console.error('Scanner başlatma hatası:', err);
      setError('Kamera başlatılamadı. Lütfen izinleri kontrol edin.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    setIsScanning(false);
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (err) {
        console.error('Scanner durdurma hatası:', err);
      }
    }
  };

  const onScanSuccessHandler = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
    await stopScanner();
    handleDecodedText(decodedText);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const html5QrCode = new Html5Qrcode('reader');
      const result = await html5QrCode.scanFile(file, true);
      
      await handleDecodedText(result);
    } catch (err) {
      console.error('Dosya tarama hatası:', err);
      setError('Biniş kartı okunamadı. Lütfen net bir fotoğraf yükleyin.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDecodedText = async (decodedText: string) => {
    try {
      const data = parseBoardingPass(decodedText);
      const validation = validateBoardingPassData(data);

      setScannedData(data);
      setWarnings(validation.warnings);

      if (validation.isValid) {
        // Otomatik olarak kabul et
        setTimeout(() => {
          onScanSuccess(data);
        }, 500);
      } else if (validation.errors.length > 0) {
        setError(validation.errors.join('\n'));
      }
    } catch (err) {
      console.error('Decode hatası:', err);
      setError('Biniş kartı bilgileri çıkarılamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleConfirm = () => {
    if (scannedData) {
      onScanSuccess(scannedData);
    }
  };

  const handleRetry = () => {
    setScannedData(null);
    setWarnings([]);
    setError(null);
  };

  if (scannedData) {
    return (
      <div className="p-6 space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-bold mb-2">Biniş Kartı Okundu</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Aşağıdaki bilgileri kontrol edin ve onaylayın
          </p>
        </div>

        <div className="bg-secondary rounded-lg p-4 space-y-3">
          {scannedData.passengerName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Yolcu</span>
              <span className="font-medium text-sm">{scannedData.passengerName}</span>
            </div>
          )}
          {scannedData.flightNumber && (
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Uçuş Numarası</span>
              <span className="font-medium text-sm">{scannedData.flightNumber}</span>
            </div>
          )}
          {scannedData.flightDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Uçuş Tarihi</span>
              <span className="font-medium text-sm">{scannedData.flightDate}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Güzergah</span>
            <span className="font-medium text-sm">
              {scannedData.departureAirport} → {scannedData.arrivalAirport}
            </span>
          </div>
          {scannedData.seatNumber && (
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Koltuk</span>
              <span className="font-medium text-sm">{scannedData.seatNumber}</span>
            </div>
          )}
          {scannedData.gate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Gate</span>
              <span className="font-medium text-sm">{scannedData.gate}</span>
            </div>
          )}
        </div>

        {warnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-700">
                <p className="font-medium mb-1">Dikkat:</p>
                <ul className="list-disc list-inside space-y-1">
                  {warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button onClick={handleRetry} variant="outline" className="flex-1">
            Tekrar Tara
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Onayla ve Devam Et
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Biniş Kartı Tara</h3>
        <p className="text-sm text-muted-foreground">
          Biniş kartınızın QR kodunu veya barkodunu tarayarak otomatik bilgileri alın
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700 whitespace-pre-line">{error}</div>
          </div>
        </div>
      )}

      {!isScanning && (
        <div className="space-y-3">
          <Button
            onClick={startScanner}
            className="w-full"
            size="lg"
          >
            <Camera className="w-4 h-4 mr-2" />
            Kameradan Tara
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-foreground/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">veya</span>
            </div>
          </div>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant="outline"
            size="lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            Fotoğraf Yükle
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {isScanning && (
        <div className="space-y-3">
          <div className="bg-black rounded-lg overflow-hidden">
            <div id="reader" className="w-full" />
          </div>
          <Button
            onClick={stopScanner}
            variant="outline"
            className="w-full"
          >
            <X className="w-4 h-4 mr-2" />
            İptal
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="flex items-center justify-center gap-2 py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-sm">Okunuyor...</span>
        </div>
      )}

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          QR kod veya barkodun okunabilir olduğundan emin olun
        </p>
      </div>

      {onCancel && (
        <Button
          onClick={onCancel}
          variant="ghost"
          className="w-full text-sm"
        >
          Vazgeç
        </Button>
      )}
    </div>
  );
}

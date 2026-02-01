import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Camera, Upload, RefreshCw, FileText } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { toast } from "sonner";

interface QRScannerProps {
  onClose: () => void;
  onScan: (result: string) => void;
}

export function QRScanner({ onClose, onScan }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerId = "qr-scanner-container";
  const [isScanning, setIsScanning] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    setError("");
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(containerId);
      }

      const cameras = await Html5Qrcode.getCameras();
      
      if (cameras && cameras.length > 0) {
        await scannerRef.current.start(
          cameras[0].id,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            onScan(decodedText);
            stopScanner();
          },
          () => {}
        );
        setIsScanning(true);
        setCameraPermission(true);
      } else {
        setError("Kamera bulunamadı");
        setCameraPermission(false);
      }
    } catch (err) {
      console.error("Kamera hatası:", err);
      setError("Kamera izni reddedildi veya kamera kullanılamıyor");
      setCameraPermission(false);
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Scanner durdurulurken hata:", err);
      }
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log("Dosya yükleniyor:", file.name, file.type, file.size);

    // Dosya boyutu kontrolü
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Dosya boyutu 10MB'dan büyük olamaz");
      return;
    }

    try {
      // Resim dosyası olarak geçerli olduğundan emin ol
      const isValidImage = await validateImageFile(file);
      if (!isValidImage) {
        toast.error("Lütfen geçerli bir resim dosyası yükleyin");
        return;
      }

      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(containerId);
      }

      console.log("QR taraması başlıyor...");
      const result = await scannerRef.current.scanFile(file, true);
      console.log("QR tarama sonucu:", result);
      
      if (result) {
        onScan(result);
        toast.success("QR kod başarıyla tarandı!");
        onClose();
      } else {
        toast.error("Fotoğrafta QR veya barkod bulunamadı. Lütfen daha net bir fotoğraf yükleyin.");
      }
    } catch (err) {
      console.error("Dosya tarama hatası detayı:", err);
      
      const errorStr = String(err);
      
      if (errorStr.includes("No QR code found") || errorStr.includes("No MultiFormatReader")) {
        toast.error("Fotoğrafta QR veya barkod bulunamadı. Lütfen daha net bir fotoğraf yükleyin.");
      } else if (errorStr.includes("File size")) {
        toast.error("Dosya boyutu çok büyük");
      } else if (errorStr.includes("not an image") || errorStr.includes("invalid")) {
        toast.error("Lütfen geçerli bir resim dosyası yükleyin (JPG, PNG)");
      } else if (errorStr.includes("Html5Qrcode") || errorStr.includes("not defined")) {
        toast.error("QR tarayıcı yüklenemedi. Lütfen sayfayı yenileyin.");
      } else {
        toast.error("QR kod taranırken bir hata oluştu: " + errorStr.substring(0, 100));
      }
    }
  };
  
  const validateImageFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        console.log("Resim doğrulandı:", img.width, "x", img.height);
        resolve(true);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        console.error("Resim doğrulanamadı");
        resolve(false);
      };
      
      img.src = url;
      
      setTimeout(() => {
        if (!img.complete) {
          URL.revokeObjectURL(url);
          console.error("Resim yükleme zaman aşımı");
          resolve(false);
        }
      }, 5000);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Biniş Kartı Tara</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                stopScanner();
                onClose();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {!isScanning ? (
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg text-center">
                <Camera className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Biniş kartınızdaki QR veya barkodu taramak için kamera kullanın veya
                  bir fotoğraf yükleyin.
                </p>
              </div>

              <Button onClick={startScanner} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Kamera ile Tara
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">veya</span>
                </div>
              </div>

              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" className="w-full" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Fotoğraf Yükle
                  </span>
                </Button>
              </label>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div id={containerId} className="w-full rounded-lg overflow-hidden" />
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={stopScanner}>
                  <X className="w-4 h-4 mr-2" />
                  Durdur
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => {
                  stopScanner();
                  startScanner();
                }}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Yeniden Başlat
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                QR veya barkodu kameraya doğru tutun
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function QRScannerButton({ onScan }: { onScan: (result: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        <Camera className="w-4 h-4 mr-2" />
        QR Tara
      </Button>
      {isOpen && <QRScanner onClose={() => setIsOpen(false)} onScan={(result) => {
        onScan(result);
        setIsOpen(false);
      }} />}
    </>
  );
}

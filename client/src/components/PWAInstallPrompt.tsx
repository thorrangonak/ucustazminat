import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, X, Smartphone, Zap, 
  CheckCircle, Clock, Wifi
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // iOS kontrolü
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                          (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 0);
    setIsIOS(isIOSDevice);

    // PWA yüklü kontrolü
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone;
    setIsInstalled(isInStandaloneMode);

    // Install prompt dinleyicisi
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // 5 saniye sonra otomatik göster
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // 7 gün boyunca gösterme
  const lastDismissed = localStorage.getItem('pwa-install-dismissed');
  const shouldShow = lastDismissed 
    ? Date.now() - parseInt(lastDismissed) > 7 * 24 * 60 * 60 * 1000
    : true;

  if (!shouldShow || isInstalled || !showPrompt) {
    return null;
  }

  // iOS için özel prompt
  if (isIOS) {
    return (
      <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-background border border-border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-lg"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">Uygulamayı Kurun</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Safari'de <strong>Paylaş</strong> butonuna tıklayın ve <strong>"Ana Ekrana Ekle"</strong> seçeneğini seçin.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <span>Safari'de Paylaş butonuna tıkla</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <span>"Ana Ekrana Ekle" seç</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-5 h-5 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <span>Uygulama ekranınıza eklendi!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Android/Desktop için prompt
  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-background border border-border rounded-lg shadow-lg p-4 z-50 animate-in slide-in-from-bottom-4">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-lg"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-sm mb-1">Uygulamayı Kurun</h3>
          <p className="text-xs text-muted-foreground mb-3">
            UçuşTazminat'ı masaüstünüzde veya mobil cihazınızda kullanmak için uygulama olarak kurun.
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Hızlı erişim ve offline çalışma</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Anlık bildirimler</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Wifi className="w-4 h-4 text-green-500" />
              <span>Uygulama gibi deneyim</span>
            </div>
          </div>

          <Button onClick={handleInstall} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Kur
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PWAInstallButton({ className }: { className?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                          (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 0);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        alert('Safari\'de Paylaş → Ana Ekrana Ekle seçeneğini seçin.');
      }
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <Button
      onClick={handleInstall}
      variant={deferredPrompt ? 'default' : 'outline'}
      className={className}
      size="sm"
    >
      {deferredPrompt ? (
        <>
          <Download className="w-4 h-4 mr-2" />
          Uygulamayı Kur
        </>
      ) : (
        <>
          <Smartphone className="w-4 h-4 mr-2" />
          Uygulamayı İndir
        </>
      )}
    </Button>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Bell, BellOff, CheckCircle, XCircle } from 'lucide-react';

export default function PushNotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkSupport();
  }, []);

  const checkSupport = () => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setIsSupported(supported);

    if (supported && Notification.permission) {
      setPermission(Notification.permission);
      setIsEnabled(Notification.permission === 'granted');
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      toast.error('Tarayıcınız bildirimleri desteklemiyor');
      return;
    }

    setIsLoading(true);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setIsEnabled(result === 'granted');

      if (result === 'granted') {
        toast.success('Bildirimler aktif edildi!');
        await subscribeToPush();
      } else if (result === 'denied') {
        toast.error('Bildirim izni reddedildi');
      }
    } catch (error) {
      console.error('Bildirim izni hatası:', error);
      toast.error('Bildirim izni alınamadı');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY,
      });

      console.log('Push subscription:', subscription);
      // Backend'e gönder
      // await trpc.push.subscribe.mutate({ subscription });
    } catch (error) {
      console.error('Push subscription hatası:', error);
    }
  };

  const toggleNotifications = (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      requestPermission();
    } else if (!enabled) {
      toast.info('Tarayıcı ayarlarından bildirimleri devre dışı bırakabilirsiniz');
    }
  };

  const testNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('UçuşTazminat', {
        body: 'Bu bir test bildirimidir!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        vibrate: [200, 100, 200],
        tag: 'test-notification',
      });
      toast.success('Test bildirimi gönderildi!');
    } else {
      toast.error('Önce bildirim izni vermelisiniz');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isEnabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
          Bildirim Ayarları
        </CardTitle>
        <CardDescription>
          Talep durum güncellemeleri ve önemli duyurular için bildirimleri aktif edin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Push Bildirimleri</p>
            <p className="text-sm text-muted-foreground">
              {isEnabled ? 'Aktif' : 'Pasif'}
            </p>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={toggleNotifications}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          {permission === 'granted' ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : permission === 'denied' ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <div className="w-4 h-4 rounded-full bg-muted" />
          )}
          <span className="text-muted-foreground">
            İzin durumu:{' '}
            {permission === 'granted'
              ? 'İzin verildi'
              : permission === 'denied'
              ? 'Reddedildi'
              : 'Henüz talep edilmedi'}
          </span>
        </div>

        {permission === 'denied' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            Bildirimler tarayıcı ayarlarından devre dışı bırakıldı.
            Ayarlarınızı kontrol edip tekrar deneyebilirsiniz.
          </div>
        )}

        {isEnabled && (
          <Button
            onClick={testNotification}
            variant="outline"
            className="w-full"
            size="sm"
          >
            Test Bildirimi Gönder
          </Button>
        )}

        {permission !== 'granted' && (
          <Button
            onClick={requestPermission}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'İsteniyor...' : 'Bildirimlere İzin Ver'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export async function sendPushNotification(title: string, body: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [200, 100, 200],
      ...options,
    });
  }
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const supported = 'Notification' in window;
    setIsSupported(supported);
    if (supported && Notification.permission) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return false;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result === 'granted';
  };

  return {
    permission,
    isSupported,
    requestPermission,
    canShow: permission === 'granted',
  };
}

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, TrendingUp, Gift, Zap, Users } from 'lucide-react';
import { toast } from 'sonner';

interface AffiliateStats {
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: string;
  conversionRate: number;
}

export default function AffiliateProgram() {
  const [affiliateCode, setAffiliateCode] = useState('UCAFF-2024-XXXX');
  const [copied, setCopied] = useState(false);

  const stats: AffiliateStats = {
    totalReferrals: 47,
    successfulReferrals: 23,
    totalEarnings: '€2,875',
    conversionRate: 48.9,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(affiliateCode);
      setCopied(true);
      toast.success('Bağlantı kopyalandı!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Kopyalama başarısız');
    }
  };

  const copyReferralLink = async () => {
    const link = `https://ucustazminat.com/?ref=${affiliateCode}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Referans bağlantısı kopyalandı!');
    } catch (error) {
      toast.error('Kopyalama başarısız');
    }
  };

  return (
    <div className="space-y-6">
      {/* Program Info */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-primary" />
            Affiliate Programı
          </CardTitle>
          <CardDescription>
            Arkadaşlarınızı davet edin ve başarılı her başvuru için %25 komisyon kazanın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-blue-600">%25</p>
              <p className="text-xs text-muted-foreground">Komisyon</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-600">€100</p>
              <p className="text-xs text-muted-foreground">Min. Ödeme</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-600">Sınırsız</p>
              <p className="text-xs text-muted-foreground">Referans</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-600">€10</p>
              <p className="text-xs text-muted-foreground">Hoşgeldin Bonus</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affiliate Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Toplam Referans</p>
            <p className="text-2xl font-bold">{stats.totalReferrals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Başarılı Referans</p>
            <p className="text-2xl font-bold">{stats.successfulReferrals}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Toplam Kazanç</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalEarnings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Dönüşüm Oranı</p>
            <p className="text-2xl font-bold">{stats.conversionRate}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Affiliate Code & Link */}
      <Card>
        <CardHeader>
          <CardTitle>Referans Bağlantınız</CardTitle>
          <CardDescription>
            Bu bağlantıyı paylaşın ve başarılı başvurulardan kazanın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Affiliate Kodu</label>
            <div className="flex gap-2">
              <Input value={affiliateCode} readOnly className="font-mono" />
              <Button onClick={copyToClipboard} variant="outline" size="icon">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Referans Bağlantısı</label>
            <div className="flex gap-2">
              <Input
                value={`https://ucustazminat.com/?ref=${affiliateCode}`}
                readOnly
                className="font-mono text-sm"
              />
              <Button onClick={copyReferralLink} variant="outline" size="icon">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={copyReferralLink}>
              <Copy className="w-4 h-4 mr-2" />
              Kopyala
            </Button>
            <Button className="flex-1" onClick={copyReferralLink}>
              <Zap className="w-4 h-4 mr-2" />
              Paylaş
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>Nasıl Çalışır?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Kodunuzu Paylaşın</p>
                <p className="text-sm text-muted-foreground">
                  Affiliate kodunuzu veya bağlantınızı arkadaşlarınızla paylaşın
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Başvuru Yapılsın</p>
                <p className="text-sm text-muted-foreground">
                  Referanslarınız kodunuzu kullanarak talep oluştursun
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Komisyon Kazanın</p>
                <p className="text-sm text-muted-foreground">
                  Başarılı her başvuruda %25 komisyon kazanın
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Ödeme Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Minimum Ödeme Tutarı</span>
              <span className="font-medium">€100</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Ödeme Dönemi</span>
              <span className="font-medium">Aylık</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Ödeme Yöntemleri</span>
              <span className="font-medium">Banka Havalesi / PayPal</span>
            </div>
          </div>
          <Badge variant="secondary" className="mt-4">
            Sonraki ödeme tarihi: 15 Şubat 2024
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}

export function ReferAFriend() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Davet e-postası gönderildi!');
      setEmail('');
    } catch (error) {
      toast.error('Davet gönderilemedi');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Arkadaşını Davet Et
        </CardTitle>
        <CardDescription>
          Her başarılı arkadaş daveti için €20 kazanın
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={sendInvite} className="flex gap-2">
          <Input
            type="email"
            placeholder="arkadas@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSending}
          />
          <Button type="submit" disabled={isSending}>
            {isSending ? '...' : 'Davet Et'}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Arkadaşınız talep oluşturduğunda €20 kazanacaksınız
        </div>
      </CardContent>
    </Card>
  );
}

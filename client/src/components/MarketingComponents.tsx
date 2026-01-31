import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, Check, Gift, Users, Share2, 
  Copy, ArrowRight, AlertCircle
} from 'lucide-react';

interface NewsletterSectionProps {
  className?: string;
}

export function NewsletterSection({ className }: NewsletterSectionProps = {}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simüle edilmiş API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
  };

  if (isSubscribed) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-800">Teşekkürler! 🎉</h3>
            <p className="text-sm text-green-700 mt-1">
              E-posta bültenimize başarıyla kaydoldunuz. Yolcu hakları ve tazminat ipuçları için takipte kalın.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-secondary rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Mail className="w-5 h-5 text-primary" />
        Bültenimize Katılın
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Yolcu hakları, tazminat ipuçları ve özel teklifler için ücretsiz e-posta bültenimize katılın.
      </p>
      <form onSubmit={handleSubscribe} className="space-y-3">
        <Input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        Spam yok, istediğiniz zaman aboneliği iptal edebilirsiniz.
      </p>
    </div>
  );
}

interface ReferralData {
  referralCode: string;
  referralUrl: string;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarned: number;
}

export function ReferAFriendSection() {
  const [referralData] = useState<ReferralData>({
    referralCode: 'UT' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    referralUrl: 'https://ucustazminat.com?ref=',
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarned: 0
  });
  const [copied, setCopied] = useState(false);

  const copyReferralLink = () => {
    const fullLink = referralData.referralUrl + referralData.referralCode;
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Gift className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Arkadaşını Davet Et, Kazan!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Arkadaşlarınızı UçuşTazminat'a davet edin, her başarılı davet için <strong className="text-primary">25€</strong> kazanın!
          </p>

          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Davet Kodunuz</div>
              <div className="flex items-center gap-2">
                <Input
                  value={referralData.referralCode}
                  readOnly
                  className="font-mono text-base"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(referralData.referralCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button className="w-full" onClick={copyReferralLink}>
              {copied ? 'Kopyalandı!' : 'Davet Linkini Kopyala'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="mt-4 p-3 bg-background rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Nasıl Çalışır?</h4>
            <ol className="text-xs text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Arkadaşınıza yukarıdaki davet kodunu veya linki gönderin</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Arkadaşınız tazminat talebi oluşturur ve kazanır</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Hesabınıza otomatik olarak 25€ krediniz yüklenir</span>
              </li>
            </ol>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-background rounded-lg p-2">
              <div className="text-lg font-bold text-primary">{referralData.totalReferrals}</div>
              <div className="text-xs text-muted-foreground">Toplam Davet</div>
            </div>
            <div className="bg-background rounded-lg p-2">
              <div className="text-lg font-bold text-primary">{referralData.successfulReferrals}</div>
              <div className="text-xs text-muted-foreground">Başarılı</div>
            </div>
            <div className="bg-background rounded-lg p-2">
              <div className="text-lg font-bold text-primary">{referralData.totalEarned}€</div>
              <div className="text-xs text-muted-foreground">Kazanç</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AffiliateProgramSection() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-6 border border-purple-500/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Partnerlik Programı</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Seyahat acenteleri, blog yazarları ve sosyal medya fenomenleri için özel partnerlik programı.
          </p>

          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <div className="font-semibold text-sm">%10-15 Komisyon</div>
                <div className="text-xs text-muted-foreground">Her başarılı tazminattan yüksek komisyon</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <div className="font-semibold text-sm">İzleme Paneli</div>
                <div className="text-xs text-muted-foreground">Gerçek zamanlı istatistikler ve raporlar</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <div className="font-semibold text-sm">Pazarlama Materyalleri</div>
                <div className="text-xs text-muted-foreground">Bannerlar, sosyal medya içerikleri ve e-posta şablonları</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Başvur
            </Button>
            <Button variant="outline" className="flex-1">
              <ArrowRight className="w-4 h-4 mr-2" />
              Detaylı Bilgi
            </Button>
          </div>

          <div className="mt-4 p-3 bg-background rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <strong className="text-foreground">Not:</strong> Partnerlik programımız için minimum 100 aylık ziyaret gereklidir. Başvurunuz 48 saat içinde değerlendirilecektir.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

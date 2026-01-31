import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, Check, X, Info, Clock, Euro, 
  CreditCard, Star, ArrowRight, Zap
} from 'lucide-react';

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  currency: 'EUR' | 'USD' | 'TRY';
  features: string[];
  recommended?: boolean;
  icon?: React.ElementType;
}

const PREMIUM_PLANS: PremiumPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.90,
    period: 'month',
    currency: 'EUR',
    features: [
      'Standart tazminat talep',
      '4-8 hafta işlem süresi',
      '%25 komisyon',
      'E-posta desteği',
      'Talep takibi'
    ],
    recommended: false,
    icon: Shield
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.90,
    period: 'month',
    currency: 'EUR',
    features: [
      'Hızlı işlem (2-4 hafta)',
      'Öncelikli destek',
      'Canlı sohbet desteği',
      'SMS bildirimleri',
      '%20 komisyon',
      'Uçuş koruma sigortası',
      'Yıllık 500€ tazminat limiti'
    ],
    recommended: true,
    icon: Star
  },
  {
    id: 'business',
    name: 'Business',
    price: 49.90,
    period: 'month',
    currency: 'EUR',
    features: [
      'Ultra hızlı işlem (1-2 hafta)',
      'Özel müşteri temsilcisi',
      '7/24 telefon desteği',
      'Yıllık 2.000€ tazminat limiti',
      'Full travel insurance',
      'Lounge access hakları',
      'Gecikme anında ödeme (24 saatte)',
      'Sıfır komisyon'
    ],
    recommended: false,
    icon: Zap
  }
];

export default function PremiumPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [annualBilling, setAnnualBilling] = useState(false);

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // Gerçek uygulamada subscription API'si çağrılır
    console.log('Subscribe to plan:', planId, 'Annual:', annualBilling);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Premium Paketler</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          İşlemlerinizi hızlandırın ve ekstra avantajlar kazanın. İhtiyacınıza en uygun planı seçin.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm ${!annualBilling ? 'font-semibold' : 'text-muted-foreground'}`}>
          Aylık
        </span>
        <button
          onClick={() => setAnnualBilling(!annualBilling)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            annualBilling ? 'bg-primary' : 'bg-secondary'
          }`}
        >
          <div className={`absolute top-1 w-5 h-5 bg-background rounded-full transition-transform ${
            annualBilling ? 'right-1' : 'left-1'
          }`} />
        </button>
        <span className={`text-sm ${annualBilling ? 'font-semibold' : 'text-muted-foreground'}`}>
          Yıllık
          {annualBilling && (
            <Badge className="ml-2 bg-green-100 text-green-800">
              %20 indirim
            </Badge>
          )}
        </span>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {PREMIUM_PLANS.map((plan) => {
          const Icon = plan.icon;
          const annualPrice = Math.round(plan.price * 12 * 0.8);
          const displayPrice = annualBilling ? annualPrice / 12 : plan.price;
          
          return (
            <Card
              key={plan.id}
              className={`relative ${
                plan.recommended ? 'border-2 border-primary shadow-lg' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white">En Popüler</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="text-3xl font-bold">
                    {displayPrice.toFixed(2)}€
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {annualBilling ? '/ay (yıllık faturalandırma)' : '/ay'}
                  </div>
                  {annualBilling && (
                    <div className="text-xs text-green-600 mt-1">
                      Aylık {plan.price}€ yerine, yılda {(plan.price * 12).toFixed(2)}€ ödeyin
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.recommended ? 'default' : 'outline'}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Seçildi' : 'Seç'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Karşılaştırma</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Özellik</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Basic</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Premium</th>
                  <th className="text-center py-3 px-4 font-semibold text-sm">Business</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'İşlem Süresi', basic: '4-8 hafta', premium: '2-4 hafta', business: '1-2 hafta' },
                  { feature: 'Komisyon', basic: '%25', premium: '%20', business: 'Sıfır' },
                  { feature: 'Destek', basic: 'E-posta', premium: 'Canlı Sohbet', business: '7/24 Telefon' },
                  { feature: 'Bildirimler', basic: 'E-posta', premium: 'SMS + E-posta', business: 'SMS + E-posta + Push' },
                  { feature: 'Travel Insurance', basic: <X className="w-4 h-4 text-red-500 mx-auto" />, premium: <Check className="w-4 h-4 text-green-600 mx-auto" />, business: <Check className="w-4 h-4 text-green-600 mx-auto" /> },
                  { feature: 'Gecikme Ödeme Süresi', basic: 'Standart', premium: 'Standart', business: '24 saat' },
                  { feature: 'Lounge Access', basic: <X className="w-4 h-4 text-red-500 mx-auto" />, premium: <X className="w-4 h-4 text-red-500 mx-auto" />, business: <Check className="w-4 h-4 text-green-600 mx-auto" /> },
                  { feature: 'Tazminat Limiti/Yıl', basic: 'Sınırsız', premium: '500€', business: '2.000€' }
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-secondary/50">
                    <td className="py-3 px-4 text-sm font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-sm">{row.basic}</td>
                    <td className="py-3 px-4 text-center text-sm">
                      <span className="text-primary font-medium">{row.premium}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-sm">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Sıkça Sorulan Sorular
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Premium planı ne zaman mantıklı?</h4>
            <p className="text-sm text-muted-foreground">
              Yılda birden fazla seyahat ediyorsanız veya süreci hızlandırmak istiyorsanız Premium plan önerilir.
              %5 daha düşük komisyon ve öncelikli desteğe sahip olursunuz.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Business planında ne fark var?</h4>
            <p className="text-sm text-muted-foreground">
              Sık sık seyahat edenler veya şirketler için idealdir. Sıfır komisyon, 7/24 telefon desteği ve
              lounge access hakları sunar. Ayrıca travel insurance tam kapsamlıdır.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Planı nasıl iptal edebilirim?</h4>
            <p className="text-sm text-muted-foreground">
              İstediğiniz zaman planınızı iptal edebilirsiniz. İptal sonrasında işlenmekte olan talepleriniz
              mevcut plan kapsamında tamamlanır.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Insurance Info */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Uçuş Koruma Sigortası</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Premium ve Business planlar, travel insurance kapsar. Bu sigorta uçuş iptali, gecikme,
                bagaj kaybı gibi durumlarda ekstra tazminat sağlar.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  24 saatte ödeme
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Euro className="w-3 h-3 mr-1" />
                  Ek €500 tazminat
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <CreditCard className="w-3 h-3 mr-1" />
                  Full kapsamlı
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

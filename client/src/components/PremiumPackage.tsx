import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Shield, Crown, Check, Star, Lounge, CreditCard, Zap, Plane, Headphones } from 'lucide-react';
import { useCurrency, formatCurrency } from '@/contexts/LanguageContext';

interface PremiumFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  available: boolean;
}

const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    icon: CreditCard,
    title: 'Ücretsiz Tazminat Hizmeti',
    description: 'Başarılı tazminatlarda komisyon ödemezsiniz',
    available: true,
  },
  {
    icon: Lounge,
    title: 'Havalimanı Lounge Erişimi',
    description: 'İştirak edilen havalimanlarında lounge erişimi',
    available: true,
  },
  {
    icon: Plane,
    title: 'Öncelikli İşlem',
    description: 'Talepleriniz öncelikli olarak işlenir',
    available: true,
  },
  {
    icon: Headphones,
    title: '7/24 Premium Destek',
    description: 'Dedike premium destek ekibi',
    available: true,
  },
  {
    icon: Zap,
    title: 'Hızlı Ödeme',
    description: 'Ödemeler 48 saat içinde yapılır',
    available: true,
  },
  {
    icon: Star,
    title: 'Özel Hediye ve İndirimler',
    description: 'Seyahat partnerlerinde özel indirimler',
    available: true,
  },
];

const PLANS = [
  {
    id: 'basic',
    name: 'Standart',
    price: 0,
    period: 'ücretsiz',
    description: 'Temel tazminat hizmeti',
    features: [
      'Tazminat talebi oluşturma',
      '%25 başarı ücreti',
      'Standart destek',
      '24 saat içinde yanıt',
    ],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 499,
    period: 'yıllık',
    description: 'Tam koruma paketi',
    features: [
      'Tüm Premium özellikler',
      'Sıfır komisyon',
      'Öncelikli işlem',
      '7/24 premium destek',
      'Lounge erişimi',
      '48 saat ödeme',
    ],
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 1499,
    period: 'yıllık',
    description: 'Kurumsal çözümler',
    features: [
      'Sınırsız talep',
      'Dedike hesap yöneticisi',
      'Özel API entegrasyonu',
      'Detaylı raporlama',
      'Faturalandırma',
    ],
    popular: false,
  },
];

export default function PremiumPackage() {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const { currency } = useCurrency();

  const handleSubscribe = async (planId: string) => {
    setSelectedPlan(planId);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`${planId.toUpperCase()} planına abone oldunuz!`);
  };

  const getPlanPrice = (price: number) => {
    if (price === 0) return 'Ücretsiz';
    return formatCurrency(price);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold">Uçuş Koruma Paketi</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Her uçuşunuzda koruma ve ayrıcalık
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary">AirHelp+ benzeri</Badge>
          <Badge variant="secondary">Tam koruma</Badge>
          <Badge variant="secondary">Ayrıcalıklı hizmet</Badge>
        </div>
      </div>

      {/* Stats Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-primary" />
                <p className="text-2xl font-bold">24,891</p>
              </div>
              <p className="text-sm text-muted-foreground">Premium Üye</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <p className="text-2xl font-bold text-green-600">%0</p>
              </div>
              <p className="text-sm text-muted-foreground">Komisyon</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-orange-600" />
                <p className="text-2xl font-bold">48 saat</p>
              </div>
              <p className="text-sm text-muted-foreground">Ödeme Süresi</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <p className="text-2xl font-bold">4.9/5</p>
              </div>
              <p className="text-sm text-muted-foreground">Üye Puanı</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Premium Özellikler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PREMIUM_FEATURES.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    {feature.available && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                        <Check className="w-3 h-3" />
                        Premium ile dahil
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Crown className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Paketler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative hover:shadow-2xl transition-all ${
                plan.popular ? 'border-2 border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">En Popüler</Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      {getPlanPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  {plan.price > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatCurrency(plan.price / 12)}/ay
                    </p>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.price === 0 ? 'Hemen Başla' : 'Abone Ol'}
                </Button>

                {plan.popular && (
                  <p className="text-xs text-center text-muted-foreground">
                    30 gün ücretsiz deneme
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sık Sorulan Sorular</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Premium paket nedir?</h3>
            <p className="text-sm text-muted-foreground">
              Premium paket, tüm tazminat hizmetlerimizde komisyon ödememenizi sağlar.
              Ayrıca öncelikli işlem, lounge erişimi ve premium destek gibi ayrıcalıklardan yararlanırsınız.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Lounge erişimi nasıl çalışır?</h3>
            <p className="text-sm text-muted-foreground">
              Premium üyelerimiz işbirliği yaptığımız 500+ havalimanında lounge erişim hakkına sahip olur.
              Uygulamadan veya e-posta ile lounge kodunuzu alabilirsiniz.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">İptal politikası nedir?</h3>
            <p className="text-sm text-muted-foreground">
              30 gün içinde istediğiniz zaman aboneliğinizi iptal edebilirsiniz. İlk 30 gün
              tam para iadesi yapılır.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardContent className="p-8 text-center">
          <Crown className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Premium'a Geçin</h2>
          <p className="text-lg opacity-90 mb-6">
            Her uçuşunuzda koruma ve ayrıcalık
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Hemen Başla
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

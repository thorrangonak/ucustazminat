import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Gavel, TrendingUp, Clock, CheckCircle, 
  ArrowRight, Info, Star, Shield, DollarSign
} from 'lucide-react';

interface ServiceAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'EUR' | 'USD' | 'TRY';
  period: 'one-time' | 'claim' | 'month';
  features: string[];
  popular?: boolean;
  icon: React.ElementType;
}

const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'fast-track',
    name: 'Hızlı İşlem',
    description: 'Talebinizi öncelikli sıraya alın, 2-4 hafta içinde sonuçlanın',
    price: 49,
    currency: 'EUR',
    period: 'one-time',
    popular: true,
    icon: Zap,
    features: [
      'Öncelikli işlem kuyruğu',
      'Özel müşteri temsilcisi',
      '2-4 hafta içinde sonuç',
      'SMS ve e-posta bildirimleri',
      '7/24 destek'
    ]
  },
  {
    id: 'legal-consultation',
    name: 'Hukuki Danışmanlık',
    description: 'Uzman avukatlarımızdan 1 saat ücretsiz danışmanlık alın',
    price: 0,
    currency: 'EUR',
    period: 'one-time',
    icon: Gavel,
    features: [
      '1 saat ücretsiz danışmanlık',
      'Profesyonel hukuki değerlendirme',
      'Strateji belirleme',
      'Dava takibi',
      'Tüketici hakları uzmanlığı'
    ]
  },
  {
    id: 'expert-review',
    name: 'Uzman İnceleme',
    description: 'Talebinizi uzman ekibimiz detaylı incelesin',
    price: 29,
    currency: 'EUR',
    period: 'one-time',
    icon: Star,
    features: [
      'Uzman ekibince inceleme',
      'Başarı olasılığı hesaplama',
      'Gerekli belge listesi',
      'İyileştirme önerileri',
      'Detaylı rapor'
    ]
  },
  {
    id: 'full-service',
    name: 'Tam Hizmet Paketi',
    description: 'Talebinizden başlayıp ödeme alana kadar her adımı biz yönetelim',
    price: 99,
    currency: 'EUR',
    period: 'one-time',
    icon: Shield,
    features: [
      'Hızlı işlem dahil',
      'Uzman inceleme dahil',
      'Dava takibi dahil',
      'Hukuki danışmanlık dahil',
      'Öncekili destek'
    ]
  }
];

export default function AdditionalServices() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = SERVICE_ADDONS.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const handleProceed = () => {
    if (selectedServices.length === 0) return;
    console.log('Selected services:', selectedServices, 'Total:', getTotalPrice());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Ek Hizmetler</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Talep sürecinizi hızlandırmak veya uzman desteği almak için ek hizmetleri seçin.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {SERVICE_ADDONS.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedServices.includes(service.id);

          return (
            <Card
              key={service.id}
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'border-2 border-primary' : ''
              } ${service.popular ? 'ring-2 ring-primary/20' : ''}`}
              onClick={() => toggleService(service.id)}
            >
              {service.popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">
                  En Popüler
                </Badge>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-6 h-6 text-primary" />
                  )}
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    {service.price === 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">Ücretsiz</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">
                          {service.price}€
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /talep
                        </span>
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <Button size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary */}
      {selectedServices.length > 0 && (
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Seçilen Hizmetler ({selectedServices.length})
                </h3>
                <div className="text-sm text-muted-foreground">
                  {selectedServices.map(id => {
                    const service = SERVICE_ADDONS.find(s => s.id === id);
                    return service?.name;
                  }).join(', ')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Toplam Tutar</div>
                <div className="text-3xl font-bold text-primary">
                  {getTotalPrice()}€
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setSelectedServices([])}
              >
                Tümünü İptal Et
              </Button>
              <Button
                className="flex-1"
                onClick={handleProceed}
              >
                Devam Et
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Neden Ek Hizmet?</h4>
                <p className="text-xs text-blue-700">
                  Ek hizmetler talep sürecinizi hızlandırır ve başarı şansınızı artırır.
                  Uzman desteği ile karmaşık durumlarda profesyonel yardım alırsınız.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Para İade Garantisi</h4>
                <p className="text-xs text-green-700">
                  Ek hizmetlerle başarılı olamazsak, ödediğiniz tutarı
                  tamamen iade ediyoruz. Risk tamamen bizde.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Hizmet Karşılaştırma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Hizmet</th>
                  <th className="text-center py-3 px-4 font-semibold">Standart</th>
                  <th className="text-center py-3 px-4 font-semibold">Hızlı İşlem</th>
                  <th className="text-center py-3 px-4 font-semibold">Tam Hizmet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'İşlem Süresi', standard: '4-8 hafta', fast: '2-4 hafta', full: '2-4 hafta' },
                  { feature: 'Öncelikli Kuyruk', standard: <X className="w-4 h-4 text-red-500 mx-auto" />, fast: <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />, full: <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> },
                  { feature: 'Özel Temsilci', standard: <X className="w-4 h-4 text-red-500 mx-auto" />, fast: <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />, full: <CheckCircle className="w-4 h-4 text-green-600 mx-auto" /> },
                  { feature: 'Hukuki Danışmanlık', standard: 'Varsa', fast: 'Varsa', full: 'Dahil' },
                  { feature: 'Uzman İnceleme', standard: 'Varsa', fast: 'Varsa', full: 'Dahil' },
                  { feature: '7/24 Destek', standard: 'E-posta', fast: 'Telefon', full: 'Telefon + Canlı' }
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-secondary/50">
                    <td className="py-3 px-4 font-medium">{row.feature}</td>
                    <td className="py-3 px-4 text-center">{row.standard}</td>
                    <td className="py-3 px-4 text-center text-primary font-medium">{row.fast}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-medium">{row.full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { SERVICE_ADDONS };

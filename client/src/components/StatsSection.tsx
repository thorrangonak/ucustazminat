import { Card, CardContent } from '@/components/ui/card';
import { Users, Euro, CheckCircle, TrendingUp, Clock, Globe } from 'lucide-react';

interface StatCard {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
};

const STATS: StatCard[] = [
  {
    label: 'Mutlu Müşteri',
    value: '124,587',
    subtext: '100+ ülkeden',
    icon: Users,
    color: 'blue',
    trend: {
      value: '+12%',
      direction: 'up',
    },
  },
  {
    label: 'Toplam Ödenen Tazminat',
    value: '€37.2M',
    subtext: 'Bugüne kadar',
    icon: Euro,
    color: 'green',
    trend: {
      value: '+23%',
      direction: 'up',
    },
  },
  {
    label: 'Başarılı Talep',
    value: '89,241',
    subtext: 'Ödenmiş talep',
    icon: CheckCircle,
    color: 'purple',
    trend: {
      value: '+15%',
      direction: 'up',
    },
  },
  {
    label: 'Başarı Oranı',
    value: '94%',
    subtext: 'Onaylanan talepler',
    icon: TrendingUp,
    color: 'orange',
  },
  {
    label: 'Ortalama Yanıt Süresi',
    value: '2.5 saat',
    subtext: 'İlk yanıtı',
    icon: Clock,
    color: 'blue',
  },
  {
    label: 'Desteklenen Havayolu',
    value: '350+',
    subtext: 'Avrupa ve dünya genelinde',
    icon: Globe,
    color: 'red',
  },
];

export default function StatsSection() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Güvenilir Hizmet, Kanıtlanmış Sonuçlar</h2>
        <p className="text-muted-foreground">
          Yıllardır yolcu haklarını koruyoruz ve tazminat almanıza yardımcı oluyoruz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          const colorClass = colorClasses[stat.color];

          return (
            <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {stat.trend && (
                    <div
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                        stat.trend.direction === 'up'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend.value}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="font-medium text-sm">{stat.label}</p>
                  {stat.subtext && (
                    <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Stats Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">€417</p>
              <p className="text-xs text-muted-foreground">Ortalama Tazminat</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">21 gün</p>
              <p className="text-xs text-muted-foreground">Ortalama İşlem Süresi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">€600</p>
              <p className="text-xs text-muted-foreground">Maksimum Tazminat</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">%25</p>
              <p className="text-xs text-muted-foreground">Hizmet Ücreti</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATS.slice(0, 4).map((stat, index) => {
        const Icon = stat.icon;
        const colorClass = colorClasses[stat.color];

        return (
          <div key={index} className="text-center">
            <Icon className={`w-8 h-8 mx-auto mb-2 ${colorClass.split(' ')[1]}`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}

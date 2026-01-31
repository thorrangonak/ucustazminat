import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, TrendingDown, Award, AlertCircle, 
  CheckCircle, XCircle, Clock, Plane, Star
} from "lucide-react";

interface AirlineRanking {
  airlineCode: string;
  airlineName: string;
  totalClaims: number;
  successRate: number;
  avgProcessingTime: number;
  avgCompensation: number;
  trend: 'up' | 'down' | 'stable';
}

const AIRLINE_RANKINGS: AirlineRanking[] = [
  {
    airlineCode: 'TK',
    airlineName: 'Turkish Airlines',
    totalClaims: 1247,
    successRate: 91,
    avgProcessingTime: 32,
    avgCompensation: 375,
    trend: 'up'
  },
  {
    airlineCode: 'PC',
    airlineName: 'Pegasus Airlines',
    totalClaims: 892,
    successRate: 88,
    avgProcessingTime: 28,
    avgCompensation: 290,
    trend: 'up'
  },
  {
    airlineCode: 'XQ',
    airlineName: 'SunExpress',
    totalClaims: 543,
    successRate: 85,
    avgProcessingTime: 35,
    avgCompensation: 320,
    trend: 'stable'
  },
  {
    airlineCode: 'LH',
    airlineName: 'Lufthansa',
    totalClaims: 412,
    successRate: 83,
    avgProcessingTime: 38,
    avgCompensation: 420,
    trend: 'down'
  },
  {
    airlineCode: 'BA',
    airlineName: 'British Airways',
    totalClaims: 367,
    successRate: 81,
    avgProcessingTime: 41,
    avgCompensation: 395,
    trend: 'stable'
  },
  {
    airlineCode: 'AF',
    airlineName: 'Air France',
    totalClaims: 298,
    successRate: 79,
    avgProcessingTime: 45,
    avgCompensation: 380,
    trend: 'down'
  }
];

interface AirportRanking {
  airportCode: string;
  airportName: string;
  city: string;
  totalClaims: number;
  avgDelayTime: number;
  commonIssues: string[];
}

const AIRPORT_RANKINGS: AirportRanking[] = [
  {
    airportCode: 'IST',
    airportName: 'Istanbul Airport',
    city: 'İstanbul',
    totalClaims: 1847,
    avgDelayTime: 45,
    commonIssues: ['Delay', 'Cancellation']
  },
  {
    airportCode: 'SAW',
    airportName: 'Sabiha Gökçen',
    city: 'İstanbul',
    totalClaims: 987,
    avgDelayTime: 42,
    commonIssues: ['Delay', 'Overbooking']
  },
  {
    airportCode: 'AYT',
    airportName: 'Antalya Airport',
    city: 'Antalya',
    totalClaims: 654,
    avgDelayTime: 38,
    commonIssues: ['Delay', 'Missed Connection']
  },
  {
    airportCode: 'ESB',
    airportName: 'Ankara Esenboğa',
    city: 'Ankara',
    totalClaims: 423,
    avgDelayTime: 35,
    commonIssues: ['Delay']
  },
  {
    airportCode: 'ADB',
    airportName: 'İzmir Adnan Menderes',
    city: 'İzmir',
    totalClaims: 367,
    avgDelayTime: 32,
    commonIssues: ['Delay', 'Cancellation']
  }
];

interface SuccessRateCardProps {
  title: string;
  rate: number;
  total: number;
  icon: React.ElementType;
  trend?: 'up' | 'down';
}

function SuccessRateCard({ title, rate, total, icon: Icon, trend }: SuccessRateCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          {trend && (
            <Badge variant={trend === 'up' ? 'default' : 'destructive'}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {trend === 'up' ? '+' : ''}{trend === 'up' ? '3.2%' : '-1.5%'}
            </Badge>
          )}
        </div>
        <div className="text-3xl font-bold mb-1">{rate}%</div>
        <div className="text-sm text-muted-foreground mb-3">{title}</div>
        <div className="text-xs text-muted-foreground">
          Toplam {total.toLocaleString()} talep
        </div>
        <Progress value={rate} className="mt-3" />
      </CardContent>
    </Card>
  );
}

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Genel Performans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SuccessRateCard
            title="Başarı Oranı"
            rate={88}
            total={2847}
            icon={CheckCircle}
            trend="up"
          />
          <SuccessRateCard
            title="Ortalama İşlem Süresi"
            rate={34}
            total={2847}
            icon={Clock}
          />
          <SuccessRateCard
            title="Ortalama Tazminat"
            rate={345}
            total={1247}
            icon={Award}
            trend="up"
          />
          <SuccessRateCard
            title="Müşteri Memnuniyeti"
            rate={94}
            total={1234}
            icon={Star}
            trend="up"
          />
        </div>
      </div>

      {/* Airline Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="w-5 h-5" />
            Havayolu Performans Sıralaması
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Havayolu</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Toplam Talep</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Başarı Oranı</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Ort. Süre (Gün)</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Ort. Tazminat (€)</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Trend</th>
                </tr>
              </thead>
              <tbody>
                {AIRLINE_RANKINGS.map((airline, index) => (
                  <tr key={airline.airlineCode} className="border-b hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{airline.airlineName}</div>
                          <div className="text-xs text-muted-foreground">{airline.airlineCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{airline.totalClaims.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress value={airline.successRate} className="w-20" />
                        <span className="text-sm font-medium">{airline.successRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{airline.avgProcessingTime}</td>
                    <td className="py-3 px-4 text-sm font-medium">€{airline.avgCompensation}</td>
                    <td className="py-3 px-4">
                      {airline.trend === 'up' && (
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Artış
                        </Badge>
                      )}
                      {airline.trend === 'down' && (
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          Düşüş
                        </Badge>
                      )}
                      {airline.trend === 'stable' && (
                        <Badge variant="secondary">Stabil</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Airport Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Havalimanı Sıralaması (En Çok Talep)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Havalimanı</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Şehir</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Toplam Talep</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Ort. Gecikme (Dak)</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Sorunlar</th>
                </tr>
              </thead>
              <tbody>
                {AIRPORT_RANKINGS.map((airport, index) => (
                  <tr key={airport.airportCode} className="border-b hover:bg-secondary/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-600">{airport.airportCode}</span>
                        </div>
                        <div className="font-medium">{airport.airportName}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{airport.city}</td>
                    <td className="py-3 px-4 text-sm font-medium">{airport.totalClaims.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{airport.avgDelayTime}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {airport.commonIssues.map((issue) => (
                          <Badge key={issue} variant="outline" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Claims by Status */}
      <Card>
        <CardHeader>
          <CardTitle>Taleplerin Durum Dağılımı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: 'paid', label: 'Ödenen', count: 1247, color: 'bg-green-500' },
              { status: 'under_review', label: 'İnceleniyor', count: 634, color: 'bg-yellow-500' },
              { status: 'approved', label: 'Onaylandı', count: 321, color: 'bg-blue-500' },
              { status: 'rejected', label: 'Reddedildi', count: 187, color: 'bg-red-500' },
              { status: 'cancelled', label: 'İptal Edildi', count: 98, color: 'bg-gray-500' },
              { status: 'legal_action', label: 'Hukuki Süreç', count: 67, color: 'bg-purple-500' }
            ].map((item) => (
              <div key={item.status} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {item.status === 'paid' && <CheckCircle className="w-4 h-4 text-white" />}
                  {item.status === 'rejected' && <XCircle className="w-4 h-4 text-white" />}
                  {item.status === 'under_review' && <Clock className="w-4 h-4 text-white" />}
                  {item.status === 'approved' && <CheckCircle className="w-4 h-4 text-white" />}
                  {item.status === 'cancelled' && <XCircle className="w-4 h-4 text-white" />}
                  {item.status === 'legal_action' && <AlertCircle className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.count} ({Math.round(item.count / 2554 * 100)}%)</span>
                  </div>
                  <Progress value={item.count / 2554 * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

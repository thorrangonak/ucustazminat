import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Plane, Award } from 'lucide-react';

interface AirlineRanking {
  code: string;
  name: string;
  country: string;
  score: number;
  successRate: number;
  totalClaims: number;
  avgCompensation: string;
  trend: 'up' | 'down' | 'stable';
}

const AIRLINE_RANKINGS: AirlineRanking[] = [
  {
    code: 'TK',
    name: 'Turkish Airlines',
    country: 'Türkiye',
    score: 8.2,
    successRate: 94.5,
    totalClaims: 12457,
    avgCompensation: '€412',
    trend: 'up',
  },
  {
    code: 'LH',
    name: 'Lufthansa',
    country: 'Almanya',
    score: 7.8,
    successRate: 91.2,
    totalClaims: 8934,
    avgCompensation: '€438',
    trend: 'stable',
  },
  {
    code: 'AF',
    name: 'Air France',
    country: 'Fransa',
    score: 7.5,
    successRate: 89.8,
    totalClaims: 7623,
    avgCompensation: '€425',
    trend: 'down',
  },
  {
    code: 'BA',
    name: 'British Airways',
    country: 'İngiltere',
    score: 7.3,
    successRate: 88.5,
    totalClaims: 6789,
    avgCompensation: '€451',
    trend: 'stable',
  },
  {
    code: 'PC',
    name: 'Pegasus Airlines',
    country: 'Türkiye',
    score: 6.9,
    successRate: 86.2,
    totalClaims: 5432,
    avgCompensation: '€389',
    trend: 'up',
  },
];

interface AirportRanking {
  code: string;
  name: string;
  city: string;
  country: string;
  totalIncidents: number;
  avgDelay: number;
  cancellationRate: number;
  score: number;
}

const AIRPORT_RANKINGS: AirportRanking[] = [
  {
    code: 'IST',
    name: 'Istanbul Airport',
    city: 'İstanbul',
    country: 'Türkiye',
    totalIncidents: 8765,
    avgDelay: 45,
    cancellationRate: 2.3,
    score: 7.1,
  },
  {
    code: 'LHR',
    name: 'Heathrow Airport',
    city: 'Londra',
    country: 'İngiltere',
    totalIncidents: 7654,
    avgDelay: 52,
    cancellationRate: 3.1,
    score: 6.8,
  },
  {
    code: 'CDG',
    name: 'Charles de Gaulle',
    city: 'Paris',
    country: 'Fransa',
    totalIncidents: 6543,
    avgDelay: 48,
    cancellationRate: 2.8,
    score: 6.9,
  },
];

const SUCCESS_STATS = {
  overall: 94.2,
  byDisruptionType: {
    delay: 96.5,
    cancellation: 91.2,
    deniedBoarding: 93.8,
    downgrade: 88.5,
  },
  averageTime: {
    review: '2.5 saat',
    airlineResponse: '14 gün',
    compensation: '21 gün',
  },
};

export default function AirlineRankings() {
  return (
    <div className="space-y-8">
      {/* Airline Rankings */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Havayolu Sıralaması</h2>
          </div>
          <Badge variant="secondary">Son 12 ay</Badge>
        </div>

        <div className="grid gap-4">
          {AIRLINE_RANKINGS.map((airline, index) => (
            <Card key={airline.code} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold">{airline.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {airline.country} • {airline.code}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-2xl font-bold text-primary">
                        {airline.score}
                      </span>
                      {airline.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      )}
                      {airline.trend === 'down' && (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">UçuşTazminat Skoru</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-green-600">
                      %{airline.successRate}
                    </p>
                    <p className="text-xs text-muted-foreground">Başarı Oranı</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">
                      {airline.totalClaims.toLocaleString('tr-TR')}
                    </p>
                    <p className="text-xs text-muted-foreground">Toplam Talep</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">
                      {airline.avgCompensation}
                    </p>
                    <p className="text-xs text-muted-foreground">Ort. Tazminat</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Başarı Oranı</span>
                    <span>%{airline.successRate}</span>
                  </div>
                  <Progress value={airline.successRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Airport Rankings */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Plane className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Havalimanı Sıralaması</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {AIRPORT_RANKINGS.map((airport, index) => (
            <Card key={airport.code}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>{airport.name}</span>
                  <Badge>{index + 1}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Skor</span>
                    <span className="font-bold">{airport.score}/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ort. Gecikme</span>
                    <span>{airport.avgDelay} dk</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">İptal Oranı</span>
                    <span>%{airport.cancellationRate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Toplam Olay</span>
                    <span>{airport.totalIncidents.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Success Stats */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Başarı İstatistikleri</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Genel Başarı Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-green-600 mb-2">
                %{SUCCESS_STATS.overall}
              </div>
              <p className="text-muted-foreground">Toplam başarı oranı</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Sorun Tipine Göre Başarı</h3>
              {Object.entries(SUCCESS_STATS.byDisruptionType).map(([type, rate]) => (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize">{type}</span>
                    <span>%{rate}</span>
                  </div>
                  <Progress value={rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                <p className="text-sm font-medium">İnceleme Süresi</p>
              </div>
              <p className="text-2xl font-bold">{SUCCESS_STATS.averageTime.review}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Plane className="w-5 h-5 text-purple-500" />
                <p className="text-sm font-medium">Havayolu Yanıtı</p>
              </div>
              <p className="text-2xl font-bold">{SUCCESS_STATS.averageTime.airlineResponse}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium">Tazminat Ödemesi</p>
              </div>
              <p className="text-2xl font-bold">{SUCCESS_STATS.averageTime.compensation}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

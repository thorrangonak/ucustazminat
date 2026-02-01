import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Award, Globe } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Ahmet Y.',
    rating: 5,
    comment: 'Uçuşum 4 saat gecikti ve 3 hafta içinde €600 tazminat aldım. Mükemmel hizmet!',
    date: '2 gün önce',
    verified: true,
  },
  {
    id: '2',
    name: 'Elif K.',
    rating: 5,
    comment: 'Profesyonel ekip, hızlı süreç. Herkese tavsiye ederim.',
    date: '1 hafta önce',
    verified: true,
  },
  {
    id: '3',
    name: 'Mehmet S.',
    rating: 4,
    comment: 'İşlem biraz uzun sürdü ama sonuçta hak ettiğim tazminatı aldım.',
    date: '2 hafta önce',
    verified: true,
  },
  {
    id: '4',
    name: 'Ayşe D.',
    rating: 5,
    comment: 'İptal edilen uçuşum için €450 aldım. Teşekkürler UçuşTazminat!',
    date: '3 hafta önce',
    verified: true,
  },
  {
    id: '5',
    name: 'Can B.',
    rating: 5,
    comment: 'Kesinlikle güvenilir. 2 talebim de başarıyla sonuçlandı.',
    date: '1 ay önce',
    verified: true,
  },
];

interface TrustpilotReviewsProps {
  limit?: number;
  showTrustpilotLogo?: boolean;
}

export default function TrustpilotReviews({ limit = 4, showTrustpilotLogo = true }: TrustpilotReviewsProps) {
  const displayedReviews = MOCK_REVIEWS.slice(0, limit);
  const averageRating = 4.7;
  const totalReviews = 2847;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {showTrustpilotLogo && (
        <Card className="border-2 border-green-500 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold">
                    Trustpilot
                  </div>
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(averageRating)}</div>
                  <span className="text-2xl font-bold">{averageRating}</span>
                  <span className="text-muted-foreground">
                    / 5 - {totalReviews.toLocaleString('tr-TR')} değerlendirme
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">Mükemmel</div>
                <div className="text-sm text-muted-foreground">Trustpilot Sınıfı</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedReviews.map((review) => (
          <Card key={review.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Doğrulanmış
                  </div>
                )}
              </div>

              <div className="flex mb-3">{renderStars(review.rating)}</div>

              <p className="text-sm text-muted-foreground flex gap-2">
                <Quote className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                {review.comment}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <a
          href="https://www.trustpilot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          Tüm {totalReviews.toLocaleString('tr-TR')} değerlendirmeyi gör
          <Globe className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

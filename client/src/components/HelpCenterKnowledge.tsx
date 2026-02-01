import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, FileText, AlertCircle, Phone, Mail, Clock } from 'lucide-react';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  views: number;
}

const FAQS: FAQ[] = [
  {
    id: '1',
    category: 'Genel',
    question: 'Tazminat almak için hangi koşullar gerekli?',
    answer: 'Uçuşunuz Avrupa Birliği üyesi bir ülkeden kalkış yapıyorsa veya AB havayolu ile AB\'ye gidiyorsanız, uçuşunuz en az 3 saat gecikmiş, iptal edilmiş veya reddedilmişse tazminat alabilirsiniz.',
    views: 15432,
  },
  {
    id: '2',
    category: 'İşlem',
    question: 'Başvuru süreci ne kadar sürer?',
    answer: 'Başvurunuz genellikle 2-3 saat içinde incelenir. Havayolu yanıt süresi ortalama 14 gündür. Başarılı olursa, tazminatınız ortalama 21 gün içinde ödenir.',
    views: 12345,
  },
  {
    id: '3',
    category: 'Ücretler',
    question: 'Hizmetinizin ücreti nedir?',
    answer: 'Hizmetimiz "No Win No Fee" prensibine dayanır. Başarılı olamazsak hiçbir ücret talep etmeyiz. Başarılı olduğumuzda, tazminat tutarının %25\'ini hizmet bedeli olarak alırız.',
    views: 10987,
  },
  {
    id: '4',
    category: 'Dokümantasyon',
    question: 'Hangi belgeler gereklidir?',
    answer: 'Biniş kartınız, bilet veya rezervasyon onayı, kimlik belgesi (pasaport veya TC kimlik kartı), varsa gecikme belgesi ve gecikme nedeniyle oluşan masraf makbuzları gereklidir.',
    views: 9876,
  },
  {
    id: '5',
    category: 'İşlem',
    question: 'Biniş kartımı nasıl tarayabilirim?',
    answer: 'Ana sayfadaki "Biniş Kartı Tara" butonuna tıklayın. Kameranızı açarak QR kodu tarayabilir veya fotoğraf yükleyebilirsiniz. Sistem otomatik olarak uçuş bilgilerinizi çıkarır.',
    views: 8765,
  },
  {
    id: '6',
    category: 'Genel',
    question: 'Hangi tazminat miktarlarına hak edebilirim?',
    answer: 'Uçuş mesafesine göre: 0-1500 km için €250, 1500-3500 km için €400, 3500+ km için €600. Aktarmalı uçuşlarda toplam mesafeye bakılır.',
    views: 7654,
  },
];

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  views: number;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'EC 261/2004 Yönetmeliği Nedir?',
    excerpt: 'Avrupa Birliği yolcu hakları yönetmeliği hakkında bilmeniz gereken her şey.',
    category: 'Yolcu Hakları',
    readTime: '5 dk',
    views: 23456,
  },
  {
    id: '2',
    title: 'Gecikmiş Uçuşlar için Tazminat Nasıl Alınır?',
    excerpt: 'Gecikmiş uçuşunuz için tazminat alma adımları ve ipuçları.',
    category: 'Rehber',
    readTime: '4 dk',
    views: 19876,
  },
  {
    id: '3',
    title: 'İptal Edilen Uçuşlar: Haklarınızı Koruyun',
    excerpt: 'İptal edilen uçuşlarınız için neler yapabileceğinizi öğrenin.',
    category: 'Rehber',
    readTime: '6 dk',
    views: 16543,
  },
  {
    id: '4',
    title: 'Havayolu ile İletişime Geçmeden Önce Bilmeniz Gerekenler',
    excerpt: 'Havayolu ile etkili iletişim kurma stratejileri.',
    category: 'İpuçları',
    readTime: '3 dk',
    views: 14321,
  },
];

export default function HelpCenter() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Nasıl yardımcı olabiliriz? Sorunuzu veya konuyu arayın..."
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Rehberler</h3>
                <p className="text-sm text-muted-foreground">
                  Detaylı rehberleri inceleyin
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">SSS</h3>
                <p className="text-sm text-muted-foreground">
                  Sık sorulan sorular
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Destek</h3>
                <p className="text-sm text-muted-foreground">
                  Canlı destek alın
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Options */}
      <Card>
        <CardHeader>
          <CardTitle>Destek Seçenekleri</CardTitle>
          <CardDescription>
            Size en uygun destek yöntemini seçin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Telefon</h4>
                <p className="text-sm text-muted-foreground mt-1">+90 212 123 4567</p>
                <p className="text-xs text-muted-foreground mt-2">
                  <Clock className="w-3 h-3 inline mr-1" />
                  Pzt-Cum 09:00-18:00
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">E-posta</h4>
                <p className="text-sm text-muted-foreground mt-1">destek@ucustazminat.com</p>
                <p className="text-xs text-muted-foreground mt-2">
                  24 saat içinde yanıt
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <BookOpen className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium">Canlı Sohbet</h4>
                <p className="text-sm text-muted-foreground mt-1">Sağ alt köşedeki buton</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Hemen yanıt
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Sık Sorulan Sorular</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <Card key={faq.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <Badge variant="secondary" className="mb-2">
                          {faq.category}
                        </Badge>
                        <h3 className="font-semibold">{faq.question}</h3>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {faq.views.toLocaleString()} görüntülenme
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Yardımcı Makaleler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ARTICLES.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {article.category}
                </Badge>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{article.views.toLocaleString()} görüntülenme</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, ChevronRight, FileText, MessageSquare, 
  BookOpen, AlertCircle, Plane, Clock, CheckCircle,
  ArrowLeft, HelpCircle, User, Phone
} from "lucide-react";

interface HelpArticle {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ElementType;
  views: number;
  updated: string;
}

interface HelpCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const helpCategories: HelpCategory[] = [
  {
    id: "claims",
    name: "Talepler",
    icon: FileText,
    description: "Tazminat talebi nasıl yapılır, süreç hakkında bilgi",
    color: "bg-blue-500"
  },
  {
    id: "compensation",
    name: "Tazminat Hakkında",
    icon: Plane,
    description: "Tazminat miktarları, haklarınız ve şartlar",
    color: "bg-green-500"
  },
  {
    id: "account",
    name: "Hesap ve Panel",
    icon: User,
    description: "Hesap işlemleri, dashboard kullanımı",
    color: "bg-purple-500"
  },
  {
    id: "support",
    name: "Destek",
    icon: MessageSquare,
    description: "İletişim, destek talepleri ve SSS",
    color: "bg-orange-500"
  }
];

const helpArticles: HelpArticle[] = [
  {
    id: "how-to-claim",
    category: "claims",
    title: "Tazminat talebi nasıl yapılır?",
    description: "Talep oluşturma adımları, gerekli belgeler ve süreç hakkında detaylı bilgi",
    icon: CheckCircle,
    views: 12453,
    updated: "2 gün önce"
  },
  {
    id: "compensation-amounts",
    category: "compensation",
    title: "Tazminat miktarları nasıl belirlenir?",
    description: "Uçuş mesafesine göre tazminat kategorileri ve miktarları",
    icon: Plane,
    views: 9821,
    updated: "1 hafta önce"
  },
  {
    id: "flight-delay-conditions",
    category: "compensation",
    title: "Hangi durumlarda tazminat alabilirim?",
    description: "Gecikme, iptal, overbooking gibi durumların şartları",
    icon: AlertCircle,
    views: 8765,
    updated: "3 gün önce"
  },
  {
    id: "boarding-pass-upload",
    category: "claims",
    title: "Biniş kartımı nasıl yükleyebilirim?",
    description: "Biniş kartı tarama, fotoğraf yükleme ve otomatik bilgi çıkarma",
    icon: FileText,
    views: 7654,
    updated: "5 gün önce"
  },
  {
    id: "document-requirements",
    category: "claims",
    title: "Hangi belgeler gereklidir?",
    description: "Gerekli belgeler, neler yüklenmeli ve nasıl temin edilir",
    icon: FileText,
    views: 6543,
    updated: "1 hafta önce"
  },
  {
    id: "tracking-claim",
    category: "account",
    title: "Talebimi nasıl takip edebilirim?",
    description: "Dashboard kullanımı, durum güncellemeleri ve bildirimler",
    icon: BookOpen,
    views: 5432,
    updated: "2 hafta önce"
  },
  {
    id: "extraordinary-circumstances",
    category: "compensation",
    title: "Olağanüstü durumlar nedir?",
    description: "Hava koşulları, ATC, güvenlik gibi tazminat hakkı olmayan durumlar",
    icon: AlertCircle,
    views: 4987,
    updated: "4 gün önce"
  },
  {
    id: "commission-fees",
    category: "support",
    title: "Komisyon oranınız nedir?",
    description: "%25 komisyon, No Win No Fee politikası ve ücretler",
    icon: MessageSquare,
    views: 4321,
    updated: "1 hafta önce"
  },
  {
    id: "payment-process",
    category: "compensation",
    title: "Ödeme nasıl yapılır?",
    description: "Tazminat tahsilatı, komisyon kesintisi ve ödeme süreci",
    icon: Clock,
    views: 3987,
    updated: "3 gün önce"
  },
  {
    id: "connecting-flights",
    category: "compensation",
    title: "Aktarmalı uçuşlarda tazminat",
    description: "Aktarma kaçırma, same PNR ve self-transfer durumları",
    icon: Plane,
    views: 3456,
    updated: "5 gün önce"
  },
  {
    id: "rejected-claim",
    category: "claims",
    title: "Talebim reddedildi, ne yapmalıyım?",
    description: "Red nedenleri, itiraz süreci ve hukuki adımlar",
    icon: AlertCircle,
    views: 2890,
    updated: "1 hafta önce"
  },
  {
    id: "contact-support",
    category: "support",
    title: "Destek ekibi ile nasıl iletişime geçebilirim?",
    description: "WhatsApp, telefon, e-posta ve canlı destek seçenekleri",
    icon: MessageSquare,
    views: 2345,
    updated: "2 gün önce"
  }
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-background py-12 sm:py-16">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-background/80 hover:text-background mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Ana Sayfaya Dön</span>
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Yardım Merkezi
          </h1>
          <p className="text-background/80 text-base sm:text-lg max-w-2xl">
            Sorularınızın cevaplarını burada bulabilirsiniz. Arama yapın veya kategori seçin.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Aramak istediğiniz konuyu yazın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="font-bold text-lg mb-4">Kategoriler</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    !selectedCategory
                      ? "bg-primary text-white"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                >
                  Tümü
                </button>
                {helpCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "bg-secondary hover:bg-secondary/80"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-secondary rounded-lg">
                <h3 className="font-semibold mb-3">Hızlı İletişim</h3>
                <div className="space-y-2 text-sm">
                  <a
                    href="https://wa.me/905321234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Destek</span>
                  </a>
                  <a
                    href="tel:+905321234567"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+90 532 123 45 67</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Popular Topics */}
            {!searchQuery && !selectedCategory && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Popüler Konular</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {helpArticles.slice(0, 6).map((article) => {
                    const Icon = article.icon;
                    const category = helpCategories.find(c => c.id === article.category);
                    return (
                      <Link
                        key={article.id}
                        to={`/help/${article.id}`}
                        className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                      >
                        <div className={`w-10 h-10 ${category?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {article.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{category?.name}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Search Results */}
            {(searchQuery || selectedCategory) && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">
                    {searchQuery && `"${searchQuery}" için sonuçlar`}
                    {selectedCategory && !searchQuery && helpCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredArticles.length} sonuç
                  </span>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="space-y-4">
                    {filteredArticles.map((article) => {
                      const Icon = article.icon;
                      const category = helpCategories.find(c => c.id === article.category);
                      return (
                        <Link
                          key={article.id}
                          to={`/help/${article.id}`}
                          className="block bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-md"
                        >
                          <div className="flex gap-4">
                            <div className={`w-12 h-12 ${category?.color || 'bg-gray-500'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-base sm:text-lg mb-2">
                                {article.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3">
                                {article.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {article.views} görüntülenme
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {article.updated}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Sonuç bulunamadı</h3>
                    <p className="text-muted-foreground mb-6">
                      Aradığınız kriterlere uygun yardım makalesi bulunamadı.
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory(null);
                        }}
                        variant="outline"
                      >
                        Filtreleri Temizle
                      </Button>
                      <Link to="/dashboard/support">
                        <Button>Destek Talebi Oluştur</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FAQ Section */}
            {!searchQuery && !selectedCategory && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Sıkça Sorulan Sorular</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "Talep süreci ne kadar sürer?",
                      a: "Genellikle 4-8 hafta içinde sonuçlanır. Havayolu yanıt vermezse hukuki süreç başlatılır."
                    },
                    {
                      q: "Kazanamazsam ücret öder miyim?",
                      a: "Hayır, 'No Win No Fee' politikamız gereği tazminat alamazsak hiçbir ücret talep etmiyoruz."
                    },
                    {
                      q: "Biniş kartımı kaybettim, ne yapmalıyım?",
                      a: "E-bilet veya rezervasyon onayınızı kullanabilirsiniz. Bunlar da yoksa uçuş numarası ve tarihiyle başvuru yapabilirsiniz."
                    }
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="bg-background border border-border rounded-lg p-6"
                    >
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

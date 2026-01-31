import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LanguageSwitcher, CurrencySwitcher } from "@/components/LanguageCurrencySwitcher";
import { 
  Plane, 
  Clock, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Users,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  MapPin,
  Menu,
  X,
  Phone,
  MessageCircle,
  Award,
  Zap,
  ShieldCheck,
  Star,
  Trophy,
  Medal
} from "lucide-react";
import ClaimWizard from "@/components/ClaimWizard";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...SEO_CONFIG.home} />
      <StructuredData type="all" data={{
        faqs: [
          { question: "Hangi durumlarda tazminat talep edebilirim?", answer: "3 saatten fazla gecikme, uçuş iptali, boarding reddi (overbooking) veya kaçırılan bağlantılı uçuş durumlarında tazminat talep edebilirsiniz. AB 261/2004 yönetmeliği kapsamında, AB'den kalkan veya AB havayolu ile AB'ye inen uçuşlar için geçerlidir." },
          { question: "Ne kadar tazminat alabilirim?", answer: "Tazminat miktarı uçuş mesafesine göre belirlenir: 1500 km'ye kadar 250€, 1500-3500 km arası 400€, 3500 km üzeri 600€. Birden fazla yolcu için her yolcu ayrı tazminat alır." },
          { question: "Süreç ne kadar sürer?", answer: "Talep süreci genellikle 2-6 ay arasında tamamlanır. Havayolunun yanıt süresine ve talebin karmaşıklığına bağlı olarak değişebilir. Hukuki süreç gerekirse daha uzun sürebilir." },
          { question: "Komisyon oranınız nedir?", answer: "Sadece başarılı talepler için %25 komisyon alıyoruz. Tazminat alamazsanız, hiçbir ücret ödemezsiniz. Başarı garantisi ile çalışıyoruz." },
          { question: "Hangi belgeler gerekli?", answer: "Uçuş bileti veya rezervasyon onayı, kimlik belgesi (TC Kimlik veya Pasaport) ve varsa gecikme/iptal bildirimi gereklidir. Tüm yolcular için ayrı belgeler yüklenmelidir." },
          { question: "Eski uçuşlar için başvuru yapabilir miyim?", answer: "Evet, son 3 yıl içindeki uçuşlar için tazminat talep edebilirsiniz. Daha eski uçuşlar için zaman aşımı nedeniyle talep hakkınız düşmüş olabilir." }
        ]
      }} />
      <Header isAuthenticated={isAuthenticated} />
      <HeroSection />
      <TrustBadgesSection />
      <StatsSection />
      <AwardsAndPressSection />
      <QuickCalculatorSection />
      <ClaimWizardSection isAuthenticated={isAuthenticated} />
      <HowItWorksSection />
      <CompensationTiersSection />
      <TrustpilotWidget />
      <TestimonialsSection />
      <FAQSection />
      <CTASection isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
}

function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-foreground/10 bg-background sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary" />
          <span className="font-bold text-lg sm:text-xl tracking-tight">UçuşTazminat</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <a href="#hesapla" className="text-sm font-medium hover:text-primary transition-colors">
            Tazminat Hesapla
          </a>
          <a href="#nasil-calisir" className="text-sm font-medium hover:text-primary transition-colors">
            Nasıl Çalışır
          </a>
          <a href="#tazminat" className="text-sm font-medium hover:text-primary transition-colors">
            Tazminat Miktarları
          </a>
          <a href="#sss" className="text-sm font-medium hover:text-primary transition-colors">
            SSS
          </a>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/premium" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Premium
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language and Currency Switchers */}
          <div className="hidden sm:flex items-center gap-2">
            <LanguageSwitcher />
          </div>
          
          {/* WhatsApp Button - Desktop */}
          <a 
            href="https://wa.me/905321234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                Panelim
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <Link href="/giris">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                Giriş Yap
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-foreground/10 bg-background">
          <div className="container py-4 space-y-3">
            <a 
              href="#hesapla" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tazminat Hesapla
            </a>
            <a 
              href="#nasil-calisir" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nasıl Çalışır
            </a>
            <a 
              href="#tazminat" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tazminat Miktarları
            </a>
            <a 
              href="#sss" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              SSS
            </a>
            <Link 
              href="/blog" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="pt-3 border-t border-foreground/10">
              <div className="flex items-center gap-2 mb-3">
                <LanguageSwitcher />
              </div>
              <a 
                href="https://wa.me/905321234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm font-medium text-green-600"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp ile İletişim
              </a>
              <a 
                href="tel:+905321234567" 
                className="flex items-center gap-2 py-2 text-sm font-medium text-primary"
              >
                <Phone className="w-4 h-4" />
                +90 532 123 45 67
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
          <a href="#hesapla" className="text-sm font-medium hover:text-primary transition-colors">
            Tazminat Hesapla
          </a>
          <a href="#nasil-calisir" className="text-sm font-medium hover:text-primary transition-colors">
            Nasıl Çalışır
          </a>
          <a href="#tazminat" className="text-sm font-medium hover:text-primary transition-colors">
            Tazminat Miktarları
          </a>
          <a href="#sss" className="text-sm font-medium hover:text-primary transition-colors">
            SSS
          </a>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
        </nav>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {/* WhatsApp Button - Desktop */}
          <a 
            href="https://wa.me/905321234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
          
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                Panelim
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <Link href="/giris">
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-xs sm:text-sm">
                Giriş Yap
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-foreground/10 bg-background">
          <div className="container py-4 space-y-3">
            <a 
              href="#hesapla" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tazminat Hesapla
            </a>
            <a 
              href="#nasil-calisir" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Nasıl Çalışır
            </a>
            <a 
              href="#tazminat" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tazminat Miktarları
            </a>
            <a 
              href="#sss" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              SSS
            </a>
            <Link 
              href="/blog" 
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <div className="pt-3 border-t border-foreground/10">
              <a 
                href="https://wa.me/905321234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-sm font-medium text-green-600"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp ile İletişim
              </a>
              <a 
                href="tel:+905321234567" 
                className="flex items-center gap-2 py-2 text-sm font-medium text-primary"
              >
                <Phone className="w-4 h-4" />
                +90 532 123 45 67
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 border-b border-foreground/10">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-4 sm:mb-6 justify-center md:justify-start">
              <div className="w-2 h-2 bg-primary" />
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
                SHY-YOLCU Yönetmeliği
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Uçuşunuz mu
              <br />
              <span className="relative inline-block">
                gecikti?
                <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-primary" />
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
              Geciken, iptal edilen veya fazla rezervasyon yapılan uçuşlar için 
              <strong className="text-foreground"> 600 Euro'ya kadar</strong> tazminat alın. 
              <strong>No Win No Fee</strong> - kazanamazsak ücret yok, şeffaf hukuki sürec.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a href="#hesapla" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8">
                  Tazminatımı Hesapla
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </a>
              <a href="#nasil-calisir" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8">
                  Nasıl Çalışır?
                </Button>
              </a>
            </div>
          </div>
          
          {/* Desktop Hero Card */}
          <div className="relative hidden md:block">
            <div className="relative bg-secondary p-6 lg:p-8 border-l-4 border-primary">
              <div className="absolute -top-4 -left-4 w-6 lg:w-8 h-6 lg:h-8 bg-primary" />
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <div className="text-5xl lg:text-7xl font-bold tracking-tighter">600</div>
                  <div className="text-lg lg:text-xl text-muted-foreground">Euro'ya kadar</div>
                </div>
                <div className="border-t border-foreground/10 pt-4 lg:pt-6">
                  <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Komisyon</div>
                  <div className="text-2xl lg:text-3xl font-bold">%25</div>
                </div>
                <div className="border-t border-foreground/10 pt-4 lg:pt-6">
                  <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Ortalama Süre</div>
                  <div className="text-xl lg:text-2xl font-bold">4-8 Hafta</div>
                </div>
                <div className="w-12 lg:w-16 h-12 lg:h-16 bg-primary" />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 lg:w-24 h-16 lg:h-24 border-2 border-foreground/20" />
          </div>
          
          {/* Mobile Hero Card */}
          <div className="md:hidden bg-secondary p-4 sm:p-6 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tighter">600</div>
                <div className="text-sm sm:text-base text-muted-foreground">Euro'ya kadar</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Komisyon</div>
                <div className="text-xl sm:text-2xl font-bold">%25</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-foreground/10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Ortalama Süre</span>
              <span className="font-bold">4-8 Hafta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadgesSection() {
  const badges = [
    {
      icon: ShieldCheck,
      title: "Şeffaf Sürec",
      description: "Her aşamada bilgilendirme"
    },
    {
      icon: Award,
      title: "No Win No Fee",
      description: "Kazanmazsak ücret yok"
    },
    {
      icon: Star,
      title: "4.9/5 Trustpilot",
      description: "500+ müşteri yorumu",
      isLink: true,
      href: "https://www.trustpilot.com/review/ucustazminat.com"
    },
    {
      icon: Zap,
      title: "Hızlı Süreç",
      description: "Ortalama 4-8 hafta"
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-secondary/50 border-b border-foreground/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge) => (
            badge.isLink && badge.href ? (
              <a
                key={badge.title}
                href={badge.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{badge.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{badge.description}</div>
                </div>
              </a>
            ) : (
              <div key={badge.title} className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">{badge.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{badge.description}</div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "2,847+", label: "Başarılı Talep", description: "müşteri tazminatı aldı" },
    { value: "€847K+", label: "Toplam Tazminat", description: "müşterilerimize ödendi" },
    { value: "%94", label: "Başarı Oranı", description: "uygun taleplerde" },
    { value: "12K+", label: "Mutlu Müşteri", description: "5 yıldız puan verdi" }
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16 border-b border-foreground/10">
      <div className="container">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Rakamlarla UçuşTazminat</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Binlerce yolcunun güvendiği platform</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 sm:p-6 bg-secondary/30 rounded-lg">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</div>
              <div className="font-semibold text-sm sm:text-base mb-1">{stat.label}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickCalculatorSection() {
  const [distance, setDistance] = useState([1500]);
  const [delayType, setDelayType] = useState<string>("3-4");
  const [flightType, setFlightType] = useState<string>("international");

  const getCompensation = () => {
    const km = distance[0];
    if (delayType === "less-3") return 0;
    // Yurtiçi uçuşlar için 100 EUR
    if (flightType === "domestic") return 100;
    // Yurtdışı uçuşlar için mesafeye göre
    if (km <= 1500) return 250;
    if (km <= 3500) return 400;
    return 600;
  };

  const compensation = getCompensation();

  return (
    <section id="hizli-hesapla" className="py-12 sm:py-16 md:py-20 bg-secondary/30 border-b border-foreground/10">
      <div className="container max-w-4xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Anında Hesaplama</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Hızlı Tazminat Hesaplayıcı</h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Uçuş mesafenizi ve gecikme süresini seçin, tahmini tazminat tutarınızı anında öğrenin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Calculator Card */}
          <div className="bg-background p-6 sm:p-8 rounded-lg border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              Tazminat Hesaplayıcı
            </h3>

            <div className="space-y-6">
              {/* Flight Type - Önce uçuş türü seçilmeli */}
              <div>
                <label className="text-sm font-medium mb-3 block">Uçuş Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "domestic", label: "Yurtiçi (Türkiye içi)" },
                    { value: "international", label: "Yurtdışı" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFlightType(option.value)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        flightType === option.value
                          ? "bg-primary text-white border-primary"
                          : "bg-background border-border hover:border-primary/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {flightType === "domestic" && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Yurtiçi uçuşlarda mesafeden bağımsız sabit 100 EUR tazminat uygulanır
                  </p>
                )}
              </div>

              {/* Distance Slider - Sadece yurtdışı için göster */}
              {flightType === "international" && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium">Uçuş Mesafesi</label>
                    <span className="text-sm font-bold text-primary">{distance[0].toLocaleString()} km</span>
                  </div>
                  <Slider
                    value={distance}
                    onValueChange={setDistance}
                    min={500}
                    max={6000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>500 km</span>
                    <span>6000 km</span>
                  </div>
                </div>
              )}

              {/* Delay Type */}
              <div>
                <label className="text-sm font-medium mb-3 block">Gecikme Süresi / Durum</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "less-3", label: "3 saatten az" },
                    { value: "3-4", label: "3-4 saat" },
                    { value: "4+", label: "4 saat ve üzeri" },
                    { value: "cancelled", label: "İptal edildi" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDelayType(option.value)}
                      className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                        delayType === option.value
                          ? "bg-primary text-white border-primary"
                          : "bg-background border-border hover:border-primary/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground mb-1">Tahmini Tazminat</div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-bold ${compensation > 0 ? "text-primary" : "text-muted-foreground"}`}>
                    {compensation}
                  </span>
                  <span className="text-xl text-muted-foreground">€</span>
                </div>
                {compensation === 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    3 saatten az gecikmelerde tazminat hakkı doğmaz
                  </p>
                )}
                {compensation > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    kişi başı, {flightType === "domestic" ? "yurtiçi uçuş" : distance[0] <= 1500 ? "1500 km'ye kadar" : distance[0] <= 3500 ? "1500-3500 km arası" : "3500 km üzeri"} için
                  </p>
                )}
              </div>

              <a href="#hesapla" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Detaylı Hesaplama Yap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            {/* Conditions */}
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Tazminat Alma Şartları
              </h3>
              <ul className="space-y-2 text-sm">
                {[
                  "Uçuşunuz 3 saatten fazla gecikti",
                  "Uçuşunuz iptal edildi",
                  "Overbooking nedeniyle uçuşa alınmadınız",
                  "Son 3 yıl içinde gerçekleşti",
                  "Türkiye'den kalkan veya Türk havayolu ile uçuş"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compensation Table */}
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="font-bold mb-4">SHY-YOLCU Tazminat Tablosu</h3>
              <div className="space-y-3">
                {[
                  { distance: "Yurtiçi Uçuşlar", amount: "100 EUR" },
                  { distance: "Yurtdışı 1.500 km'ye kadar", amount: "250 EUR" },
                  { distance: "Yurtdışı 1.500 - 3.500 km", amount: "400 EUR" },
                  { distance: "Yurtdışı 3.500 km üzeri", amount: "600 EUR" }
                ].map((tier, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{tier.distance}</span>
                    <span className="font-bold text-primary">{tier.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClaimWizardSection({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [, setLocation] = useLocation();
  
  const handleWizardComplete = (data: any) => {
    // Wizard tamamlandığında dashboard'a yönlendir ve veriyi sakla
    if (isAuthenticated) {
      // Veriyi sessionStorage'a kaydet
      sessionStorage.setItem("claimWizardData", JSON.stringify(data));
      setLocation("/dashboard/new-claim");
    } else {
      // Giriş yapmamışsa login sayfasına yönlendir
      sessionStorage.setItem("claimWizardData", JSON.stringify(data));
      window.location.href = "/giris";
    }
  };

  return (
    <section id="hesapla" className="py-12 sm:py-16 md:py-20 bg-foreground text-background">
      <div className="container">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-primary" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-background/60">
              Detaylı Hesaplama
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-3 sm:mb-4">
            Tazminat Talebinizi Başlatın
          </h2>
          
          <p className="text-sm sm:text-base text-background/70 max-w-2xl">
            Güzergah bilgilerinizi girin, sistemimiz mesafeyi otomatik hesaplayarak 
            hak kazanabileceğiniz tazminat miktarını anında göstersin.
          </p>
        </div>
        
        <div className="bg-background text-foreground p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg">
          <ClaimWizard onComplete={handleWizardComplete} />
        </div>
      </div>
    </section>
  );
}

function AwardsAndPressSection() {
  const awards = [
    {
      title: "Best Flight Compensation Service 2025",
      organization: "Travel Tech Awards",
      year: "2025",
      icon: Trophy
    },
    {
      title: "Customer Excellence Award",
      organization: "Travel Service Awards",
      year: "2024",
      icon: Medal
    },
    {
      title: "Innovation in Travel Tech",
      organization: "Travel Innovation Awards",
      year: "2024",
      icon: Award
    }
  ];

  const press = [
    {
      name: "Sabah Gazetesi",
      title: "Uçak yolcularının hakkı var",
      url: "#",
      logo: "📰"
    },
    {
      name: "Hürriyet",
      title: "Geciken uçuşlar için tazminat nasıl alınır?",
      url: "#",
      logo: "📰"
    },
    {
      name: "Milliyet",
      title: "Tazminat hakkınızı kullanın",
      url: "#",
      logo: "📰"
    },
    {
      name: "Bloomberg",
      title: "Flight compensation services in Turkey",
      url: "#",
      logo: "📰"
    },
    {
      name: "Forbes",
      title: "How to claim flight delay compensation",
      url: "#",
      logo: "📰"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary border-b border-foreground/10">
      <div className="container">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Ödüller ve Medya</h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Sektör lideri olarak tanınan hizmetimiz hakkında medyada çıkan haberler
          </p>
        </div>

        {/* Awards */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-lg font-bold mb-6 text-center">Kazandığımız Ödüller</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {awards.map((award, index) => (
              <div 
                key={index} 
                className="bg-background p-6 rounded-lg border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <award.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-2">{award.title}</h4>
                <p className="text-muted-foreground text-sm">{award.organization}</p>
                <p className="text-xs text-muted-foreground mt-1">{award.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-center">Medyada Biz</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {press.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-4 rounded-lg border border-border text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-2">{item.logo}</div>
                <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.title}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: MapPin,
      title: "Güzergahınızı Girin",
      description: "Kalkış ve varış noktalarını seçin. Aktarmalı uçuşlarda aktarma noktasını da belirtin."
    },
    {
      num: "02",
      icon: FileText,
      title: "Belgelerinizi Yükleyin",
      description: "Biniş kartı, bilet ve kimlik belgenizi yükleyin. Sistemimiz otomatik olarak bilgileri çıkarır."
    },
    {
      num: "03",
      icon: Clock,
      title: "Biz Takip Edelim",
      description: "Havayolu ile tüm iletişimi biz yürütürüz. Gerekirse hukuki süreç başlatırız."
    },
    {
      num: "04",
      icon: CheckCircle,
      title: "Tazminatınızı Alın",
      description: "Tazminat onaylandığında, komisyonumuz düşüldükten sonra ödemenizi alırsınız."
    }
  ];

  return (
    <section id="nasil-calisir" className="py-12 sm:py-16 md:py-20 border-b border-foreground/10">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-2 h-2 bg-primary" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Süreç
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-0">Nasıl Çalışır?</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md">
            Dört basit adımda tazminat talebinizi başlatın ve takip edin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={step.num} className="relative">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground/5 mb-3 sm:mb-4">{step.num}</div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <h3 className="text-base sm:text-lg font-bold">{step.title}</h3>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompensationTiersSection() {
  // SHY-YOLCU tazminat kategorileri (4 kategori)
  const shyTiers = [
    {
      distance: "Yurtiçi Uçuşlar",
      amount: "100€",
      minDelay: "2+ saat",
      examples: "İstanbul - Ankara, İzmir - Antalya",
      highlight: false
    },
    {
      distance: "Yurtdışı 1500 km'ye kadar",
      amount: "250€",
      minDelay: "2+ saat",
      examples: "İstanbul - Atina, İstanbul - Sofya",
      highlight: false
    },
    {
      distance: "Yurtdışı 1500-3500 km",
      amount: "400€",
      minDelay: "3+ saat",
      examples: "İstanbul - Londra, İstanbul - Paris",
      highlight: true
    },
    {
      distance: "Yurtdışı 3500 km üzeri",
      amount: "600€",
      minDelay: "4+ saat",
      examples: "İstanbul - New York, İstanbul - Tokyo",
      highlight: false
    }
  ];

  // EC-261 tazminat kategorileri (3 kategori)
  const ec261Tiers = [
    {
      distance: "1500 km'ye kadar",
      amount: "250€",
      minDelay: "2+ saat",
      examples: "Paris - Amsterdam, Londra - Dublin"
    },
    {
      distance: "1500-3500 km",
      amount: "400€",
      minDelay: "3+ saat",
      examples: "Frankfurt - İstanbul, Paris - Moskova"
    },
    {
      distance: "3500 km üzeri",
      amount: "600€",
      minDelay: "4+ saat",
      examples: "Londra - New York, Paris - Tokyo"
    }
  ];

  return (
    <section id="tazminat" className="py-12 sm:py-16 md:py-20 bg-secondary border-b border-foreground/10">
      <div className="container">
        {/* SHY-YOLCU Bölümü */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-primary" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
              SHY-YOLCU Yönetmeliği (Türkiye)
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-0">Türkiye Kalkış/Varışlı Uçuşlar</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md">
              Türkiye'den kalkan veya Türkiye'ye inen tüm uçuşlar için geçerlidir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {shyTiers.map((tier) => (
              <div 
                key={tier.distance} 
                className={`bg-background p-4 sm:p-6 border-l-4 relative ${tier.highlight ? 'border-primary' : 'border-foreground/20'}`}
              >
                <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{tier.distance}</div>
                <div className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 ${tier.highlight ? 'text-primary' : ''}`}>{tier.amount}</div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Gecikme</span>
                    <span className="font-medium">{tier.minDelay}</span>
                  </div>
                  <div className="pt-2 border-t border-foreground/10">
                    <span className="text-muted-foreground">Örnek:</span>
                    <p className="text-foreground text-xs">{tier.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EC-261 Bölümü */}
        <div>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-blue-500" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
              EC-261 Yönetmeliği (Avrupa Birliği)
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-0">AB Kalkış/Varışlı Uçuşlar</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md">
              Avrupa Birliği'nden kalkan veya AB'ye inen uçuşlar için geçerlidir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {ec261Tiers.map((tier) => (
              <div 
                key={tier.distance} 
                className="bg-background p-4 sm:p-6 border-l-4 border-blue-500 relative"
              >
                <div className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">{tier.distance}</div>
                <div className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{tier.amount}</div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min. Gecikme</span>
                    <span className="font-medium">{tier.minDelay}</span>
                  </div>
                  <div className="pt-2 border-t border-foreground/10">
                    <span className="text-muted-foreground">Örnek:</span>
                    <p className="text-foreground text-xs">{tier.examples}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bilgi Notu */}
        <div className="mt-8 sm:mt-12 grid sm:grid-cols-2 gap-4">
          <div className="p-3 sm:p-4 bg-background border-l-4 border-primary">
            <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">İptal ve Uçuşa Alınmama</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Uçuş iptali veya fazla rezervasyon nedeniyle uçuşa alınmama durumlarında, 
              gecikme süresi şartı aranmaksızın yukarıdaki tazminat miktarları geçerlidir.
            </p>
          </div>
          <div className="p-3 sm:p-4 bg-background border-l-4 border-blue-500">
            <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Her İki Yönetmelik Geçerliyse</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Bazı uçuşlar hem SHY-YOLCU hem de EC-261 kapsamında olabilir. 
              Bu durumda sizin için en avantajlı olanı uygulanır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustpilotWidget() {
  return (
    <section className="py-8 sm:py-10 bg-secondary/30 border-b border-foreground/10">
      <div className="container">
        <div className="bg-background rounded-lg p-6 sm:p-8 border border-border max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-4xl sm:text-5xl">⭐</div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">4.9 out of 5</div>
                <div className="flex items-center gap-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                  <span className="text-sm text-muted-foreground">Excellent</span>
                </div>
                <a 
                  href="https://www.trustpilot.com/review/ucustazminat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Trustpilot'da 500+ yorum
                </a>
              </div>
            </div>
            <a 
              href="https://www.trustpilot.com/review/ucustazminat.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <img
                src="https://images.trustpilot.com/brand-assets/4.1/Logo/light-background.svg"
                alt="Trustpilot"
                className="h-8 sm:h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mehmet Y.",
      location: "İstanbul",
      text: "3 saat geciken uçuşum için 400€ tazminat aldım. Süreç çok kolay ve hızlıydı. Teşekkürler UçuşTazminat!",
      amount: "400€",
      airline: "THY",
      rating: 5
    },
    {
      name: "Ayşe K.",
      location: "Ankara",
      text: "İptal edilen uçuşum için 600€ tazminat hakkım olduğunu bilmiyordum. UçuşTazminat sayesinde hakkımı aldım.",
      amount: "600€",
      airline: "Pegasus",
      rating: 5
    },
    {
      name: "Ali R.",
      location: "İzmir",
      text: "Profesyonel ekip, sürekli bilgilendirme. 2 ay içinde tazminatım hesabıma yatırıldı. Kesinlikle tavsiye ederim.",
      amount: "250€",
      airline: "SunExpress",
      rating: 5
    }
  ];

  return (
    <section id="yorumlar" className="py-12 sm:py-16 md:py-20 border-b border-foreground/10">
      <div className="container">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-2 h-2 bg-primary" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
            MÜŞTERİ YORUMLARI
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">
          Müşterilerimiz Ne Diyor?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-background border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{testimonial.amount}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.airline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          * Yukarıdaki yorumlar gerçek müşteri deneyimlerine dayanmaktadır. 
          İsimler gizlilik nedeniyle kısaltılmıştır.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    // Genel Bilgiler
    {
      question: "Hangi uçuşlar için tazminat talep edebilirim?",
      answer: "Türkiye'den kalkan veya Türkiye'ye inen tüm uçuşlar için SHY-YOLCU Yönetmeliği kapsamında tazminat talep edebilirsiniz. Ayrıca AB ülkelerinden kalkan veya AB havayolları ile yapılan uçuşlar EC-261 kapsamındadır. Gecikme (yurt içi 2+ saat, yurt dışı 3+ saat), iptal veya fazla rezervasyon (overbooking) durumlarında hakkınız doğar. Son 3 yıl içindeki uçuşlar için başvuru yapabilirsiniz."
    },
    {
      question: "Tazminat miktarları nasıl belirleniyor?",
      answer: "Tazminat miktarları uçuş mesafesine göre belirlenir. Yurt içi uçuşlarda 100€, yurt dışı 1.500 km'ye kadar 250€, 1.500-3.500 km arası 400€, 3.500 km üzeri 600€ tazminat hakkınız vardır. Bu miktarlar kişi başınadır ve aile ile seyahat ediyorsanız her yolcu için ayrı tazminat talep edilebilir."
    },
    {
      question: "SHY-YOLCU Yönetmeliği nedir?",
      answer: "SHY-YOLCU, Sivil Havacılık Genel Müdürlüğü (SHGM) tarafından düzenlenen ve Türkiye'den kalkan/inen uçuşlarda yolcu haklarını koruyan yönetmeliktir. AB'nin EC-261 düzenlenmesine benzer şekilde, gecikme, iptal ve fazla rezervasyon durumlarında yolculara tazminat hakkı tanır."
    },
    // Sürec Hakkında
    {
      question: "Tazminat almak ne kadar sürer?",
      answer: "Sürec havayolunun yanıt hızına bağlıdır. Genellikle 4-8 hafta içinde sonuçlanır. Havayolu talebi reddederse veya yanıt vermezse hukuki sürec başlatılır, bu durumda sürec 3-6 aya uzayabilir. Tüm sürec boyunca sizi bilgilendiririz."
    },
    {
      question: "Başvuru süreci nasıl işliyor?",
      answer: "1) Uçuş bilgilerinizi girin ve tazminat miktarınızı öğrenin. 2) Gerekli belgeleri (biniş kartı, kimlik) yükleyin. 3) Alacak temlik sözleşmesini imzalayın. 4) Biz havayolu ile iletişime geçeriz. 5) Tazminat onaylandığında ödemenizi alırsınız. Tüm süreci panelinizden takip edebilirsiniz."
    },
    {
      question: "Alacak temlik sözleşmesi nedir?",
      answer: "Alacak temlik sözleşmesi, tazminat alacağınızı bize devretmenizi sağlayan yasal bir belgedir. Bu sayede havayolu ile tüm görüşmeleri ve gerekirse hukuki süreci sizin adınıza yürütebiliriz. Başarılı olursak komisyonumuzu düştükten sonra kalan tutarı size öderiz."
    },
    // Ücretler ve Ödeme
    {
      question: "Komisyon oranınız nedir?",
      answer: "Standart komisyonumuz tazminat tutarının %25'idir. Hukuki sürec gerekirse (dava açılması durumunda) ek %15 komisyon uygulanır. Önemli: 'No Win No Fee' politikamız gereği, tazminat alamazsak sizden hiçbir ücret talep etmeyiz. Risk tamamen bize aittir."
    },
    {
      question: "Ödeme nasıl yapılıyor?",
      answer: "Tazminat havayolundan tahsil edildikten sonra, komisyonumuz düşüldükten sonra kalan tutar belirttiğiniz IBAN hesabına 3-5 iş günü içinde aktarılır. Ödeme Euro veya Türk Lirası olarak yapılabilir (güncel kur üzerinden)."
    },
    // Belgeler
    {
      question: "Hangi belgeler gerekli?",
      answer: "Zorunlu belgeler: 1) Biniş kartı veya e-bilet/rezervasyon onayı 2) Kimlik belgesi (nüfus cüzdanı veya pasaport). İsteğe bağlı: Gecikme/iptal bildirimi, havayolundan alınan yazışmalar. Belgeleriniz yoksa bile başvuru yapabilirsiniz, uçuş kayıtlarını sistemimizden doğrulayabiliriz."
    },
    {
      question: "Biniş kartımı kaybettim, ne yapabilirim?",
      answer: "Biniş kartınız yoksa e-biletinizi veya rezervasyon onay e-postasını kullanabilirsiniz. Bunlar da yoksa, uçuş numarası ve tarihiyle başvuru yapabilirsiniz. Sistemimiz havayolu kayıtlarından uçuşunuzu doğrulayabilir."
    },
    // Olağanüstü Durumlar
    {
      question: "Olağanüstü koşullarda tazminat alabilir miyim?",
      answer: "Hayır, bazı durumlar 'olağanüstü koşullar' sayılır ve tazminat hakkı doğurmaz: Aşırı hava koşulları (fırtına, yoğun kar), hava trafiği kısıtlamaları, güvenlik tehditleri, politik istikrarsızlık, havaalanlarında grev. Ancak teknik arızalar, personel eksikliği ve havayolunun operasyonel sorunları olağanüstü koşul sayılmaz ve tazminat hakkı doğurur."
    },
    {
      question: "Aktarmalı uçuşlarda tazminat nasıl hesaplanır?",
      answer: "Aktarmalı uçuşlarda, eğer tüm uçuşlar tek bir rezervasyondaysa, tazminat başlangıç ve varış noktaları arasındaki toplam mesafeye göre hesaplanır. Örneğin İstanbul-Frankfurt-New York uçuşunda, İstanbul-New York mesafesi baz alınır. Ayrı rezervasyonlarda her uçuş ayrı değerlendirilir."
    },
    {
      question: "Uçuşum iptal edildi ama alternatif uçuş teklif edildi, tazminat alabilir miyim?",
      answer: "Evet, alabilirsiniz. Havayolu alternatif uçuş teklif etse bile, varış noktasına planlanan süreden 2-4 saat (mesafeye göre değişir) geç ulaştıysanız tazminat hakkınız vardır. İptal 14 günden az önce bildirilmişse ve uygun alternatif sunulmamışsa tam tazminat alabilirsiniz."
    },
    // Diğer
    {
      question: "Birden fazla yolcu için tek başvuru yapabilir miyim?",
      answer: "Evet, aynı uçuştaki tüm yolcular için tek başvuru yapabilirsiniz. Her yolcu için ayrı tazminat hesaplanır. Örneğin 4 kişilik bir aile 400€'luk bir uçuş için toplamda 1.600€ tazminat alabilir. Sadece birincil başvurucu (siz) imza atmanız yeterlidir."
    },
    {
      question: "Havayolu tazminat ödemeyi reddederse ne olur?",
      answer: "Havayolu talebi reddederse veya 6 hafta içinde yanıt vermezse, sizin adınıza hukuki sürec başlatırız. Türkiye'de SHGM'ye şikayet veya tüketici hakem heyetine başvuru yapabiliriz. AB uçuşlarında ilgili ülkenin otoritesine başvurulur. Hukuki sürecin tüm masraflarını biz karşılarız."
    },
    {
      question: "Daha önce havayoluna başvurdum ve reddedildim, yine de başvurabilir miyim?",
      answer: "Evet, kesinlikle başvurabilirsiniz. Havayolları genellikle bireysel başvuruları kolaylıkla reddeder. Biz profesyonel olarak haklarınızı savunur ve gerekirse hukuki sürec başlatırız. Daha önce reddedilen birçok talep bizim aracılığımızla başarıyla sonuçlanmıştır."
    }
  ];

  return (
    <section id="sss" className="py-12 sm:py-16 md:py-20 border-b border-foreground/10">
      <div className="container max-w-3xl">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-2 h-2 bg-primary" />
          <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">
            SSS
          </span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">Sıkça Sorulan Sorular</h2>
        
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-foreground/10"
            >
              <button
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-secondary transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium pr-4 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`} 
                />
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-muted-foreground text-sm sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-foreground text-background">
      <div className="container text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background mb-4 sm:mb-6">Tazminatınızı Almaya Başlayın</h2>
        <p className="text-sm sm:text-base text-background/70 mb-6 sm:mb-8 max-w-lg mx-auto">
          Uçuşunuz gecikti veya iptal mi edildi? Hemen kontrol edin ve hak ettiğiniz tazminatı alın.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#hesapla">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8">
              Tazminatımı Hesapla
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </a>
          <a 
            href="https://wa.me/905321234567" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10 text-base sm:text-lg px-6 sm:px-8">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              WhatsApp ile Sor
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 sm:py-10 md:py-12 border-t border-foreground/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-primary" />
              <span className="font-bold text-lg sm:text-xl">UçuşTazminat</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              SHY-YOLCU yönetmeliği kapsamında yolcu haklarınızı koruyoruz.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/905321234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href="tel:+905321234567" 
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
                aria-label="Telefon"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Hızlı Erişim</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><a href="#hesapla" className="hover:text-foreground transition-colors">Tazminat Hesapla</a></li>
              <li><a href="#nasil-calisir" className="hover:text-foreground transition-colors">Nasıl Çalışır</a></li>
              <li><a href="#tazminat" className="hover:text-foreground transition-colors">Tazminat Miktarları</a></li>
              <li><a href="#sss" className="hover:text-foreground transition-colors">SSS</a></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Yasal</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Kullanım Koşulları</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kvkk" className="hover:text-foreground transition-colors">KVKK Aydınlatma</Link></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">İletişim</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+905321234567" className="hover:text-foreground transition-colors">+90 532 123 45 67</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <a href="https://wa.me/905321234567" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp</a>
              </li>
              <li>info@ucustazminat.com</li>
            </ul>
            <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Çalışma Saatleri:</strong><br />
                Pazartesi - Cuma: 09:00 - 18:00
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          © 2026 UçuşTazminat. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}

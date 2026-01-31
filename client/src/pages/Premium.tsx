import { Link } from "wouter";
import { SEOHead, SEO_CONFIG } from "@/components/SEOHead";
import PremiumPlans from "@/components/PremiumPlans";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...SEO_CONFIG.premium} />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-background py-12">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-2 text-background/80 hover:text-background mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Ana Sayfaya Dön</span>
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-4xl sm:text-5xl font-bold">Premium Üyelik</h1>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">
              UçuşTazminat'ın tüm özelliklerine erişin ve tazminat sürecinizi hızlandırın.
            </p>
          </div>
        </div>
      </div>

      {/* Premium Plans */}
      <div className="container py-12">
        <PremiumPlans />
      </div>

      {/* CTA */}
      <div className="bg-secondary py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Hızlı Başlayın</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Tazminat talebinizi hemen başlatın ve Premium avantajlarından yararlanın.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/dashboard/new-claim">
              <Button className="bg-primary hover:bg-primary/90">
                Talep Oluştur
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">
                Dashboard'a Git
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

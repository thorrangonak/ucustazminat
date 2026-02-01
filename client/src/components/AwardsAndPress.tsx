import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy, Medal, Star, Shield, Zap } from 'lucide-react';

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: 'trophy' | 'medal' | 'star' | 'shield' | 'zap';
}

const AWARDS: Award[] = [
  {
    id: '1',
    title: 'En İyi Hukuk Teknoloji Şirketi',
    organization: 'Legal Tech Awards',
    year: '2024',
    description: 'Yenilikçi hukuk teknolojisi çözümleri ile ödüllendirildi',
    icon: 'trophy',
  },
  {
    id: '2',
    title: 'Müşteri Memnuniyet Ödülü',
    organization: 'Customer Choice Awards',
    year: '2024',
    description: '4.7/5 Trustpilot puanı ile en yüksek müşteri memnuniyeti',
    icon: 'star',
  },
  {
    id: '3',
    title: 'Hızlı ve Güvenilir Hizmet',
    organization: 'Travel Excellence Awards',
    year: '2023',
    description: 'Uçuş tazminatı alanında güvenilir hizmet sunumu',
    icon: 'shield',
  },
  {
    id: '4',
    title: 'Yılın Girişimi',
    organization: 'Startup Awards Turkey',
    year: '2023',
    description: 'Yolcu hakları alanında yenilikçi çözümler',
    icon: 'zap',
  },
  {
    id: '5',
    title: 'En İyi Müşteri Hizmetleri',
    organization: 'Service Excellence Awards',
    year: '2022',
    description: 'Profesyonel ve etkili destek hizmetleri',
    icon: 'medal',
  },
];

interface PressMention {
  id: string;
  publication: string;
  headline: string;
  date: string;
  url: string;
  excerpt: string;
  logo?: string;
}

const PRESS_MENTIONS: PressMention[] = [
  {
    id: '1',
    publication: 'Hürriyet',
    headline: 'UçuşTazminat: Yolcu haklarını koruyan dijital çözüm',
    date: 'Ocak 2024',
    url: '#',
    excerpt: 'Türk yolcular artık gecikmiş ve iptal edilmiş uçuşlardan dolayı tazminat alabilirler.',
  },
  {
    id: '2',
    publication: 'Milliyet',
    headline: 'Avrupa\'da uçuş tazminatında devrim',
    date: 'Aralık 2023',
    url: '#',
    excerpt: 'Avrupa Birliği yönetmeliklerine göre yolcular haklarını arayabilir.',
  },
  {
    id: '3',
    publication: 'Sabah',
    headline: 'UçuşTazminat 100.000\'inci başarılı talebi kutladı',
    date: 'Kasım 2023',
    url: '#',
    excerpt: 'Şirket bugüne kadar €30M+ tazminat sağladı.',
  },
  {
    id: '4',
    publication: 'Bloomberg',
    headline: 'Travel technology startup raises funding',
    date: 'Ekim 2023',
    url: '#',
    excerpt: 'European flight compensation startup expands operations.',
  },
];

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  shield: Shield,
  zap: Zap,
};

export default function AwardsAndPress() {
  return (
    <div className="space-y-12">
      {/* Awards Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Ödüllerimiz</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AWARDS.map((award) => {
            const Icon = iconMap[award.icon];
            return (
              <Card key={award.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {award.year}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{award.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-primary mb-2">
                    {award.organization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {award.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Press Mentions Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Basında Biz</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESS_MENTIONS.map((mention) => (
            <Card key={mention.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {mention.publication.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{mention.publication}</p>
                      <p className="text-xs text-muted-foreground">{mention.date}</p>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-base leading-tight">
                  {mention.headline}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {mention.excerpt}
                </p>
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Devamını oku →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

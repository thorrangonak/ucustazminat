import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubscribed(true);
      setEmail('');
      toast.success('Newsletter\'a başarıyla kayıt oldunuz!');
    } catch (error) {
      toast.error('Kayıt sırasında bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-green-900">Kayıt Başarılı!</h3>
              <p className="text-sm text-green-700">
                En son haberler ve fırsatlar için teşekkürler
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Bültenimize Katılın
        </CardTitle>
        <CardDescription>
          En son haberler, ipuçları ve özel fırsatlar için e-posta adresinizi paylaşın
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="e-posta@adresiniz.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Kayıt olarak{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Gizlilik Politikamızı
              </a>{' '}
              kabul etmiş olursunuz. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              'Kayıt olunuyor...'
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Bültenimize Kayıt Ol
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function MiniNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Bültenimize katıldınız!');
      setEmail('');
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
      <h3 className="font-bold mb-2 flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Haberdar Olun
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        En son yolcu hakları haberlerini alın
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
          className="flex-1"
        />
        <Button type="submit" disabled={isSubmitting} size="sm">
          {isSubmitting ? '...' : 'Kayıt'}
        </Button>
      </form>
    </div>
  );
}

import { Request, Response, NextFunction } from 'express';

interface RateLimiterConfig {
  windowMs: number;
  max: number;
  message?: string;
}

class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private windowMs: number;
  private max: number;
  private message: string;

  constructor(config: RateLimiterConfig) {
    this.windowMs = config.windowMs;
    this.max = config.max;
    this.message = config.message || 'Çok fazla istek. Lütfen daha sonra tekrar deneyin.';
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const ip = this.getClientIp(req);
      const now = Date.now();
      const record = this.requests.get(ip);

      if (!record || now > record.resetTime) {
        this.requests.set(ip, {
          count: 1,
          resetTime: now + this.windowMs,
        });
        return next();
      }

      if (record.count >= this.max) {
        const resetTimeRemaining = Math.ceil((record.resetTime - now) / 1000);
        res.setHeader('X-RateLimit-Limit', this.max.toString());
        res.setHeader('X-RateLimit-Remaining', '0');
        res.setHeader('X-RateLimit-Reset', record.resetTime.toString());
        res.setHeader('Retry-After', resetTimeRemaining.toString());
        return res.status(429).json({
          error: this.message,
          retryAfter: resetTimeRemaining,
        });
      }

      record.count++;
      this.requests.set(ip, record);
      res.setHeader('X-RateLimit-Limit', this.max.toString());
      res.setHeader('X-RateLimit-Remaining', (this.max - record.count).toString());
      res.setHeader('X-RateLimit-Reset', record.resetTime.toString());
      next();
    };
  }

  private getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.socket.remoteAddress ||
      'unknown'
    );
  }

  cleanupOldRecords() {
    const now = Date.now();
    for (const [ip, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(ip);
      }
    }
  }
}

const apiLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'API istek limiti aşıldı. 15 dakika sonra tekrar deneyin.',
});

const authLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
});

const claimLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: 'Talep oluşturma limiti aşıldı. Saatlik 3 talep sınırı vardır.',
});

const contactLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'İletişim formu için günlük limit aşıldı.',
});

export { RateLimiter, apiLimiter, authLimiter, claimLimiter, contactLimiter };

setInterval(() => {
  (apiLimiter as any).cleanupOldRecords();
}, 60 * 1000);

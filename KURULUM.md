# UçuşTazminat - Local Development Kurulumu

## Gereksinimler

1. Node.js (v18+) ve npm/pnpm
2. MySQL veya MariaDB
3. (Önerilen) Docker

## Kurulum Adımları

### 1. Proje Dosyalarını Hazırlama

Proje zaten /Users/thorium/ucustazminat-project dizininde kopyalanmıştır.

### 2. Dependencies Yükleme

```bash
cd /Users/thorium/ucustazminat-project
npx pnpm@latest install
```

### 3. Database Kurulumu

#### Option A: Docker ile MySQL (En Kolay Yöntem)

```bash
# MySQL container başlat
docker run --name ucustazminat-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=ucustazminat \
  -p 3306:3306 \
  -d mysql:8.0

# Container'ın başlamasını bekle (10-15 saniye)
sleep 15
```

#### Option B: Yerel MySQL Kurulumu

```bash
# MySQL başlat
mysql.server start

# Database oluştur
mysql -u root -p
# Şifre gir (veya enter)
CREATE DATABASE ucustazminat CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 4. Environment Değişkenleri

`.env` dosyası zaten oluşturulmuştur. MySQL şifrenizi kontrol edin:

```bash
cat .env
```

Varsayılan: `DATABASE_URL=mysql://root:password@localhost:3306/ucustazminat`

### 5. Database Migration

```bash
cd /Users/thorium/ucustazminat-project
npx pnpm run db:push
```

### 6. Projeyi Başlatma

```bash
npx pnpm run dev
```

Proje http://localhost:3000 adresinde çalışacaktır.

---

## Sorun Giderme

### MySQL Bağlantı Hatası

Eğer "ECONNREFUSED" hatası alırsanız:

1. MySQL'in çalıştığını kontrol edin:
   ```bash
   # Docker kullanıyorsanız:
   docker ps
   
   # Yerel MySQL kullanıyorsanız:
   mysql.server status
   ```

2. Port 3306'nın kullanımda olup olmadığını kontrol edin:
   ```bash
   lsof -i :3306
   ```

3. `.env` dosyasındaki DATABASE_URL'yi kontrol edin.

### Port 3000 Doluysa

Proje otomatik olarak boş bir port (3000-3020 arası) bulacaktır. Terminal'de hangi portta çalıştığını görebilirsiniz.

---

## Admin Paneli Erişimi

1. İlk olarak hesap oluşturun: http://localhost:3000/kayit
2. Admin rolünü vermek için şu komutu çalıştırın:

```bash
npx tsx server/_core/setAdminPassword.mjs
```

---

## Test Kullanıcısı

Otomatik olarak test için bir admin kullanıcısı oluşturmak için:

```bash
npx tsx check_admin2.mjs
```

---

## Önemli Notlar

- Bu development ortamıdır. Production için:
  - JWT_SECRET değerini değiştirin
  - Veritabanı şifresini güçlendirin
  - Google Analytics/Search Console ekleyin
  - HTTPS sertifikası alın
  - Cloud CDN entegrasyonu yapın
  - Rate limiting yapılandırın

---

## SEO ve Performans İyileştirmeleri

Proje şu SEO iyileştirmelerine sahiptir:
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Meta tags (Open Graph, Twitter Cards)
- ✅ Structured Data (Schema.org)
- ✅ Canonical URL'ler
- ✅ Lazy loading için Suspense
- ✅ Code splitting

Ek iyileştirmeler için `PROFESYONELLESTIRME_ANALIZI.md` dosyasına bakın.

# 🚀 Railway ile Deployment Rehberi

Railway, projenizi tek seferde deploy etmek için en kolay platform. Frontend + Backend + Database hepsini otomatik yönetir.

---

## 📋 Ön Hazırlık (10 dakika)

### 1. GitHub Hesabı ve Repo
1. GitHub hesabınızın olduğundan emin olun
2. Yeni bir repo oluşturun: `ucustazminat`

### 2. Proje GitHub'a Push Edin

Terminal'de şu komutları çalıştırın:

```bash
cd /Users/thorium/ucustazminat-project

# Git'i başlat
git init

# .gitignore oluştur (zaten var, kontrol et)
cat .gitignore

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "Initial commit: UçuşTazminat full-stack project"

# GitHub remote ekle
git remote add origin https://github.com/KULLANICI_ADINIZ/ucustazminat.git

# GitHub'a push
git push -u origin main
```

**Not:** `KULLANICI_ADINIZ` kısmını kendi GitHub kullanıcı adınızla değiştirin.

---

## 🚀 Railway Deployment (15 dakika)

### Adım 1: Railway Hesabı Oluşturun

1. https://railway.app adresine gidin
2. "Get Started" butonuna tıklayın
3. GitHub ile giriş yapın

### Adım 2: Railway'e GitHub Repo'yu Bağlayın

1. "New Project" → "Deploy from GitHub repo" tıklayın
2. `ucustazminat` repo'nuzu seçin
3. Railway otomatik olarak projeyi analiz edecek

### Adım 3: Deploy Yapılandırması

Railway'de otomatik olarak şu servisler oluşturulacak:

#### ✅ App Service (Frontend + Backend)
- **Build Command:** `pnpm run build`
- **Start Command:** `pnpm run start`

#### ✅ Database Service (MySQL)
- Railway otomatik olarak MySQL instance oluşturur

### Adım 4: Environment Variables Ayarlama

Railway dashboard'da proje ayarlarına gidin ve şu değişkenleri ekleyin:

#### 🔑 Gerekli Environment Variables

```bash
NODE_ENV=production
PORT=3000
```

#### 🔑 Database URL (Railway otomatik oluşturur)
Railway MySQL service'inin `DATABASE_URL` değişkenini kopyalayın ve App service'e ekleyin.

Format:
```
mysql://root:PASSWORD@railyway-mysql-host:3306/railway
```

#### 🔑 JWT Secret (Production için güçlü bir şifre)
```
JWT_SECRET=sizin_güvenli_secret_key_buraya
```

#### 🔑 Analytics (Opsiyonel)
Eğer Google Analytics kullanıyorsanız:
```
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=YOUR_WEBSITE_ID
```

#### 🔑 OAuth ve API Keys (Gelişmiş)
Production'da gerekirse:
```
OAUTH_SERVER_URL=your_oauth_server_url
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
RESEND_API_KEY=re_your_resend_key
```

---

## 🔄 Deployment Süreci

1. Railway proje dosyalarını analiz eder
2. Dependencies yükler
3. Database oluşturur
4. Migration çalıştırır
5. Build eder
6. Deploy eder

**Süre:** 5-10 dakika

Railway dashboard'da deployment status'unu görebilirsiniz.

---

## ✅ Deploy Bitti! Şimdi Ne Yapmalı?

### 1. Domain Ayarlama (Opsiyonel)

Railway otomatik olarak bir domain verir:
- `your-project.railway.app`

Kendi domain'inizi kullanmak için:
1. Railway dashboard'da "Settings" → "Domains"
2. Domain'inizi ekleyin (örn: `ucustazminat.com`)
3. DNS ayarlarını Railway'den kopyalayın
4. Domain'inizin DNS yönetim panelinde ekleyin

### 2. SSL Sertifika

Railway otomatik olarak Let's Encrypt SSL sertifikası sağlar. Manuel yapılandırma gerekmez.

### 3. Database Access

Railway MySQL'e erişmek için:
1. Railway dashboard'da MySQL service'e tıklayın
2. "Connect" sekmesine gidin
3. Connection string'i kopyalayın

### 4. Deployment Monitor

Railway dashboard'da şunları görebilirsiniz:
- Deployment log'ları
- Resource kullanımı
- Uptime durumu
- Error log'ları

---

## 🧪 Test Etme

Deploy tamamlandıktan sonra:

1. Railway dashboard'da domain'i kopyalayın
2. Tarayıcıda açın
3. Şunları test edin:
   - Ana sayfa yükleniyor mu?
   - Tazminat hesaplama çalışıyor mu?
   - Kullanıcı kaydı yapabiliyor musunuz?
   - Admin paneli erişilebilir mi?

---

## 📊 Maliyet Tahmini

### Railway Fiyatlandırma (2024)

#### Ücretsiz Tier (1 ay)
- $5 kredi
- Yeterli başlangıç için

#### Ücretli Planlar
- **Hobby:** $5/ay (512MB RAM, 0.5 CPU)
- **Startup:** $20/ay (2GB RAM, 1 CPU)
- **Pro:** $40/ay (4GB RAM, 2 CPU)

**Tahmini maliyet:** $20-40/ay (Hobby/Startup planı + Database)

---

## 🔧 Troubleshooting

### Sorun 1: Build Hatası

**Çözüm:** Railway log'larını kontrol edin
```bash
# Terminal'de yerel olarak test
cd /Users/thorium/ucustazminat-project
pnpm run build
```

### Sorun 2: Database Bağlantı Hatası

**Çözüm:** `DATABASE_URL` değişkenini kontrol edin
- Railway MySQL service'inin connection string'ini kopyalayın
- App service'e doğru eklediğinizden emin olun

### Sorun 3: Environment Variables Görünmüyor

**Çözüm:** Railway dashboard'da rebuild trigger edin
1. "Settings" → "Variables"
2. Herhangi bir değişkeni değiştirin
3. Deploy tekrar başlar

### Sorun 4: Port Erişim Sorunu

**Çözüm:** `PORT` değişkeni ekleyin
```bash
PORT=3000
```

---

## 📈 Production İpuçları

### 1. Monitoring

Railway'in monitoring özelliklerini kullanın:
- Metrics dashboard
- Log'ları izleme
- Alert ayarlama

### 2. Backup

Railway otomatik backup sağlar ama:
- Manuel export alın (dump)
- Sık sık yedekleme yapın

### 3. Scale

Trafik artarsa:
1. Railway dashboard'da upgrade edin
2. Horizontal scaling (replicas) kullanın
3. CDN ekleyin (Cloudflare)

### 4. Security

Production'da şunları yapın:
- Güçlü JWT_SECRET kullanın
- Database şifresini değiştirin
- IP whitelist ekleyin (gerekirse)
- Rate limiting aktif (zaten ekledik)

---

## 🚀 Alternatif: Render Deployment (Ücretsiz)

Eğer ücretsiz denemek isterseniz Render kullanabilirsiniz:

1. https://render.com adresine gidin
2. GitHub ile giriş yapın
3. "New" → "Web Service"
4. Repo seçin
5. Build/Start command'ları ayarlayın
6. Deploy!

**Render Ücretsiz Tier:**
- Web Service: 512MB RAM, 0.1 CPU
- PostgreSQL: 1GB (ücretsiz)
- **Uygun:** Küçük projeler ve test

---

## 📞 Yardım

Sorularınız için:
- Railway docs: https://docs.railway.app
- Railway community: https://community.railway.app
- Bu rehberin sorunu yaşarsanız haber verin!

---

## ✅ Kontrol Listesi

Deploy öncesi kontrol:
- [ ] GitHub repo oluşturuldu
- [ ] Kodlar GitHub'a push edildi
- [ ] Railway hesabı oluşturuldu
- [ ] Railway'de proje oluşturuldu
- [ ] Environment variables ayarlandı
- [ ] Database URL doğru
- [ ] JWT_SECRET güçlü

Deploy sonrası kontrol:
- [ ] Sayfa yükleniyor
- [ ] Tazminat hesaplama çalışıyor
- [ ] Kullanıcı kaydı yapılabiliyor
- [ ] Database bağlantısı çalışıyor
- [ ] SSL sertifika aktif
- [ ] Log'lar temiz

---

## 🎯 Başarı!

Deploy tamamlandıktan sonra, projeniz Railway'de çalışıyor olacak!

Railway domain'i: `https://ucustazminat-production.up.railway.app`

Kendi domain'inizi bağlamak için "Domain Ayarlama" kısmına bakın.

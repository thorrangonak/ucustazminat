export type Language = 'tr' | 'en';
export type Currency = 'EUR' | 'USD' | 'TRY';

export const TRANSLATIONS = {
  tr: {
    // Common
    common: {
      appName: 'UçuşTazminat',
      appNameShort: 'UçuşTazminat',
      home: 'Ana Sayfa',
      dashboard: 'Panelim',
      login: 'Giriş Yap',
      logout: 'Çıkış Yap',
      register: 'Kayıt Ol',
      contact: 'İletişim',
      about: 'Hakkımızda',
      terms: 'Kullanım Şartları',
      privacy: 'Gizlilik Politikası',
      help: 'Yardım',
      support: 'Destek',
      loading: 'Yükleniyor...',
      error: 'Hata',
      success: 'Başarılı',
      cancel: 'İptal',
      save: 'Kaydet',
      delete: 'Sil',
      edit: 'Düzenle',
      view: 'Görüntüle',
      search: 'Ara',
      filter: 'Filtrele',
      sort: 'Sırala',
      back: 'Geri',
      next: 'İleri',
      submit: 'Gönder',
      confirm: 'Onayla',
      close: 'Kapat',
      yes: 'Evet',
      no: 'Hayır',
      or: 'veya',
      and: 've',
    },

    // Navigation
    nav: {
      newClaim: 'Yeni Talep',
      myClaims: 'Taleplerim',
      claims: 'Talepler',
      settings: 'Ayarlar',
      profile: 'Profil',
      notifications: 'Bildirimler',
    },

    // Home Page
    home: {
      heroTitle: 'Uçuş Gecikmesi veya İptali mi Yaşadınız?',
      heroSubtitle: 'Avrupa Birliği yönetmeliklerine göre €600\'ya kadar tazminat alabilirsiniz',
      ctaButton: 'Ücretsiz Hesapla',
      statsTitle: 'Güvenilir Hizmet, Kanıtlanmış Sonuçlar',
      statsSubtext: 'Yıllardır yolcu haklarını koruyoruz',
      howItWorksTitle: 'Nasıl Çalışır?',
      step1Title: '1. Hakkınızı Belirleyin',
      step1Desc: 'Ücretsiz hesaplama aracımızla hak edeceğiniz tazminatı öğrenin',
      step2Title: '2. Talep Oluşturun',
      step2Desc: 'Biniş kartınızı yükleyin ve bilgilerinizi doldurun',
      step3Title: '3. Tazminat Alın',
      step3Desc: 'Hukuki süreci biz yönetelim, hak ettiğiniz parayı alın',

      // Compensation types
      delay: 'Gecikme',
      cancellation: 'İptal',
      deniedBoarding: 'Reddedilme',
      downgrade: 'Sınıf Düşürme',

      // Compensation amounts
      compensationAmount: 'Tazminat Tutarı',
      upTo: 'Kadar',
    },

    // Claims
    claims: {
      title: 'Tazminat Talepleri',
      newClaim: 'Yeni Talep Oluştur',
      claimNumber: 'Talep No',
      status: 'Durum',
      submitted: 'Gönderildi',
      underReview: 'İnceleniyor',
      documentsNeeded: 'Belge Bekleniyor',
      approved: 'Onaylandı',
      paymentPending: 'Ödeme Bekleniyor',
      paid: 'Ödendi',
      rejected: 'Reddedildi',
      closed: 'Kapatıldı',
    },

    // Form
    form: {
      flightNumber: 'Uçuş Numarası',
      flightDate: 'Uçuş Tarihi',
      departureAirport: 'Kalkış Havalimanı',
      arrivalAirport: 'Varış Havalimanı',
      disruptionType: 'Sorun Tipi',
      delayDuration: 'Gecikme Süresi (dakika)',
      passengerName: 'Yolcu Adı',
      passengerEmail: 'Yolcu E-posta',
      passengerPhone: 'Yolcu Telefon',
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta',
      phone: 'Telefon',
      uploadBoardingPass: 'Biniş Kartı Yükle',
      uploadDocuments: 'Belgeleri Yükle',
    },

    // Error messages
    errors: {
      required: 'Bu alan zorunludur',
      invalidEmail: 'Geçerli bir e-posta adresi girin',
      invalidPhone: 'Geçerli bir telefon numarası girin',
      networkError: 'Bağlantı hatası. Lütfen tekrar deneyin.',
      unauthorized: 'Yetkisiz erişim',
      notFound: 'Sayfa bulunamadı',
    },

    // Success messages
    success: {
      claimCreated: 'Talebiniz başarıyla oluşturuldu',
      claimSubmitted: 'Talebiniz gönderildi',
      profileUpdated: 'Profiliniz güncellendi',
      passwordChanged: 'Şifreniz değiştirildi',
    },
  },

  en: {
    // Common
    common: {
      appName: 'FlightCompensation',
      appNameShort: 'FlightComp',
      home: 'Home',
      dashboard: 'Dashboard',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      contact: 'Contact',
      about: 'About Us',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      help: 'Help',
      support: 'Support',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      back: 'Back',
      next: 'Next',
      submit: 'Submit',
      confirm: 'Confirm',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      or: 'or',
      and: 'and',
    },

    // Navigation
    nav: {
      newClaim: 'New Claim',
      myClaims: 'My Claims',
      claims: 'Claims',
      settings: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
    },

    // Home Page
    home: {
      heroTitle: 'Experienced Flight Delay or Cancellation?',
      heroSubtitle: 'You may be entitled to up to €600 compensation under EU regulations',
      ctaButton: 'Calculate for Free',
      statsTitle: 'Trusted Service, Proven Results',
      statsSubtext: 'We\'ve been protecting passenger rights for years',
      howItWorksTitle: 'How It Works',
      step1Title: '1. Know Your Rights',
      step1Desc: 'Use our free calculator to find out your compensation entitlement',
      step2Title: '2. Submit Your Claim',
      step2Desc: 'Upload your boarding pass and fill in your details',
      step3Title: '3. Get Compensation',
      step3Desc: 'We handle the legal process, you get paid',

      // Compensation types
      delay: 'Delay',
      cancellation: 'Cancellation',
      deniedBoarding: 'Denied Boarding',
      downgrade: 'Downgrade',

      // Compensation amounts
      compensationAmount: 'Compensation Amount',
      upTo: 'Up to',
    },

    // Claims
    claims: {
      title: 'Compensation Claims',
      newClaim: 'Create New Claim',
      claimNumber: 'Claim No',
      status: 'Status',
      submitted: 'Submitted',
      underReview: 'Under Review',
      documentsNeeded: 'Documents Needed',
      approved: 'Approved',
      paymentPending: 'Payment Pending',
      paid: 'Paid',
      rejected: 'Rejected',
      closed: 'Closed',
    },

    // Form
    form: {
      flightNumber: 'Flight Number',
      flightDate: 'Flight Date',
      departureAirport: 'Departure Airport',
      arrivalAirport: 'Arrival Airport',
      disruptionType: 'Disruption Type',
      delayDuration: 'Delay Duration (minutes)',
      passengerName: 'Passenger Name',
      passengerEmail: 'Passenger Email',
      passengerPhone: 'Passenger Phone',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      uploadBoardingPass: 'Upload Boarding Pass',
      uploadDocuments: 'Upload Documents',
    },

    // Error messages
    errors: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      networkError: 'Network error. Please try again.',
      unauthorized: 'Unauthorized access',
      notFound: 'Page not found',
    },

    // Success messages
    success: {
      claimCreated: 'Your claim has been created successfully',
      claimSubmitted: 'Your claim has been submitted',
      profileUpdated: 'Your profile has been updated',
      passwordChanged: 'Your password has been changed',
    },
  },
};

export const CURRENCIES = {
  EUR: { symbol: '€', rate: 1 },
  USD: { symbol: '$', rate: 1.08 },
  TRY: { symbol: '₺', rate: 37.5 },
};

export function translate(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = TRANSLATIONS[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

export function formatCurrency(amount: number, currency: Currency, lang: Language = 'tr'): string {
  const { symbol } = CURRENCIES[currency];
  const convertedAmount = amount * CURRENCIES[currency].rate;

  if (lang === 'tr') {
    return `${convertedAmount.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ${symbol}`;
  } else {
    return `${symbol}${convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  }
}

export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  return (amount * CURRENCIES[to].rate) / CURRENCIES[from].rate;
}

/**
 * SEO Schema Markup Types and Generators
 */

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    email: string;
    contactType: string;
    availableLanguage: string[];
  };
  sameAs: string[];
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
}

export interface FAQPageSchema {
  '@context': string;
  '@type': string;
  mainEntity: {
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }[];
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: {
    '@type': string;
    position: number;
    name: string;
    item: string;
  }[];
}

export interface ClaimServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed: {
    '@type': string;
    name: string;
  };
  offers: {
    '@type': string;
    name: string;
    description: string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UçuşTazminat',
    url: 'https://www.ucustazminat.com',
    logo: 'https://www.ucustazminat.com/logo.png',
    description: 'Uçuş gecikmesi, iptali ve fazla rezervasyon için tazminat talep edin. No Win No Fee garantisi.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Yanıkkaya Mahallesi',
      addressLocality: 'Kadıköy',
      addressRegion: 'İstanbul',
      postalCode: '34710',
      addressCountry: 'TR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-532-123-45-67',
      email: 'info@ucustazminat.com',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English']
    },
    sameAs: [
      'https://www.facebook.com/ucustazminat',
      'https://twitter.com/ucustazminat',
      'https://www.linkedin.com/company/ucustazminat',
      'https://www.instagram.com/ucustazminat'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2847'
    }
  };
}

export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateClaimServiceSchema(): ClaimServiceSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Flight Compensation Service',
    description: 'Get compensation for delayed, canceled, or overbooked flights. No Win No Fee guarantee.',
    provider: {
      '@type': 'Organization',
      name: 'UçuşTazminat'
    },
    areaServed: {
      '@type': 'Place',
      name: 'Turkey'
    },
    offers: {
      '@type': 'Offer',
      name: 'Flight Compensation Claim',
      description: 'We handle your flight compensation claim and only charge a 25% commission if successful.',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    }
  };
}

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: {
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
}

export function generateLocalBusinessSchema(
  cityName: string,
  airportCode: string
): LocalBusinessSchema {
  // Gerçek uygulamada havalimanı koordinatları database'den alınır
  const airportCoordinates: Record<string, { lat: number; lng: number }> = {
    IST: { lat: 41.2753, lng: 28.7487 },
    SAW: { lat: 40.8986, lng: 29.3092 },
    AYT: { lat: 36.8987, lng: 30.8005 },
    ESB: { lat: 39.9285, lng: 32.6348 },
    ADB: { lat: 38.2922, lng: 27.1570 }
  };

  const coords = airportCoordinates[airportCode] || { lat: 41.2753, lng: 28.7487 };

  return {
    '@context': 'https://schema.org',
    '@type': 'FlightAirport',
    name: `UçuşTazminat ${cityName}`,
    description: `${cityName} havalimanı için uçuş tazminatı hizmetleri. Gecikme, iptal ve overbooking durumlarında tazminat alın.`,
    url: `https://www.ucustazminat.com/havaliman/${cityName.toLowerCase()}/${airportCode.toLowerCase()}`,
    telephone: '+90-532-123-45-67',
    email: 'info@ucustazminat.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Havalimanı Terminali',
      addressLocality: cityName,
      addressRegion: airportCode === 'IST' ? 'İstanbul' : cityName,
      postalCode: airportCode,
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lng
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    }
  };
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  description: string;
  url: string;
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
}

export function generateArticleSchema(
  title: string,
  description: string,
  url: string,
  image: string,
  publishedDate: string,
  modifiedDate: string
): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: image,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Organization',
      name: 'UçuşTazminat'
    },
    description: description,
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  };
}

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Currency, TRANSLATIONS, CURRENCIES, translate, formatCurrency, convertCurrency } from '@shared/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
  formatMoney: (amount: number, currencyOverride?: Currency) => string;
  convertMoney: (amount: number, toCurrency: Currency) => number;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  defaultCurrency?: Currency;
}

export function LanguageProvider({
  children,
  defaultLanguage = 'tr',
  defaultCurrency = 'EUR',
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || defaultLanguage;
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('currency');
    return (saved as Currency) || defaultCurrency;
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
  };

  const t = (key: string): string => {
    return translate(language, key);
  };

  const formatMoney = (amount: number, currencyOverride?: Currency): string => {
    return formatCurrency(amount, currencyOverride || currency, language);
  };

  const convertMoney = (amount: number, toCurrency: Currency): number => {
    return convertCurrency(amount, currency, toCurrency);
  };

  const dir = 'ltr';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        formatMoney,
        convertMoney,
        dir,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}

export function useCurrency() {
  const { currency, setCurrency, formatMoney, convertMoney } = useLanguage();
  return { currency, setCurrency, formatMoney, convertMoney };
}

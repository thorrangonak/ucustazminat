import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SUPPORTED_LANGUAGES, SUPPORTED_CURRENCIES, formatCurrency, convertCurrency } from '@shared/i18n';
import type { LanguageCode, CurrencyCode } from '@shared/i18n';
import { Globe, DollarSign, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLanguage?: LanguageCode;
  onLanguageChange?: (language: LanguageCode) => void;
}

export function LanguageSwitcher({ currentLanguage = 'tr', onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageChange = (language: LanguageCode) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    onLanguageChange?.(language);
    
    // Tarayıcı localStorage'ına kaydet
    localStorage.setItem('preferredLanguage', language);
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 py-2">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-secondary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm">{language.name}</span>
                </span>
                {selectedLanguage === language.code && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface CurrencySwitcherProps {
  amount?: number;
  showSelector?: boolean;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

export function CurrencySwitcher({ amount, showSelector = true, onCurrencyChange }: CurrencySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('EUR');

  useEffect(() => {
    // localStorage'da kayıtlı para birimini al
    const savedCurrency = localStorage.getItem('preferredCurrency') as CurrencyCode;
    if (savedCurrency && SUPPORTED_CURRENCIES.find(c => c.code === savedCurrency)) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const handleCurrencyChange = (currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    onCurrencyChange?.(currency);
    localStorage.setItem('preferredCurrency', currency);
  };

  const currentCurrency = SUPPORTED_CURRENCIES.find(c => c.code === selectedCurrency);

  return (
    <div className="flex items-center gap-2">
      {amount !== undefined && (
        <span className="text-lg font-bold text-primary">
          {formatCurrency(amount, selectedCurrency)}
        </span>
      )}
      
      {showSelector && (
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>{currentCurrency?.symbol}</span>
            <span className="hidden sm:inline">{currentCurrency?.code}</span>
          </Button>

          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50 py-2">
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => handleCurrencyChange(currency.code)}
                    className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-secondary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg font-bold">{currency.symbol}</span>
                      <span className="text-sm">{currency.name}</span>
                    </span>
                    {selectedCurrency === currency.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface CurrencyDisplayProps {
  amountEUR: number;
  showAll?: boolean;
}

export function CurrencyDisplay({ amountEUR, showAll = false }: CurrencyDisplayProps) {
  const [preferredCurrency, setPreferredCurrency] = useState<CurrencyCode>('EUR');

  useEffect(() => {
    const saved = localStorage.getItem('preferredCurrency') as CurrencyCode;
    if (saved) setPreferredCurrency(saved);
  }, []);

  if (showAll) {
    return (
      <div className="flex flex-wrap gap-3 text-sm">
        {SUPPORTED_CURRENCIES.map((currency) => (
          <div
            key={currency.code}
            className="bg-secondary rounded px-3 py-1 flex items-center gap-1"
          >
            <span className="font-bold">{currency.symbol}</span>
            <span>
              {formatCurrency(convertCurrency(amountEUR, currency.code), currency.code)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
      {formatCurrency(convertCurrency(amountEUR, preferredCurrency), preferredCurrency)}
    </div>
  );
}

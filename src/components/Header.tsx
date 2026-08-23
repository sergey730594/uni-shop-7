import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, ChevronDown } from 'lucide-react';

// Флаги стран (эмодзи)
const FLAGS = {
  ka: '🇬🇪', // Грузия
  en: '🇬🇧', // Великобритания
  ru: '🇷🇺', // Россия
  tr: '🇹🇷', // Турция
};

const LANGUAGES = [
  { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

interface HeaderProps {
  onSearch?: (query: string) => void;
  onCartOpen?: () => void;
  onMenuOpen?: () => void;
  language?: string;
  onLanguageChange?: (lang: string) => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onCartOpen,
  onMenuOpen,
  language = 'ka',
  onLanguageChange,
  cartCount = 0,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Левая часть: Логотип */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Мобильное меню */}
            <button
              onClick={onMenuOpen}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Меню"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Логотип */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm sm:text-xl">U</span>
              </div>
              <span className="font-bold text-lg sm:text-2xl text-gray-800 hidden xs:block">
                Grant.ge
              </span>
            </div>
          </div>

          {/* Поиск */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ka' ? 'მოძებნეთ პროდუქტები...' :
                  language === 'en' ? 'Search products...' :
                  language === 'ru' ? 'Поиск товаров...' :
                  'Ürünleri ara...'
                }
                className="w-full pl-9 pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
          </form>

          {/* Правая часть: Язык + Корзина */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Переключатель языков с флагами */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl sm:text-2xl">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {language.toUpperCase()}
                </span>
                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1 sm:mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fade-in">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        if (onLanguageChange) onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 sm:px-4 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                        language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.label}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-blue-600">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Корзина */}
            <button
              onClick={onCartOpen}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Корзина"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] sm:text-xs min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] rounded-full flex items-center justify-center font-bold px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
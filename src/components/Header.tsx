import React, { useState, useRef, useEffect } from 'react';

const LANGUAGES = [
  { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

// SVG иконки
const MenuIcon = () => (
  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ChevronDownIcon = ({ className = '' }) => (
  <svg className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const HomeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
  </svg>
);

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

  const getPlaceholder = () => {
    const placeholders = {
      ka: 'მოძებნეთ დესერტები...',
      en: 'Search desserts...',
      ru: 'Поиск десертов...',
      tr: 'Tatlıları ara...',
    };
    return placeholders[language as keyof typeof placeholders] || placeholders.en;
  };

  // Меню навигации (только для десктопа)
  const menuItems = {
    ka: ['ტორტები', 'შიგთავსი', 'აქსესუარები', 'ყვავილები', 'გადახდა-მიტანა', 'კონტაქტი'],
    en: ['Cakes', 'Fillings', 'Accessories', 'Flowers', 'Payment-Delivery', 'Contact'],
    ru: ['Торты', 'Начинки', 'Аксессуары', 'Цветы', 'Оплата-Доставка', 'Контакты'],
    tr: ['Pastalar', 'Dolgular', 'Aksesuarlar', 'Çiçekler', 'Ödeme-Teslimat', 'İletişim'],
  };

  const items = menuItems[language as keyof typeof menuItems] || menuItems.ka;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Верхняя строка: лого, поиск, языки, корзина */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Левая часть */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onMenuOpen}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Меню"
            >
              <MenuIcon />
            </button>

            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ff0000] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm sm:text-xl">G</span>
              </div>
              <span className="font-bold text-lg sm:text-2xl text-gray-800 hidden xs:block">
                Grant Bakery
              </span>
            </a>
          </div>

          {/* Поиск */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative">
              <SearchIcon />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getPlaceholder()}
                className="w-full pl-9 pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent text-sm bg-gray-50 hover:bg-white transition-colors"
              />
            </div>
          </form>

          {/* Правая часть */}
          <div className="flex items-center gap-1 sm:gap-3">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-xl sm:text-2xl">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {language.toUpperCase()}
                </span>
                <ChevronDownIcon className={isLangOpen ? 'rotate-180' : ''} />
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
                        language === lang.code ? 'bg-red-50 text-[#ff0000]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.label}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-[#ff0000]">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onCartOpen}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Корзина"
            >
              <ShoppingBagIcon />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#ff0000] text-white text-[10px] sm:text-xs min-w-[18px] h-[18px] sm:min-w-[20px] sm:h-[20px] rounded-full flex items-center justify-center font-bold px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== ГОРИЗОНТАЛЬНОЕ МЕНЮ — ТОЛЬКО НА ДЕСКТОПЕ ===== */}
      <div className="hidden lg:block bg-[#ff0000] border-t border-[#cc0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start gap-4 sm:gap-6 md:gap-8 py-2.5 sm:py-3 overflow-x-auto hide-scrollbar">
            <a href="/" className="text-white hover:text-white/80 transition-colors flex-shrink-0">
              <HomeIcon />
            </a>
            {items.map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-white text-xs sm:text-sm font-bold whitespace-nowrap hover:text-white/80 transition-colors tracking-wide uppercase"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
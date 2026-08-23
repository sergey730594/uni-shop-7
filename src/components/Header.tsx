import React, { useState, useRef, useEffect } from 'react';
import logoImage from '../assets/Logo-grant.png';

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
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ChevronDownIcon = ({ className = '' }) => (
  <svg className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCakesOpen, setIsCakesOpen] = useState(false);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const getPlaceholder = () => {
    const placeholders = {
      ka: 'მოძებნეთ ტორტები...',
      en: 'Search cakes...',
      ru: 'Поиск тортов...',
      tr: 'Pastaları ara...',
    };
    return placeholders[language as keyof typeof placeholders] || placeholders.en;
  };

  const getLocale = () => {
    const locales = {
      ka: 'ka-GE',
      en: 'en-US',
      ru: 'ru-RU',
      tr: 'tr-TR',
    };
    return locales[language as keyof typeof locales] || 'ka-GE';
  };

  const getAddress = () => {
    const addresses = {
      ka: 'თბილისი, ნოდარ დუმბაძის გამზ. №4',
      en: 'Tbilisi, Nodar Dumbadze Ave. №4',
      ru: 'г. Тбилиси, просп. Нодара Думбадзе №4',
      tr: 'Tiflis, Nodar Dumbadze Cad. №4',
    };
    return addresses[language as keyof typeof addresses] || addresses.ka;
  };

  const getPhoneLabel = () => {
    const labels = {
      ka: 'ტელ.',
      en: 'Tel.',
      ru: 'Тел.',
      tr: 'Tel.',
    };
    return labels[language as keyof typeof labels] || labels.ka;
  };

  const getFormattedDate = () => {
    const months = {
      ka: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      tr: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    };
    
    const monthNames = months[language as keyof typeof months] || months.ka;
    const day = currentTime.getDate();
    const month = monthNames[currentTime.getMonth()];
    const year = currentTime.getFullYear();
    
    return `${day} ${month} ${year}`;
  };

  const getFormattedTime = () => {
    return currentTime.toLocaleTimeString(getLocale(), { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    });
  };

  const cakeCategories = {
    ka: [
      'კორპორატიული', 'საქორწილო', 'საბავშვო ტორტები', 'ფოტო ტორტები',
      'მანქანა ტორტები', 'სპორტული ტორტები', 'გულის ტორტები', 'მარცეპანის ტორტი',
      'ნათლობის ტორტები', 'მრგვალი ტორტები', 'უფროსებისთვის', 'ოთხკუთხა ტორტები', 'საახალწლო ტორტები'
    ],
    en: [
      'Corporate', 'Wedding', 'Kids Cakes', 'Photo Cakes',
      'Car Cakes', 'Sports Cakes', 'Heart Cakes', 'Marzipan Cake',
      'Baptism Cakes', 'Round Cakes', 'For Adults', 'Square Cakes', 'New Year Cakes'
    ],
    ru: [
      'Корпоративные', 'Свадебные', 'Детские торты', 'Фото торты',
      'Торты-машины', 'Спортивные торты', 'Торты-сердца', 'Марципановый торт',
      'Торты на крестины', 'Круглые торты', 'Для взрослых', 'Квадратные торты', 'Новогодние торты'
    ],
    tr: [
      'Kurumsal', 'Düğün', 'Çocuk Pastaları', 'Fotoğraflı Pastalar',
      'Araba Pastaları', 'Spor Pastaları', 'Kalp Pastaları', 'Badem Ezmesi Pastası',
      'Vaftiz Pastaları', 'Yuvarlak Pastalar', 'Yetişkinler İçin', 'Kare Pastalar', 'Yılbaşı Pastaları'
    ],
  };

  // Меню навигации
  const menuItems = {
    ka: [
      { icon: '🏠', name: 'მთავარი', href: '/' },
      { icon: '🍰', name: 'ტორტები', href: '/cakes' },
      { icon: '🧁', name: 'შიგთავსი', href: '/fillings' },
      { icon: '🎂', name: 'აქსესუარები', href: '/accessories' },
      { icon: '🌷', name: 'ყვავილები', href: '/flowers' },
      { icon: '🏷️', name: 'ფასდაკლება', href: '/sale' },
      { icon: '🚚', name: 'გადახდა-მიტანა', href: '/delivery' },
      { icon: '📞', name: 'კონტაქტი', href: '/contact' },
    ],
    en: [
      { icon: '🏠', name: 'Home', href: '/' },
      { icon: '🍰', name: 'Cakes', href: '/cakes' },
      { icon: '🧁', name: 'Fillings', href: '/fillings' },
      { icon: '🎂', name: 'Accessories', href: '/accessories' },
      { icon: '🌷', name: 'Flowers', href: '/flowers' },
      { icon: '🏷️', name: 'Sale', href: '/sale' },
      { icon: '🚚', name: 'Payment-Delivery', href: '/delivery' },
      { icon: '📞', name: 'Contact', href: '/contact' },
    ],
    ru: [
      { icon: '🏠', name: 'Главная', href: '/' },
      { icon: '🍰', name: 'Торты', href: '/cakes' },
      { icon: '🧁', name: 'Начинки', href: '/fillings' },
      { icon: '🎂', name: 'Аксессуары', href: '/accessories' },
      { icon: '🌷', name: 'Цветы', href: '/flowers' },
      { icon: '🏷️', name: 'Скидки', href: '/sale' },
      { icon: '🚚', name: 'Оплата-Доставка', href: '/delivery' },
      { icon: '📞', name: 'Контакты', href: '/contact' },
    ],
    tr: [
      { icon: '🏠', name: 'Ana Sayfa', href: '/' },
      { icon: '🍰', name: 'Pastalar', href: '/cakes' },
      { icon: '🧁', name: 'Dolgular', href: '/fillings' },
      { icon: '🎂', name: 'Aksesuarlar', href: '/accessories' },
      { icon: '🌷', name: 'Çiçekler', href: '/flowers' },
      { icon: '🏷️', name: 'İndirim', href: '/sale' },
      { icon: '🚚', name: 'Ödeme-Teslimat', href: '/delivery' },
      { icon: '📞', name: 'İletişim', href: '/contact' },
    ],
  };

  const items = menuItems[language as keyof typeof menuItems] || menuItems.ka;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* ===== ВЕРХНЯЯ ТОНКАЯ ЛИНИЯ ===== */}
      <div className="bg-[#ffe5e5] border-y border-[#ff0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-6 sm:h-7 text-[10px] sm:text-xs text-black">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>{getFormattedDate()}</span>
              <span className="font-mono">{getFormattedTime()}</span>
            </div>
            
            <div className="hidden md:block text-center whitespace-nowrap">
              {getAddress()}
            </div>
            
            <div className="whitespace-nowrap">
              {getPhoneLabel()}/WhatsApp/Viber:{' '}
              <a href="tel:+995593756700" className="hover:text-[#ff0000] transition-colors font-medium">
                +995 593 756 700
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Верхняя строка: лого, поиск, языки, корзина */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onMenuOpen}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Меню"
            >
              <MenuIcon />
            </button>

            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-md flex-shrink-0">
                <img 
                  src={logoImage} 
                  alt="Grant Bakery" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-lg sm:text-2xl text-gray-800 hidden xs:block">
                Grant Bakery
              </span>
            </a>
          </div>

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
      <div className="hidden lg:block bg-[#ff0000] border-t border-[#cc0000] relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start gap-1 sm:gap-2 md:gap-3 py-2.5 sm:py-3 overflow-visible hide-scrollbar relative z-50">
            {items.map((item, index) => {
              const isCakeItem = item.name === 'ტორტები' || item.name === 'Cakes' || item.name === 'Торты' || item.name === 'Pastalar';
              
              if (isCakeItem) {
                return (
                  <div 
                    key={index} 
                    className="relative"
                    onMouseEnter={() => setIsCakesOpen(true)} 
                    onMouseLeave={() => setIsCakesOpen(false)}
                  >
                    <a
                      href={item.href}
                      className="flex items-center gap-1 text-white text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-white/20 transition-colors tracking-wide px-3 py-1 rounded-full cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    
                    {isCakesOpen && (
                      <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-[9999] min-w-[550px]">
                        <div className="grid grid-cols-3 gap-1">
                          {cakeCategories[language as keyof typeof cakeCategories].map((cat, catIndex) => (
                            <a
                              key={catIndex}
                              href={`/cakes/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-xs font-bold text-gray-700 hover:text-[#ff0000] hover:bg-red-50 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                              {cat}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-1 text-white text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-white/20 transition-colors tracking-wide px-3 py-1 rounded-full"
                >
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
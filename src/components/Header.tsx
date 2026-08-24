import React, { useState, useRef, useEffect } from 'react';
import logoImage from '../assets/Logo-grant.png';
import { Link } from 'react-router-dom';

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

// SVG флаги
const FlagGE = () => (
  <svg className="w-6 h-4 sm:w-7 sm:h-5 rounded-[3px] shadow-sm ring-1 ring-black/10" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#fff"/>
    <rect width="24" height="3.5" y="6.25" fill="#DA291C"/>
    <rect width="3.5" height="16" x="10.25" fill="#DA291C"/>
    <rect width="2.5" height="2.5" x="3" y="2" fill="#DA291C"/>
    <rect width="2.5" height="2.5" x="18.5" y="2" fill="#DA291C"/>
    <rect width="2.5" height="2.5" x="3" y="11.5" fill="#DA291C"/>
    <rect width="2.5" height="2.5" x="18.5" y="11.5" fill="#DA291C"/>
  </svg>
);

const FlagGB = () => (
  <svg className="w-6 h-4 sm:w-7 sm:h-5 rounded-[3px] shadow-sm ring-1 ring-black/10" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#012169"/>
    <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3"/>
    <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.2"/>
    <path d="M12 0 L12 16 M0 8 L24 8" stroke="#fff" strokeWidth="4.5"/>
    <path d="M12 0 L12 16 M0 8 L24 8" stroke="#C8102E" strokeWidth="2.5"/>
  </svg>
);

const FlagRU = () => (
  <svg className="w-6 h-4 sm:w-7 sm:h-5 rounded-[3px] shadow-sm ring-1 ring-black/10" viewBox="0 0 24 16">
    <rect width="24" height="5.33" fill="#fff"/>
    <rect width="24" height="5.33" y="5.33" fill="#0039A6"/>
    <rect width="24" height="5.34" y="10.66" fill="#D52B1E"/>
  </svg>
);

const FlagTR = () => (
  <svg className="w-6 h-4 sm:w-7 sm:h-5 rounded-[3px] shadow-sm ring-1 ring-black/10" viewBox="0 0 24 16">
    <rect width="24" height="16" fill="#E30A17"/>
    <circle cx="7" cy="8" r="3.5" fill="#fff"/>
    <circle cx="8" cy="8" r="2.8" fill="#E30A17"/>
    <polygon points="12.5,4.5 13.2,6.5 15.3,6.6 13.6,7.9 14.2,9.9 12.5,8.7 10.8,9.9 11.4,7.9 9.7,6.6 11.8,6.5" fill="#fff"/>
  </svg>
);

const flagComponents: Record<string, React.ReactNode> = {
  ka: <FlagGE />,
  en: <FlagGB />,
  ru: <FlagRU />,
  tr: <FlagTR />,
};

// SVG иконки меню — единый стиль, белые, контурные
const HomeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
  </svg>
);

const CakeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M5 20v-6a2 2 0 012-2h10a2 2 0 012 2v6M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2M12 8V6m0 0c0-1 1-1.5 1-2.5C13 2 12 1.5 12 1c0 .5-1 1-1 2.5C11 4.5 12 5 12 6z" />
  </svg>
);

const CupcakeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20h12M7 20v-4h10v4M8 16V9h8v7M10 9V6a2 2 0 114 0v3M9 6c0-1 1.5-1.5 3-1.5S15 5 15 6" />
  </svg>
);

const GiftIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
);

const FlowerIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5M12 19v-4M9 12H5M19 12h-4M9.5 9.5L6.5 6.5M17.5 17.5l-3-3M14.5 9.5l3-3M6.5 17.5l3-3" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24H4a1 1 0 00-1 1v5.59a2 2 0 00.59 1.41l9.59 9.59a2 2 0 002.82 0l4.59-4.59a2 2 0 000-2.83z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 8h13v8H1zM14 10h4l4 4v2h-8M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const menuIcons: Record<string, React.ReactNode> = {
  home: <HomeIcon />,
  cakes: <CakeIcon />,
  fillings: <CupcakeIcon />,
  accessories: <GiftIcon />,
  flowers: <FlowerIcon />,
  sale: <TagIcon />,
  delivery: <TruckIcon />,
  contact: <PhoneIcon />,
};

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
      { name: 'კორპორატიული', slug: 'corporate' },
      { name: 'საქორწილო', slug: 'wedding' },
      { name: 'საბავშვო ტორტები', slug: 'kids' },
      { name: 'ფოტო ტორტები', slug: 'photo' },
      { name: 'მანქანა ტორტები', slug: 'car' },
      { name: 'სპორტული ტორტები', slug: 'sports' },
      { name: 'გულის ტორტები', slug: 'heart' },
      { name: 'მარცეპანის ტორტი', slug: 'marzipan' },
      { name: 'ნათლობის ტორტები', slug: 'baptism' },
      { name: 'მრგვალი ტორტები', slug: 'round' },
      { name: 'უფროსებისთვის', slug: 'adults' },
      { name: 'ოთხკუთხა ტორტები', slug: 'square' },
      { name: 'საახალწლო ტორტები', slug: 'new-year' },
    ],
    en: [
      { name: 'Corporate', slug: 'corporate' },
      { name: 'Wedding', slug: 'wedding' },
      { name: 'Kids Cakes', slug: 'kids' },
      { name: 'Photo Cakes', slug: 'photo' },
      { name: 'Car Cakes', slug: 'car' },
      { name: 'Sports Cakes', slug: 'sports' },
      { name: 'Heart Cakes', slug: 'heart' },
      { name: 'Marzipan Cake', slug: 'marzipan' },
      { name: 'Baptism Cakes', slug: 'baptism' },
      { name: 'Round Cakes', slug: 'round' },
      { name: 'For Adults', slug: 'adults' },
      { name: 'Square Cakes', slug: 'square' },
      { name: 'New Year Cakes', slug: 'new-year' },
    ],
    ru: [
      { name: 'Корпоративные', slug: 'corporate' },
      { name: 'Свадебные', slug: 'wedding' },
      { name: 'Детские торты', slug: 'kids' },
      { name: 'Фото торты', slug: 'photo' },
      { name: 'Торты-машины', slug: 'car' },
      { name: 'Спортивные торты', slug: 'sports' },
      { name: 'Торты-сердца', slug: 'heart' },
      { name: 'Марципановый торт', slug: 'marzipan' },
      { name: 'Торты на крестины', slug: 'baptism' },
      { name: 'Круглые торты', slug: 'round' },
      { name: 'Для взрослых', slug: 'adults' },
      { name: 'Квадратные торты', slug: 'square' },
      { name: 'Новогодние торты', slug: 'new-year' },
    ],
    tr: [
      { name: 'Kurumsal', slug: 'corporate' },
      { name: 'Düğün', slug: 'wedding' },
      { name: 'Çocuk Pastaları', slug: 'kids' },
      { name: 'Fotoğraflı Pastalar', slug: 'photo' },
      { name: 'Araba Pastaları', slug: 'car' },
      { name: 'Spor Pastaları', slug: 'sports' },
      { name: 'Kalp Pastaları', slug: 'heart' },
      { name: 'Badem Ezmesi Pastası', slug: 'marzipan' },
      { name: 'Vaftiz Pastaları', slug: 'baptism' },
      { name: 'Yuvarlak Pastalar', slug: 'round' },
      { name: 'Yetişkinler İçin', slug: 'adults' },
      { name: 'Kare Pastalar', slug: 'square' },
      { name: 'Yılbaşı Pastaları', slug: 'new-year' },
    ],
  };

  const menuItems = {
    ka: [
      { icon: 'home', name: 'მთავარი', href: '/' },
      { icon: 'cakes', name: 'ტორტები', href: '/cakes' },
      { icon: 'fillings', name: 'შიგთავსი', href: '/fillings' },
      { icon: 'accessories', name: 'აქსესუარები', href: '/accessories' },
      { icon: 'flowers', name: 'ყვავილები', href: '/flowers' },
      { icon: 'sale', name: 'ფასდაკლება', href: '/sale' },
      { icon: 'delivery', name: 'გადახდა-მიტანა', href: '/delivery' },
      { icon: 'contact', name: 'კონტაქტი', href: '/contact' },
    ],
    en: [
      { icon: 'home', name: 'Home', href: '/' },
      { icon: 'cakes', name: 'Cakes', href: '/cakes' },
      { icon: 'fillings', name: 'Fillings', href: '/fillings' },
      { icon: 'accessories', name: 'Accessories', href: '/accessories' },
      { icon: 'flowers', name: 'Flowers', href: '/flowers' },
      { icon: 'sale', name: 'Sale', href: '/sale' },
      { icon: 'delivery', name: 'Payment-Delivery', href: '/delivery' },
      { icon: 'contact', name: 'Contact', href: '/contact' },
    ],
    ru: [
      { icon: 'home', name: 'Главная', href: '/' },
      { icon: 'cakes', name: 'Торты', href: '/cakes' },
      { icon: 'fillings', name: 'Начинки', href: '/fillings' },
      { icon: 'accessories', name: 'Аксессуары', href: '/accessories' },
      { icon: 'flowers', name: 'Цветы', href: '/flowers' },
      { icon: 'sale', name: 'Скидки', href: '/sale' },
      { icon: 'delivery', name: 'Оплата-Доставка', href: '/delivery' },
      { icon: 'contact', name: 'Контакты', href: '/contact' },
    ],
    tr: [
      { icon: 'home', name: 'Ana Sayfa', href: '/' },
      { icon: 'cakes', name: 'Pastalar', href: '/cakes' },
      { icon: 'fillings', name: 'Dolgular', href: '/fillings' },
      { icon: 'accessories', name: 'Aksesuarlar', href: '/accessories' },
      { icon: 'flowers', name: 'Çiçekler', href: '/flowers' },
      { icon: 'sale', name: 'İndirim', href: '/sale' },
      { icon: 'delivery', name: 'Ödeme-Teslimat', href: '/delivery' },
      { icon: 'contact', name: 'İletişim', href: '/contact' },
    ],
  };

  const items = menuItems[language as keyof typeof menuItems] || menuItems.ka;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* ВЕРХНЯЯ ТОНКАЯ ЛИНИЯ */}
      <div className="bg-[#ffe5e5] border-y border-[#ff0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-6 sm:h-7 text-[10px] sm:text-xs text-black overflow-x-auto hide-scrollbar">
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

      {/* ЛОГО, ПОИСК, ЯЗЫКИ, КОРЗИНА */}
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

            <Link to={`/${language}`} className="flex items-center gap-2">
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
            </Link>
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
            <div className="relative z-[9999]" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {flagComponents[language]}
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {language.toUpperCase()}
                </span>
                <ChevronDownIcon className={isLangOpen ? 'rotate-180' : ''} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-1 sm:mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999] animate-fade-in">
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
                      {flagComponents[lang.code]}
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

      {/* ГОРИЗОНТАЛЬНОЕ МЕНЮ */}
      <div className="hidden lg:block bg-[#ff0000] border-t border-[#cc0000] relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start gap-1 sm:gap-2 md:gap-3 py-2.5 sm:py-3 overflow-visible hide-scrollbar relative z-40">
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
                    <Link
                      to={`/${language}${item.href === '/' ? '' : item.href}`}
                      className="flex items-center gap-1 text-white text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-white/20 transition-colors tracking-wide px-3 py-1 rounded-full cursor-pointer"
                    >
                      <span>{menuIcons[item.icon]}</span>
                      <span>{item.name}</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    
                    {isCakesOpen && (
                      <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-[9999] min-w-[300px] sm:min-w-[450px] lg:min-w-[550px]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                          {(cakeCategories[language as keyof typeof cakeCategories] || cakeCategories.ka).map((cat, catIndex) => (
                            <Link
                              key={catIndex}
                              to={`/${language}/cakes/${cat.slug}`}
                              className="text-xs font-bold text-gray-700 hover:text-[#ff0000] hover:bg-red-50 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              
              return (
                <Link
                  key={index}
                  to={`/${language}${item.href === '/' ? '' : item.href}`}
                  className="flex items-center gap-1 text-white text-xs sm:text-sm font-bold whitespace-nowrap hover:bg-white/20 transition-colors tracking-wide px-3 py-1 rounded-full"
                >
                  <span>{menuIcons[item.icon]}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
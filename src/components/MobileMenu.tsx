import React, { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import logoImage from '../assets/Logo-grant.png';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

// SVG иконки меню — красные контурные
const HomeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
  </svg>
);

const CakeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M5 20v-6a2 2 0 012-2h10a2 2 0 012 2v6M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2M12 8V6m0 0c0-1 1-1.5 1-2.5C13 2 12 1.5 12 1c0 .5-1 1-1 2.5C11 4.5 12 5 12 6z" />
  </svg>
);

const CupcakeIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20h12M7 20v-4h10v4M8 16V9h8v7M10 9V6a2 2 0 114 0v3M9 6c0-1 1.5-1.5 3-1.5S15 5 15 6" />
  </svg>
);

const GiftIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
  </svg>
);

const FlowerIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5M12 19v-4M9 12H5M19 12h-4M9.5 9.5L6.5 6.5M17.5 17.5l-3-3M14.5 9.5l3-3M6.5 17.5l3-3" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.59 13.41L11 3.83A2 2 0 009.59 3.24H4a1 1 0 00-1 1v5.59a2 2 0 00.59 1.41l9.59 9.59a2 2 0 002.82 0l4.59-4.59a2 2 0 000-2.83z" />
    <circle cx="7.5" cy="7.5" r="1.5" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 8h13v8H1zM14 10h4l4 4v2h-8M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, language }) => {
  const [isCakesOpen, setIsCakesOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
      { icon: 'cakes', name: 'ტორტები', href: '/cakes', hasSubmenu: true },
      { icon: 'fillings', name: 'შიგთავსი', href: '/fillings' },
      { icon: 'accessories', name: 'აქსესუარები', href: '/accessories' },
      { icon: 'flowers', name: 'ყვავილები', href: '/flowers' },
      { icon: 'sale', name: 'ფასდაკლება', href: '/sale' },
      { icon: 'delivery', name: 'გადახდა-მიტანა', href: '/delivery' },
      { icon: 'contact', name: 'კონტაქტი', href: '/contact' },
    ],
    en: [
      { icon: 'home', name: 'Home', href: '/' },
      { icon: 'cakes', name: 'Cakes', href: '/cakes', hasSubmenu: true },
      { icon: 'fillings', name: 'Fillings', href: '/fillings' },
      { icon: 'accessories', name: 'Accessories', href: '/accessories' },
      { icon: 'flowers', name: 'Flowers', href: '/flowers' },
      { icon: 'sale', name: 'Sale', href: '/sale' },
      { icon: 'delivery', name: 'Payment-Delivery', href: '/delivery' },
      { icon: 'contact', name: 'Contact', href: '/contact' },
    ],
    ru: [
      { icon: 'home', name: 'Главная', href: '/' },
      { icon: 'cakes', name: 'Торты', href: '/cakes', hasSubmenu: true },
      { icon: 'fillings', name: 'Начинки', href: '/fillings' },
      { icon: 'accessories', name: 'Аксессуары', href: '/accessories' },
      { icon: 'flowers', name: 'Цветы', href: '/flowers' },
      { icon: 'sale', name: 'Скидки', href: '/sale' },
      { icon: 'delivery', name: 'Оплата-Доставка', href: '/delivery' },
      { icon: 'contact', name: 'Контакты', href: '/contact' },
    ],
    tr: [
      { icon: 'home', name: 'Ana Sayfa', href: '/' },
      { icon: 'cakes', name: 'Pastalar', href: '/cakes', hasSubmenu: true },
      { icon: 'fillings', name: 'Dolgular', href: '/fillings' },
      { icon: 'accessories', name: 'Aksesuarlar', href: '/accessories' },
      { icon: 'flowers', name: 'Çiçekler', href: '/flowers' },
      { icon: 'sale', name: 'İndirim', href: '/sale' },
      { icon: 'delivery', name: 'Ödeme-Teslimat', href: '/delivery' },
      { icon: 'contact', name: 'İletişim', href: '/contact' },
    ],
  };

  const items = menuItems[language as keyof typeof menuItems] || menuItems.ka;

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden animate-slide-in-left flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0">
              <img 
                src={logoImage} 
                alt="Grant Bakery" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-gray-800">Grant Bakery</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Закрыть меню"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {items.map((item, index) => {
            if (item.hasSubmenu) {
              return (
                <div key={index}>
                  <button
                    onClick={() => setIsCakesOpen(!isCakesOpen)}
                    className="w-full flex items-center justify-between gap-3 px-6 py-3.5 transition-colors border-b border-gray-50 text-gray-700 hover:bg-red-50 hover:text-[#ff0000]"
                  >
                    <span className="flex items-center gap-3">
                      {menuIcons[item.icon]}
                      <span className="font-medium text-sm">{item.name}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCakesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isCakesOpen && (
                    <div className="bg-gray-50 py-2">
                      {cakeCategories[language as keyof typeof cakeCategories].map((cat, catIndex) => (
                        <Link
                          key={catIndex}
                          to={`/${language}/cakes/${cat.slug}`}
                          className="flex items-center gap-3 px-8 py-2.5 text-xs font-bold text-gray-600 hover:text-[#ff0000] hover:bg-red-50 transition-colors"
                          onClick={onClose}
                        >
                          <svg className="w-3 h-3 text-[#ff0000] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link
                key={index}
                to={`/${language}${item.href === '/' ? '' : item.href}`}
                className="flex items-center gap-3 px-6 py-3.5 transition-colors border-b border-gray-50 text-gray-700 hover:bg-red-50 hover:text-[#ff0000]"
                onClick={onClose}
              >
                {menuIcons[item.icon]}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Grant Bakery
          </p>
        </div>
      </div>
    </>
  );
};
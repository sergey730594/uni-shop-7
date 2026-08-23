import React, { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import logoImage from '../assets/Logo-grant.png';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

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

  const menuItems = {
    ka: [
      { icon: '🏠', name: 'მთავარი', href: '/' },
      { icon: '🍰', name: 'ტორტები', href: '/cakes', hasSubmenu: true },
      { icon: '🧁', name: 'შიგთავსი', href: '/fillings' },
      { icon: '🎂', name: 'აქსესუარები', href: '/accessories' },
      { icon: '🌷', name: 'ყვავილები', href: '/flowers' },
      { icon: '🏷️', name: 'ფასდაკლება', href: '/sale' },
      { icon: '🚚', name: 'გადახდა-მიტანა', href: '/delivery' },
      { icon: '📞', name: 'კონტაქტი', href: '/contact' },
    ],
    en: [
      { icon: '🏠', name: 'Home', href: '/' },
      { icon: '🍰', name: 'Cakes', href: '/cakes', hasSubmenu: true },
      { icon: '🧁', name: 'Fillings', href: '/fillings' },
      { icon: '🎂', name: 'Accessories', href: '/accessories' },
      { icon: '🌷', name: 'Flowers', href: '/flowers' },
      { icon: '🏷️', name: 'Sale', href: '/sale' },
      { icon: '🚚', name: 'Payment-Delivery', href: '/delivery' },
      { icon: '📞', name: 'Contact', href: '/contact' },
    ],
    ru: [
      { icon: '🏠', name: 'Главная', href: '/' },
      { icon: '🍰', name: 'Торты', href: '/cakes', hasSubmenu: true },
      { icon: '🧁', name: 'Начинки', href: '/fillings' },
      { icon: '🎂', name: 'Аксессуары', href: '/accessories' },
      { icon: '🌷', name: 'Цветы', href: '/flowers' },
      { icon: '🏷️', name: 'Скидки', href: '/sale' },
      { icon: '🚚', name: 'Оплата-Доставка', href: '/delivery' },
      { icon: '📞', name: 'Контакты', href: '/contact' },
    ],
    tr: [
      { icon: '🏠', name: 'Ana Sayfa', href: '/' },
      { icon: '🍰', name: 'Pastalar', href: '/cakes', hasSubmenu: true },
      { icon: '🧁', name: 'Dolgular', href: '/fillings' },
      { icon: '🎂', name: 'Aksesuarlar', href: '/accessories' },
      { icon: '🌷', name: 'Çiçekler', href: '/flowers' },
      { icon: '🏷️', name: 'İndirim', href: '/sale' },
      { icon: '🚚', name: 'Ödeme-Teslimat', href: '/delivery' },
      { icon: '📞', name: 'İletişim', href: '/contact' },
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
      
      <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden animate-slide-in flex flex-col">
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
                    className={`w-full flex items-center justify-between gap-3 px-6 py-3.5 transition-colors border-b border-gray-50 text-gray-700 hover:bg-red-50 hover:text-[#ff0000]`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-sm">{item.name}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isCakesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isCakesOpen && (
                    <div className="bg-gray-50 py-2">
                      {cakeCategories[language as keyof typeof cakeCategories].map((cat, catIndex) => (
                        <a
                          key={catIndex}
                          href={`/cakes/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center gap-3 px-8 py-2.5 text-xs font-bold text-gray-600 hover:text-[#ff0000] hover:bg-red-50 transition-colors"
                          onClick={onClose}
                        >
                          🍰 {cat}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3.5 transition-colors border-b border-gray-50 ${
                  item.name === 'ფასდაკლება' || item.name === 'Sale' || item.name === 'Скидки' || item.name === 'İndirim'
                    ? 'bg-red-50 text-[#ff0000] font-bold'
                    : 'text-gray-700 hover:bg-red-50 hover:text-[#ff0000]'
                }`}
                onClick={onClose}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </a>
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
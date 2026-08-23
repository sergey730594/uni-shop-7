import React, { useEffect } from 'react';
import { X, Home } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, language }) => {
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

  const menuItems = {
    ka: [
      { name: '🏠 მთავარი', href: '/' },
      { name: '🍰 ტორტები', href: '/cakes' },
      { name: '🧁 შიგთავსი', href: '/fillings' },
      { name: '🎂 აქსესუარები', href: '/accessories' },
      { name: '🌷 ყვავილები', href: '/flowers' },
      { name: '🚚 გადახდა-მიტანა', href: '/delivery' },
      { name: '📞 კონტაქტი', href: '/contact' },
    ],
    en: [
      { name: '🏠 Home', href: '/' },
      { name: '🍰 Cakes', href: '/cakes' },
      { name: '🧁 Fillings', href: '/fillings' },
      { name: '🎂 Accessories', href: '/accessories' },
      { name: '🌷 Flowers', href: '/flowers' },
      { name: '🚚 Payment-Delivery', href: '/delivery' },
      { name: '📞 Contact', href: '/contact' },
    ],
    ru: [
      { name: '🏠 Главная', href: '/' },
      { name: '🍰 Торты', href: '/cakes' },
      { name: '🧁 Начинки', href: '/fillings' },
      { name: '🎂 Аксессуары', href: '/accessories' },
      { name: '🌷 Цветы', href: '/flowers' },
      { name: '🚚 Оплата-Доставка', href: '/delivery' },
      { name: '📞 Контакты', href: '/contact' },
    ],
    tr: [
      { name: '🏠 Ana Sayfa', href: '/' },
      { name: '🍰 Pastalar', href: '/cakes' },
      { name: '🧁 Dolgular', href: '/fillings' },
      { name: '🎂 Aksesuarlar', href: '/accessories' },
      { name: '🌷 Çiçekler', href: '/flowers' },
      { name: '🚚 Ödeme-Teslimat', href: '/delivery' },
      { name: '📞 İletişim', href: '/contact' },
    ],
  };

  const items = menuItems[language as keyof typeof menuItems] || menuItems.ka;

  if (!isOpen) return null;

  return (
    <>
      {/* Оверлей */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Меню */}
      <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 lg:hidden animate-slide-in flex flex-col">
        {/* Шапка меню */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff0000] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
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

        {/* Список пунктов меню */}
        <nav className="flex-1 overflow-y-auto py-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3.5 text-gray-700 hover:bg-red-50 hover:text-[#ff0000] transition-colors border-b border-gray-50"
              onClick={onClose}
            >
              <span className="text-lg">{item.name.split(' ')[0]}</span>
              <span className="font-medium text-sm">{item.name.split(' ').slice(1).join(' ')}</span>
            </a>
          ))}
        </nav>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            © 2024 Grant Bakery
          </p>
        </div>
      </div>
    </>
  );
};
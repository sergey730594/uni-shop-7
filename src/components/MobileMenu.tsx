import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 lg:hidden animate-slide-in flex flex-col">
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

        <nav className="flex-1 overflow-y-auto py-4">
          {items.map((item, index) => (
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
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <p className="text-xs text-gray-500 text-center">
            © 2024 Grant Bakery
          </p>
        </div>
      </div>
    </>
  );
};
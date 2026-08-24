import React from 'react';
import { Link } from 'react-router-dom';

interface PromoBannerProps {
  language?: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'ფასდაკლება პირველ შეკვეთაზე',
      subtitle: 'შეუკვეთეთ ახლავე და მიიღეთ სასიამოვნო ფასდაკლება',
      button: 'ნახეთ ფასდაკლებები',
      badge: '🔥 სპეციალური შეთავაზება',
    },
    en: {
      title: 'Discount on first order',
      subtitle: 'Order now and get a nice discount',
      button: 'View discounts',
      badge: '🔥 Special Offer',
    },
    ru: {
      title: 'Скидка на первый заказ',
      subtitle: 'Закажите сейчас и получите приятную скидку',
      button: 'Смотреть скидки',
      badge: '🔥 Специальное предложение',
    },
    tr: {
      title: 'İlk siparişte indirim',
      subtitle: 'Şimdi sipariş verin ve güzel bir indirim kazanın',
      button: 'İndirimleri gör',
      badge: '🔥 Özel Teklif',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <section className="bg-gradient-to-r from-[#ff0000] to-[#cc0000] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Левая часть - текст */}
          <div className="text-center sm:text-left">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-medium mb-2 sm:mb-3 text-white">
              {t.badge}
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              {t.subtitle}
            </p>
          </div>

          {/* Правая часть - кнопка */}
          <Link
            to={`/${language}/sale`}
            className="bg-white text-[#ff0000] px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            {t.button}
          </Link>
        </div>
      </div>
    </section>
  );
};
import React from 'react';

interface WhyUsProps {
  language?: string;
}

export const WhyUs: React.FC<WhyUsProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'რატომ ჩვენ?',
      subtitle: 'ჩვენი უპირატესობები',
      items: [
        { icon: '🎂', title: 'ახალი პროდუქტები', description: 'მხოლოდ ნატურალური ინგრედიენტები' },
        { icon: '🚚', title: 'სწრაფი მიტანა', description: 'მიტანა თბილისის მასშტაბით' },
        { icon: '💯', title: 'ხარისხის გარანტია', description: 'უმაღლესი ხარისხის სტანდარტები' },
        { icon: '🎨', title: 'ინდივიდუალური დიზაინი', description: 'თქვენი იდეების რეალიზაცია' },
      ],
    },
    en: {
      title: 'Why Us?',
      subtitle: 'Our advantages',
      items: [
        { icon: '🎂', title: 'Fresh products', description: 'Only natural ingredients' },
        { icon: '🚚', title: 'Fast delivery', description: 'Delivery across Tbilisi' },
        { icon: '💯', title: 'Quality guarantee', description: 'Highest quality standards' },
        { icon: '🎨', title: 'Custom design', description: 'Realization of your ideas' },
      ],
    },
    ru: {
      title: 'Почему мы?',
      subtitle: 'Наши преимущества',
      items: [
        { icon: '🎂', title: 'Свежие продукты', description: 'Только натуральные ингредиенты' },
        { icon: '🚚', title: 'Быстрая доставка', description: 'Доставка по Тбилиси' },
        { icon: '💯', title: 'Гарантия качества', description: 'Высочайшие стандарты качества' },
        { icon: '🎨', title: 'Индивидуальный дизайн', description: 'Реализация ваших идей' },
      ],
    },
    tr: {
      title: 'Neden Biz?',
      subtitle: 'Avantajlarımız',
      items: [
        { icon: '🎂', title: 'Taze ürünler', description: 'Sadece doğal malzemeler' },
        { icon: '🚚', title: 'Hızlı teslimat', description: 'Tiflis genelinde teslimat' },
        { icon: '💯', title: 'Kalite garantisi', description: 'En yüksek kalite standartları' },
        { icon: '🎨', title: 'Özel tasarım', description: 'Fikirlerinizin gerçekleştirilmesi' },
      ],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-5 sm:p-6 text-center hover:bg-red-50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
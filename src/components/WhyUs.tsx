import React from 'react';

interface WhyUsProps {
  language?: string;
}

// SVG иконки — красные контурные
const FreshIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M5 20v-6a2 2 0 012-2h10a2 2 0 012 2v6M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2M12 8V6m0 0c0-1 1-1.5 1-2.5C13 2 12 1.5 12 1c0 .5-1 1-1 2.5C11 4.5 12 5 12 6z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 8h13v8H1zM14 10h4l4 4v2h-8M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const QualityIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DesignIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.207H3.75v-2.75L15.232 5.232z" />
  </svg>
);

const whyIcons = [
  <FreshIcon />,
  <TruckIcon />,
  <QualityIcon />,
  <DesignIcon />,
];

export const WhyUs: React.FC<WhyUsProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'რატომ ჩვენ?',
      subtitle: 'ჩვენი უპირატესობები',
      items: [
        { title: 'ახალი პროდუქტები', description: 'მხოლოდ ნატურალური ინგრედიენტები' },
        { title: 'სწრაფი მიტანა', description: 'მიტანა თბილისის მასშტაბით' },
        { title: 'ხარისხის გარანტია', description: 'უმაღლესი ხარისხის სტანდარტები' },
        { title: 'ინდივიდუალური დიზაინი', description: 'თქვენი იდეების რეალიზაცია' },
      ],
    },
    en: {
      title: 'Why Us?',
      subtitle: 'Our advantages',
      items: [
        { title: 'Fresh products', description: 'Only natural ingredients' },
        { title: 'Fast delivery', description: 'Delivery across Tbilisi' },
        { title: 'Quality guarantee', description: 'Highest quality standards' },
        { title: 'Custom design', description: 'Realization of your ideas' },
      ],
    },
    ru: {
      title: 'Почему мы?',
      subtitle: 'Наши преимущества',
      items: [
        { title: 'Свежие продукты', description: 'Только натуральные ингредиенты' },
        { title: 'Быстрая доставка', description: 'Доставка по Тбилиси' },
        { title: 'Гарантия качества', description: 'Высочайшие стандарты качества' },
        { title: 'Индивидуальный дизайн', description: 'Реализация ваших идей' },
      ],
    },
    tr: {
      title: 'Neden Biz?',
      subtitle: 'Avantajlarımız',
      items: [
        { title: 'Taze ürünler', description: 'Sadece doğal malzemeler' },
        { title: 'Hızlı teslimat', description: 'Tiflis genelinde teslimat' },
        { title: 'Kalite garantisi', description: 'En yüksek kalite standartları' },
        { title: 'Özel tasarım', description: 'Fikirlerinizin gerçekleştirilmesi' },
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
              <div className="flex justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {whyIcons[index]}
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
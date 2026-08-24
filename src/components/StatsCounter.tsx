import React from 'react';

interface StatsCounterProps {
  language?: string;
}

// Белые контурные иконки
const ExperienceIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M5 20v-6a2 2 0 012-2h10a2 2 0 012 2v6M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2M12 8V6m0 0c0-1 1-1.5 1-2.5C13 2 12 1.5 12 1c0 .5-1 1-1 2.5C11 4.5 12 5 12 6z" />
  </svg>
);

const CakesMadeIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v12m-8 0h16M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2M6 20v-4h12v4M5 8V6a2 2 0 012-2h0a2 2 0 012 2v2M15 8V6a2 2 0 012-2h0a2 2 0 012 2v2" />
  </svg>
);

const HappyCustomersIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 10-5.656-5.656 4 4 0 005.656 5.656zm0 0L21 21M9 10h.01M15 10h.01" />
  </svg>
);

const RatingIcon = () => (
  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white/80" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const statIcons = [
  <ExperienceIcon />,
  <CakesMadeIcon />,
  <HappyCustomersIcon />,
  <RatingIcon />,
];

export const StatsCounter: React.FC<StatsCounterProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      stats: [
        { value: '15+', label: 'წლიანი გამოცდილება' },
        { value: '12000+', label: 'მომზადებული ტორტი' },
        { value: '5000+', label: 'კმაყოფილი მომხმარებელი' },
        { value: '4.9', label: 'საშუალო რეიტინგი' },
      ],
    },
    en: {
      stats: [
        { value: '15+', label: 'Years of experience' },
        { value: '12000+', label: 'Cakes made' },
        { value: '5000+', label: 'Happy customers' },
        { value: '4.9', label: 'Average rating' },
      ],
    },
    ru: {
      stats: [
        { value: '15+', label: 'Лет опыта' },
        { value: '12000+', label: 'Приготовленных тортов' },
        { value: '5000+', label: 'Довольных клиентов' },
        { value: '4.9', label: 'Средний рейтинг' },
      ],
    },
    tr: {
      stats: [
        { value: '15+', label: 'Yıllık deneyim' },
        { value: '12000+', label: 'Yapılan pasta' },
        { value: '5000+', label: 'Mutlu müşteri' },
        { value: '4.9', label: 'Ortalama puan' },
      ],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <section className="bg-gradient-to-r from-[#fb7575] to-[#ffe5e5] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-1 sm:mb-2">
                {statIcons[index]}
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
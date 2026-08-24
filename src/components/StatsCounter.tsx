import React from 'react';

interface StatsCounterProps {
  language?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      stats: [
        { value: '15+', label: 'წლიანი გამოცდილება', icon: '🎂' },
        { value: '5000+', label: 'მომზადებული ტორტი', icon: '🍰' },
        { value: '3000+', label: 'კმაყოფილი მომხმარებელი', icon: '😊' },
        { value: '4.9', label: 'საშუალო რეიტინგი', icon: '⭐' },
      ],
    },
    en: {
      stats: [
        { value: '15+', label: 'Years of experience', icon: '🎂' },
        { value: '5000+', label: 'Cakes made', icon: '🍰' },
        { value: '3000+', label: 'Happy customers', icon: '😊' },
        { value: '4.9', label: 'Average rating', icon: '⭐' },
      ],
    },
    ru: {
      stats: [
        { value: '15+', label: 'Лет опыта', icon: '🎂' },
        { value: '5000+', label: 'Приготовленных тортов', icon: '🍰' },
        { value: '3000+', label: 'Довольных клиентов', icon: '😊' },
        { value: '4.9', label: 'Средний рейтинг', icon: '⭐' },
      ],
    },
    tr: {
      stats: [
        { value: '15+', label: 'Yıllık deneyim', icon: '🎂' },
        { value: '5000+', label: 'Yapılan pasta', icon: '🍰' },
        { value: '3000+', label: 'Mutlu müşteri', icon: '😊' },
        { value: '4.9', label: 'Ortalama puan', icon: '⭐' },
      ],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <section className="bg-gradient-to-r from-[#ff0000] to-[#cc0000] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                {stat.icon}
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
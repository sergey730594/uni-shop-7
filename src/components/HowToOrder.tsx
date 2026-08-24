import React from 'react';

interface HowToOrderProps {
  language?: string;
}

export const HowToOrder: React.FC<HowToOrderProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'როგორ შევუკვეთოთ?',
      subtitle: '3 მარტივი ნაბიჯი',
      steps: [
        { number: '1', icon: '🎂', title: 'აირჩიეთ ტორტი', description: 'დაათვალიერეთ კატალოგი და აირჩიეთ თქვენი ტორტი' },
        { number: '2', icon: '📝', title: 'განახორციელეთ შეკვეთა', description: 'დაგვიკავშირდით WhatsApp ან Viber-ით' },
        { number: '3', icon: '🚚', title: 'მიიღეთ მიტანით', description: 'მივიტანთ თქვენს მისამართზე' },
      ],
    },
    en: {
      title: 'How to Order?',
      subtitle: '3 simple steps',
      steps: [
        { number: '1', icon: '🎂', title: 'Choose a cake', description: 'Browse the catalog and choose your cake' },
        { number: '2', icon: '📝', title: 'Place an order', description: 'Contact us via WhatsApp or Viber' },
        { number: '3', icon: '🚚', title: 'Get delivery', description: 'We will deliver to your address' },
      ],
    },
    ru: {
      title: 'Как заказать?',
      subtitle: '3 простых шага',
      steps: [
        { number: '1', icon: '🎂', title: 'Выберите торт', description: 'Просмотрите каталог и выберите свой торт' },
        { number: '2', icon: '📝', title: 'Оформите заказ', description: 'Свяжитесь с нами через WhatsApp или Viber' },
        { number: '3', icon: '🚚', title: 'Получите доставку', description: 'Доставим по вашему адресу' },
      ],
    },
    tr: {
      title: 'Nasıl Sipariş Verilir?',
      subtitle: '3 basit adım',
      steps: [
        { number: '1', icon: '🎂', title: 'Pasta seçin', description: 'Kataloğu inceleyin ve pastanızı seçin' },
        { number: '2', icon: '📝', title: 'Sipariş verin', description: 'WhatsApp veya Viber ile bize ulaşın' },
        { number: '3', icon: '🚚', title: 'Teslim alın', description: 'Adresinize teslim edelim' },
      ],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <section className="bg-[#f5e6e6] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {t.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Карточка */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 h-full">
                {/* Номер шага */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff0000] text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
                  {step.number}
                </div>
                
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 mt-2">
                  {step.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {step.description}
                </p>
              </div>

              {/* Стрелка между шагами */}
              {index < t.steps.length - 1 && (
                <div className="hidden sm:flex absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-10">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-[#ff0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
import React from 'react';

interface HowToOrderProps {
  language?: string;
}

// SVG иконки — красные контурные
const CakeIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M5 20v-6a2 2 0 012-2h10a2 2 0 012 2v6M7 12v-2a2 2 0 012-2h6a2 2 0 012 2v2M12 8V6m0 0c0-1 1-1.5 1-2.5C13 2 12 1.5 12 1c0 .5-1 1-1 2.5C11 4.5 12 5 12 6z" />
  </svg>
);

const OrderIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const DeliverIcon = () => (
  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 8h13v8H1zM14 10h4l4 4v2h-8M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

const stepIcons = [
  <CakeIcon />,
  <OrderIcon />,
  <DeliverIcon />,
];

export const HowToOrder: React.FC<HowToOrderProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'როგორ შევუკვეთოთ?',
      subtitle: '3 მარტივი ნაბიჯი',
      steps: [
        { title: 'აირჩიეთ ტორტი', description: 'დაათვალიერეთ კატალოგი და აირჩიეთ თქვენი ტორტი' },
        { title: 'განახორციელეთ შეკვეთა', description: 'დაგვიკავშირდით WhatsApp ან Viber-ით' },
        { title: 'მიიღეთ მიტანით', description: 'მივიტანთ თქვენს მისამართზე' },
      ],
    },
    en: {
      title: 'How to Order?',
      subtitle: '3 simple steps',
      steps: [
        { title: 'Choose a cake', description: 'Browse the catalog and choose your cake' },
        { title: 'Place an order', description: 'Contact us via WhatsApp or Viber' },
        { title: 'Get delivery', description: 'We will deliver to your address' },
      ],
    },
    ru: {
      title: 'Как заказать?',
      subtitle: '3 простых шага',
      steps: [
        { title: 'Выберите торт', description: 'Просмотрите каталог и выберите свой торт' },
        { title: 'Оформите заказ', description: 'Свяжитесь с нами через WhatsApp или Viber' },
        { title: 'Получите доставку', description: 'Доставим по вашему адресу' },
      ],
    },
    tr: {
      title: 'Nasıl Sipariş Verilir?',
      subtitle: '3 basit adım',
      steps: [
        { title: 'Pasta seçin', description: 'Kataloğu inceleyin ve pastanızı seçin' },
        { title: 'Sipariş verin', description: 'WhatsApp veya Viber ile bize ulaşın' },
        { title: 'Teslim alın', description: 'Adresinize teslim edelim' },
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
              <div className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff0000] text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
                  {index + 1}
                </div>
                
                <div className="flex justify-center mb-3 sm:mb-4 mt-2">
                  {stepIcons[index]}
                </div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {step.description}
                </p>
              </div>

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
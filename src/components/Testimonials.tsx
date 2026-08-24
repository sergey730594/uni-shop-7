import React from 'react';

interface TestimonialsProps {
  language?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'მომხმარებლების შეფასებები',
      subtitle: 'რას ამბობენ ჩვენს შესახებ',
      facebookLink: 'Facebook გვერდიდან',
      reviews: [
        {
          name: 'ნინო კვარაცხელია',
          rating: 5,
          text: 'ძალიან გემრიელი ტორტი იყო! ყველა სტუმარი აღფრთოვანებული დარჩა. აუცილებლად შევუკვეთავ კიდევ!',
          avatar: '👩',
          date: '2 კვირის წინ',
        },
        {
          name: 'გიორგი მაისურაძე',
          rating: 5,
          text: 'შესანიშნავი მომსახურება და ძალიან ლამაზი დიზაინი. მადლობა Grant Bakery-ს!',
          avatar: '👨',
          date: '1 თვის წინ',
        },
        {
          name: 'ანა ბერიძე',
          rating: 5,
          text: 'ტორტი იყო არა მხოლოდ ლამაზი, არამედ ძალიან გემრიელიც. რეკომენდაციას ვუწევ ყველას!',
          avatar: '👩‍🦰',
          date: '1 თვის წინ',
        },
      ],
    },
    en: {
      title: 'Customer Reviews',
      subtitle: 'What they say about us',
      facebookLink: 'From our Facebook page',
      reviews: [
        {
          name: 'Nino Kvaratskhelia',
          rating: 5,
          text: 'Very delicious cake! All guests were delighted. Will definitely order again!',
          avatar: '👩',
          date: '2 weeks ago',
        },
        {
          name: 'Giorgi Maisuradze',
          rating: 5,
          text: 'Excellent service and very beautiful design. Thank you Grant Bakery!',
          avatar: '👨',
          date: '1 month ago',
        },
        {
          name: 'Ana Beridze',
          rating: 5,
          text: 'The cake was not only beautiful but also very tasty. I recommend it to everyone!',
          avatar: '👩‍🦰',
          date: '1 month ago',
        },
      ],
    },
    ru: {
      title: 'Отзывы клиентов',
      subtitle: 'Что говорят о нас',
      facebookLink: 'С нашей страницы Facebook',
      reviews: [
        {
          name: 'Нино Кварацхелия',
          rating: 5,
          text: 'Очень вкусный торт! Все гости были в восторге. Обязательно закажу ещё!',
          avatar: '👩',
          date: '2 недели назад',
        },
        {
          name: 'Георгий Майсурадзе',
          rating: 5,
          text: 'Отличный сервис и очень красивый дизайн. Спасибо Grant Bakery!',
          avatar: '👨',
          date: '1 месяц назад',
        },
        {
          name: 'Анна Беридзе',
          rating: 5,
          text: 'Торт был не только красивым, но и очень вкусным. Рекомендую всем!',
          avatar: '👩‍🦰',
          date: '1 месяц назад',
        },
      ],
    },
    tr: {
      title: 'Müşteri Yorumları',
      subtitle: 'Hakkımızda ne diyorlar',
      facebookLink: 'Facebook sayfamızdan',
      reviews: [
        {
          name: 'Nino Kvaratshelia',
          rating: 5,
          text: 'Çok lezzetli pastaydı! Tüm misafirler memnun kaldı. Kesinlikle tekrar sipariş vereceğim!',
          avatar: '👩',
          date: '2 hafta önce',
        },
        {
          name: 'Giorgi Maisuradze',
          rating: 5,
          text: 'Mükemmel hizmet ve çok güzel tasarım. Teşekkürler Grant Bakery!',
          avatar: '👨',
          date: '1 ay önce',
        },
        {
          name: 'Ana Beridze',
          rating: 5,
          text: 'Pasta sadece güzel değil, aynı zamanda çok lezzetliydi. Herkese tavsiye ederim!',
          avatar: '👩‍🦰',
          date: '1 ay önce',
        },
      ],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            {t.subtitle}
          </p>
          <a
            href="https://www.facebook.com/www.grant.ge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-[#1877F2] hover:text-[#1664d9] transition-colors text-xs sm:text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t.facebookLink} — www.grant.ge
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {t.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Звёзды */}
              <div className="flex gap-1 mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Текст отзыва */}
              <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                "{review.text}"
              </p>

              {/* Автор */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-100 flex items-center justify-center text-xl sm:text-2xl">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xs sm:text-sm">
                    {review.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400">
                    {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
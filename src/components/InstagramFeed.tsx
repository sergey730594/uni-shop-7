import React from 'react';

interface InstagramFeedProps {
  language?: string;
}

export const InstagramFeed: React.FC<InstagramFeedProps> = ({ language = 'ka' }) => {
  const texts = {
    ka: {
      title: 'გამოგვყევით Instagram-ზე',
      subtitle: '@grantis_torti',
      button: 'გამოწერა',
      description: 'იხილეთ მეტი ჩვენი ნამუშევრები Instagram-ზე',
      placeholder: 'ფოტო',
    },
    en: {
      title: 'Follow us on Instagram',
      subtitle: '@grantis_torti',
      button: 'Follow',
      description: 'See more of our work on Instagram',
      placeholder: 'Photo',
    },
    ru: {
      title: 'Подписывайтесь на Instagram',
      subtitle: '@grantis_torti',
      button: 'Подписаться',
      description: 'Смотрите больше наших работ в Instagram',
      placeholder: 'Фото',
    },
    tr: {
      title: 'Instagram\'da takip edin',
      subtitle: '@grantis_torti',
      button: 'Takip Et',
      description: 'Instagram\'da daha fazla çalışmamızı görün',
      placeholder: 'Fotoğraf',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  // Заглушки — замените на реальные фото из Instagram
  const photos = [
    { id: 1, emoji: '🎂', bg: 'bg-red-100' },
    { id: 2, emoji: '🍰', bg: 'bg-pink-100' },
    { id: 3, emoji: '🧁', bg: 'bg-rose-100' },
    { id: 4, emoji: '🎨', bg: 'bg-orange-100' },
    { id: 5, emoji: '🍫', bg: 'bg-amber-100' },
    { id: 6, emoji: '🌸', bg: 'bg-red-50' },
  ];

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t.title}
          </h2>
          <a
            href="https://www.instagram.com/grantis_torti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-lg sm:text-xl font-bold text-[#E4405F] hover:text-[#c13554] transition-colors"
          >
            {t.subtitle}
          </a>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            {t.description}
          </p>
        </div>

        {/* Сетка фото */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {photos.map((photo) => (
            <a
              key={photo.id}
              href="https://www.instagram.com/grantis_torti"
              target="_blank"
              rel="noopener noreferrer"
              className={`${photo.bg} aspect-square rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden`}
            >
              <span className="group-hover:scale-125 transition-transform duration-300">
                {photo.emoji}
              </span>
              {/* Overlay при наведении */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Кнопка подписаться */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/grantis_torti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E4405F] to-[#c13554] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
            </svg>
            {t.button}
          </a>
        </div>
      </div>
    </section>
  );
};
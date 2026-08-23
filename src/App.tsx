import React, { useState, createContext, useContext, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { MobileMenu } from './components/MobileMenu';
import './index.css';

// ==================== КОНТЕКСТ ЯЗЫКА ====================
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'ka';
  });

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ==================== ТОВАРЫ ====================
const products = [
  { id: 1, name: 'Наполеон', price: 3500, category: 'Торты', image: '🎂', rating: 4.9 },
  { id: 2, name: 'Медовик', price: 3200, category: 'Торты', image: '🍯', rating: 4.8 },
  { id: 3, name: 'Прага', price: 3800, category: 'Торты', image: '🍫', rating: 4.7 },
  { id: 4, name: 'Красный бархат', price: 4200, category: 'Торты', image: '❤️', rating: 4.9 },
  { id: 5, name: 'Чизкейк', price: 2800, category: 'Пирожные', image: '🧀', rating: 4.6 },
  { id: 6, name: 'Эклеры', price: 1500, category: 'Пирожные', image: '🥐', rating: 4.5 },
  { id: 7, name: 'Макаруны', price: 2000, category: 'Пирожные', image: '🍬', rating: 4.7 },
  { id: 8, name: 'Корзиночки', price: 1800, category: 'Пирожные', image: '🧺', rating: 4.4 },
];

// ==================== ФОНОВЫЕ ИЗОБРАЖЕНИЯ ДЛЯ HERO ====================
const heroBackgrounds = [
  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=400&fit=crop&q=80',
];

// ==================== ГЛАВНАЯ СТРАНИЦА ====================
function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  // Состояние для фона Hero
  const [bgImage, setBgImage] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroBackgrounds.length);
    setBgImage(heroBackgrounds[randomIndex]);
    
    const classes = ['float-bg-1', 'float-bg-2', 'float-bg-3', 'float-bg-4', 'float-bg-5'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    setAnimationClass(randomClass);
  }, []);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // ==================== ТЕКСТЫ ====================
  const texts = {
    ka: {
      badge: 'საკონდიტრო',
      title: 'ტორტის შეკვეთა',
      titleHighlight: 'Grant Bakery"-ში',
      subtitle: 'ონლაინ შეკვეთა, მიტანის სერვისით',
      button: 'შეკვეთა ახლავე',
      button2: 'გაიგე მეტი',
      popular: '🔥 პოპულარული ტორტები',
      viewAll: 'ყველას ნახვა →',
      cart: 'კალათა',
    },
    en: {
      badge: '🧁 Bakery',
      title: 'Order a Cake',
      titleHighlight: 'at Grant Bakery',
      subtitle: 'Online ordering with delivery service',
      button: 'Order Now',
      button2: 'Learn More',
      popular: '🔥 Popular Cakes',
      viewAll: 'View All →',
      cart: 'Cart',
    },
    ru: {
      badge: '🧁 Кондитерская',
      title: 'Заказ торта',
      titleHighlight: 'в Grant Bakery',
      subtitle: 'Онлайн-заказ с доставкой',
      button: 'Заказать сейчас',
      button2: 'Узнать больше',
      popular: '🔥 Популярные торты',
      viewAll: 'Смотреть все →',
      cart: 'Корзина',
    },
    tr: {
      badge: '🧁 Pastane',
      title: 'Pasta Siparişi',
      titleHighlight: 'Grant Bakery\'de',
      subtitle: 'Teslimat hizmeti ile çevrimiçi sipariş',
      button: 'Şimdi Sipariş Ver',
      button2: 'Daha Fazla',
      popular: '🔥 Popüler Pastalar',
      viewAll: 'Hepsini Gör →',
      cart: 'Sepet',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  // ==================== RENDER ====================
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuOpen={() => setIsMenuOpen(true)}
        cartCount={cartCount}
      />

      {/* Мобильное меню */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
      />

      <main className="flex-1">
        {/* ГЕРОЙ СЕКЦИЯ */}
        <section className="relative bg-[#f5e6e6] text-gray-800 overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-[260px]">
          <div
            className={`absolute inset-0 opacity-25 ${animationClass}`}
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="absolute inset-0 bg-[#f5e6e6]/40" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-[#ff0000]/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-0.5 text-[10px] sm:text-xs font-medium mb-2 sm:mb-3 text-[#990000]">
                {t.badge}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed sm:leading-relaxed md:leading-relaxed mb-2 sm:mb-3 text-gray-800">
                {t.title} <br className="sm:hidden" />
                <span className="text-[#cc0000]">{t.titleHighlight}</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-5 max-w-2xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button className="bg-[#ff0000] text-white px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl font-semibold hover:bg-[#cc0000] transition-all text-xs sm:text-sm shadow-md hover:shadow-lg">
                  {t.button}
                </button>
                <button className="bg-gray-200 text-gray-700 px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl font-semibold hover:bg-gray-300 transition-all text-xs sm:text-sm">
                  {t.button2}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ТОВАРЫ */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{t.popular}</h2>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block mt-1">
                {products.length} {language === 'ka' ? 'ტორტი' : 
                                  language === 'en' ? 'cakes' : 
                                  language === 'ru' ? 'тортов' : 
                                  'pasta'} 
              </p>
            </div>
            <button className="text-[#ff0000] font-medium hover:text-[#cc0000] transition text-sm sm:text-base">
              {t.viewAll}
            </button>
          </div>

          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
            language={language}
          />
        </section>
      </main>

      <Footer language={language} />
    </div>
  );
}

// ==================== APP ====================
function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}

export default App;
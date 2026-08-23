import React, { useState, createContext, useContext } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
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

// ==================== ГЛАВНАЯ СТРАНИЦА ====================
function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  // ==================== ТЕКСТЫ НА ВСЕХ ЯЗЫКАХ ====================
  const texts = {
    ka: {
      badge: '🧁 საკონდიტრო',
      title: 'ტორტის შეკვეთა',
      titleHighlight: 'Grant Bakery"-ში',
      subtitle: 'ონლაინ შეკვეთა, მიტანის სერვისით',
      button: 'შეკვეთა ახლავე',
      button2: 'გაიგე მეტი',
      popular: '🔥 პოპულარული დესერტები',
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
      popular: '🔥 Popular Desserts',
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
      popular: '🔥 Популярные десерты',
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
      popular: '🔥 Popüler Tatlılar',
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
        onMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
        cartCount={cartCount}
      />

      <main className="flex-1">
        {/* ГЕРОЙ СЕКЦИЯ - КРАСНЫЙ */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                {t.title} <br className="sm:hidden" />
                <span className="text-red-200">{t.titleHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-red-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="bg-white text-red-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-lg hover:bg-red-50 transition-all text-sm sm:text-base">
                  {t.button}
                </button>
                <button className="bg-red-700/50 backdrop-blur-sm text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-red-700/70 transition-all text-sm sm:text-base">
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
                {products.length} {language === 'ka' ? 'დესერტი' : 
                                  language === 'en' ? 'desserts' : 
                                  language === 'ru' ? 'десертов' : 
                                  'tatlı'} 
              </p>
            </div>
            <button className="text-red-600 font-medium hover:text-red-700 transition text-sm sm:text-base">
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
import React, { useState, createContext, useContext } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import './index.css';

// Контекст языка
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

// Товары
const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 99900, category: 'Electronics', image: '📱', rating: 4.8 },
  { id: 2, name: 'MacBook Pro 14"', price: 199900, category: 'Computers', image: '💻', rating: 4.9 },
  { id: 3, name: 'AirPods Pro 2', price: 24900, category: 'Audio', image: '🎧', rating: 4.7 },
  { id: 4, name: 'iPad Air', price: 69900, category: 'Tablets', image: '📱', rating: 4.6 },
  { id: 5, name: 'Samsung Galaxy S24', price: 89900, category: 'Electronics', image: '📱', rating: 4.8 },
  { id: 6, name: 'Dyson V15', price: 59900, category: 'Home', image: '🧹', rating: 4.5 },
  { id: 7, name: 'Sony WH-1000XM5', price: 34900, category: 'Audio', image: '🎧', rating: 4.9 },
  { id: 8, name: 'Apple Watch Ultra', price: 79900, category: 'Wearables', image: '⌚', rating: 4.7 },
  { id: 9, name: 'DJI Mini 4 Pro', price: 99900, category: 'Drones', image: '🚁', rating: 4.8 },
  { id: 10, name: 'Kindle Paperwhite', price: 14900, category: 'Books', image: '📚', rating: 4.6 },
  { id: 11, name: 'Xiaomi Robot Vacuum', price: 39900, category: 'Home', image: '🤖', rating: 4.4 },
  { id: 12, name: 'GoPro Hero 12', price: 44900, category: 'Cameras', image: '📷', rating: 4.7 },
];

function HomePage() {
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const texts = {
    ka: {
      badge: '🔥 ახალი კოლექცია 2024',
      title: 'კეთილი იყოს თქვენი მობრძანება',
      titleHighlight: 'Grant.ge-ში',
      subtitle: 'თანამედროვე ტექნოლოგიები, ხარისხიანი მასალები და საუკეთესო ფასები',
      button: 'იყიდე ახლავე',
      button2: 'გაიგე მეტი',
      popular: '🔥 პოპულარული პროდუქტები',
      viewAll: 'ყველას ნახვა →',
      cart: 'კალათა',
    },
    en: {
      badge: '🔥 New Collection 2024',
      title: 'Welcome to',
      titleHighlight: 'Grant.ge',
      subtitle: 'Modern technology, quality materials, and the best prices',
      button: 'Shop Now',
      button2: 'Learn More',
      popular: '🔥 Popular Products',
      viewAll: 'View All →',
      cart: 'Cart',
    },
    ru: {
      badge: '🔥 Новая коллекция 2024',
      title: 'Добро пожаловать в',
      titleHighlight: 'Grant.ge',
      subtitle: 'Современные технологии, качественные материалы и лучшие цены',
      button: 'Купить сейчас',
      button2: 'Узнать больше',
      popular: '🔥 Популярные товары',
      viewAll: 'Смотреть все →',
      cart: 'Корзина',
    },
    tr: {
      badge: '🔥 Yeni Koleksiyon 2024',
      title: 'Hoş Geldiniz',
      titleHighlight: 'Grant.ge',
      subtitle: 'Modern teknoloji, kaliteli malzemeler ve en iyi fiyatlar',
      button: 'Şimdi Alışveriş Yap',
      button2: 'Daha Fazla',
      popular: '🔥 Popüler Ürünler',
      viewAll: 'Hepsini Gör →',
      cart: 'Sepet',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuOpen={() => setIsMenuOpen(!isMenuOpen)}
        cartCount={cartCount}
      />

      <main>
        {/* Герой секция */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                {t.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                {t.title} <br className="sm:hidden" />
                <span className="text-blue-200">{t.titleHighlight}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-lg hover:bg-blue-50 transition-all text-sm sm:text-base">
                  {t.button}
                </button>
                <button className="bg-blue-700/50 backdrop-blur-sm text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-blue-700/70 transition-all text-sm sm:text-base">
                  {t.button2}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Товары */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{t.popular}</h2>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block mt-1">
                {products.length} {language === 'ka' ? 'პროდუქტი' : 
                                  language === 'en' ? 'products' : 
                                  language === 'ru' ? 'товаров' : 
                                  'ürün'} 
              </p>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-700 transition text-sm sm:text-base">
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

      {/* Подвал */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">G</span>
              </div>
              <span className="font-bold text-gray-800 text-sm sm:text-base">Grant.ge</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2024 Grant.ge. {language === 'ka' ? 'ყველა უფლება დაცულია' : 
                               language === 'en' ? 'All rights reserved' :
                               language === 'ru' ? 'Все права защищены' :
                               'Tüm hakları saklıdır'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}

export default App;
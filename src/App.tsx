import React, { useState, createContext, useContext } from 'react';
import { Header } from './components/Header';
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
  { id: 2, name: 'MacBook Pro', price: 199900, category: 'Computers', image: '💻', rating: 4.9 },
  { id: 3, name: 'AirPods Pro', price: 24900, category: 'Audio', image: '🎧', rating: 4.7 },
  { id: 4, name: 'iPad Air', price: 69900, category: 'Tablets', image: '📱', rating: 4.6 },
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
                {t.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                {t.title} <br className="sm:hidden" />
                <span className="text-blue-200">{t.titleHighlight}</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:bg-blue-50 transition-all">
                  {t.button}
                </button>
                <button className="bg-blue-700/50 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700/70 transition-all">
                  {t.button2}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Товары */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{t.popular}</h2>
            </div>
            <button className="text-blue-600 font-medium hover:text-blue-700 transition">
              {t.viewAll}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                      {product.category}
                    </span>
                    <span className="text-xs text-yellow-500">★ {product.rating}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mt-1 text-sm">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-lg text-gray-900">
                      {product.price.toLocaleString()} ₽
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all hover:scale-105"
                    >
                      <span className="text-sm">🛒</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Подвал */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-gray-800">Grant.ge</span>
            </div>
            <p className="text-gray-500 text-sm">
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
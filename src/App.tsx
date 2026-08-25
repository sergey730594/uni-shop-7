import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { MobileMenu } from './components/MobileMenu';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { WhyUs } from './components/WhyUs';
import { HowToOrder } from './components/HowToOrder';
import { PromoBanner } from './components/PromoBanner';
import { Testimonials } from './components/Testimonials';
import { StatsCounter } from './components/StatsCounter';
import { InstagramFeed } from './components/InstagramFeed';
import { ProductModal } from './components/ProductModal';
import { CartModal } from './components/CartModal';
import { CartProvider, useCart } from './CartContext';
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
  {
    id: 1,
    name: 'Наполеон',
    photos: [
      'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=600&fit=crop&q=80',
    ],
    price20: 80, price30: 100, price40: 120,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Классический торт Наполеон с нежным кремом',
  },
  {
    id: 2,
    name: 'Медовик',
    photos: [
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&q=80',
    ],
    price20: 70, price30: 90, price40: 110,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Медовый торт с сметанным кремом',
  },
  {
    id: 3,
    name: 'Прага',
    photos: [
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=600&fit=crop&q=80',
    ],
    price20: 90, price30: 110, price40: 130,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Шоколадный торт Прага',
  },
  {
    id: 4,
    name: 'Красный бархат',
    photos: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&h=600&fit=crop&q=80',
    ],
    price20: 150, price30: 180, price40: 210,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Красный бархат с кремом чиз',
  },
  {
    id: 5,
    name: 'Чизкейк',
    photos: [
      'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=600&fit=crop&q=80',
    ],
    price20: 60, price30: 80, price40: 100,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Нежный чизкейк',
  },
  {
    id: 6,
    name: 'Эклеры',
    photos: [
      'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&h=600&fit=crop&q=80',
    ],
    price20: 40, price30: 50, price40: 60,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Французские эклеры',
  },
  {
    id: 7,
    name: 'Макаруны',
    photos: [
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&h=600&fit=crop&q=80',
    ],
    price20: 50, price30: 65, price40: 80,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Нежные макаруны',
  },
  {
    id: 8,
    name: 'Корзиночки',
    photos: [
      'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=600&fit=crop&q=80',
    ],
    price20: 45, price30: 55, price40: 70,
    fillings: ['Шоколадная', 'Ванильная', 'Клубничная', 'Карамельная', 'Ореховая', 'Фруктовая'],
    category: 'cakes', description: 'Корзиночки с кремом',
  },
];

// ==================== ФОНОВЫЕ ИЗОБРАЖЕНИЯ ====================
const heroBackgrounds = [
  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&h=400&fit=crop&q=80',
];

// ==================== SCROLL TO TOP ====================
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// ==================== ГЛАВНАЯ СТРАНИЦА ====================
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { language, setLanguage } = useLanguage();
  const { items } = useCart();
  const navigate = useNavigate();
  const { lang } = useParams();

  const [bgImage, setBgImage] = useState('');
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (lang && lang !== language) setLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroBackgrounds.length);
    setBgImage(heroBackgrounds[randomIndex]);
    const classes = ['float-bg-1', 'float-bg-2', 'float-bg-3', 'float-bg-4', 'float-bg-5'];
    setAnimationClass(classes[Math.floor(Math.random() * classes.length)]);
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    navigate(`/${newLang}`, { replace: true });
  };

  const texts = {
    ka: { badge: 'საკონდიტრო', title: 'ტორტის შეკვეთა', titleHighlight: 'Grant Bakery"-ში', subtitle: 'ონლაინ შეკვეთა, მიტანის სერვისით', button: 'შეკვეთა ახლავე', button2: 'გაიგე მეტი', popular: 'პოპულარული ტორტები', viewAll: 'ყველას ნახვა →' },
    en: { badge: '🧁 Bakery', title: 'Order a Cake', titleHighlight: 'at Grant Bakery', subtitle: 'Online ordering with delivery service', button: 'Order Now', button2: 'Learn More', popular: 'Popular Cakes', viewAll: 'View All →' },
    ru: { badge: '🧁 Кондитерская', title: 'Заказ торта', titleHighlight: 'в Grant Bakery', subtitle: 'Онлайн-заказ с доставкой', button: 'Заказать сейчас', button2: 'Узнать больше', popular: 'Популярные торты', viewAll: 'Смотреть все →' },
    tr: { badge: '🧁 Pastane', title: 'Pasta Siparişi', titleHighlight: 'Grant Bakery\'de', subtitle: 'Teslimat hizmeti ile çevrimiçi sipariş', button: 'Şimdi Sipariş Ver', button2: 'Daha Fazla', popular: 'Popüler Pastalar', viewAll: 'Hepsini Gör →' },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} cartCount={items.length} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} language={language} />

      <main className="flex-1">
        <section className="relative bg-[#f5e6e6] text-gray-800 overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-[260px]">
          <div className={`absolute inset-0 opacity-15 ${animationClass}`} style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-[#f5e6e6]/40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-[#ff0000]/10 rounded-full px-3 sm:px-4 py-0.5 text-[10px] sm:text-xs font-medium mb-2 sm:mb-3 text-[#990000]">{t.badge}</div>
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-2 sm:mb-3">{t.title}<br className="sm:hidden" /><span className="text-[#cc0000]">{t.titleHighlight}</span></h1>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5">{t.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Link to={`/${language}/cakes`} className="bg-[#ff0000] text-white px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl font-semibold hover:bg-[#cc0000] text-xs sm:text-sm shadow-md">{t.button}</Link>
                <button className="bg-gray-200 text-gray-700 px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl font-semibold hover:bg-gray-300 text-xs sm:text-sm">{t.button2}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              {t.popular}
            </h2>
            <Link to={`/${language}/cakes`} className="text-[#ff0000] font-medium text-sm sm:text-base">{t.viewAll}</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map(product => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer group">
                <div className="aspect-square overflow-hidden">
                  <img src={product.photos[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2 sm:p-3">
                  <h3 className="font-medium text-xs sm:text-sm truncate">{product.name}</h3>
                  <p className="text-[#ff0000] font-bold text-sm sm:text-base mt-1">₾{product.price30}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <WhyUs language={language} />
        <HowToOrder language={language} />
        <PromoBanner language={language} />
        <Testimonials language={language} />
        <StatsCounter language={language} />
        <InstagramFeed language={language} />
      </main>

      <Footer language={language} />
      <WhatsAppButton />
      <ScrollToTopButton />

      {selectedProduct && <ProductModal product={selectedProduct} language={language} onClose={() => setSelectedProduct(null)} />}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} language={language} />
    </div>
  );
}

// ==================== СТРАНИЦА КАТЕГОРИИ ====================
function CategoryPage() {
  const { category, subcategory } = useParams();
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [priceFilter, setPriceFilter] = useState('all');
  const { items } = useCart();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && lang !== language) setLanguage(lang);
  }, [lang]);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    const pathWithoutLang = window.location.pathname.replace(/^\/(ka|en|ru|tr)/, '');
    navigate(`/${newLang}${pathWithoutLang || ''}`);
  };

  const categoryNames: Record<string, Record<string, string>> = {
    cakes: { ka: 'ტორტები', en: 'Cakes', ru: 'Торты', tr: 'Pastalar' },
    fillings: { ka: 'შიგთავსი', en: 'Fillings', ru: 'Начинки', tr: 'Dolgular' },
    accessories: { ka: 'აქსესუარები', en: 'Accessories', ru: 'Аксессуары', tr: 'Aksesuarlar' },
    flowers: { ka: 'ყვავილები', en: 'Flowers', ru: 'Цветы', tr: 'Çiçekler' },
    sale: { ka: 'ფასდაკლება', en: 'Sale', ru: 'Скидки', tr: 'İndirim' },
    delivery: { ka: 'გადახდა-მიტანა', en: 'Payment-Delivery', ru: 'Оплата-Доставка', tr: 'Ödeme-Teslimat' },
    contact: { ka: 'კონტაქტი', en: 'Contact', ru: 'Контакты', tr: 'İletişim' },
  };

  const subcategoryNames: Record<string, Record<string, string>> = {
    corporate: { ka: 'კორპორატიული', en: 'Corporate', ru: 'Корпоративные', tr: 'Kurumsal' },
    wedding: { ka: 'საქორწილო', en: 'Wedding', ru: 'Свадебные', tr: 'Düğün' },
    kids: { ka: 'საბავშვო ტორტები', en: 'Kids Cakes', ru: 'Детские торты', tr: 'Çocuk Pastaları' },
    photo: { ka: 'ფოტო ტორტები', en: 'Photo Cakes', ru: 'Фото торты', tr: 'Fotoğraflı Pastalar' },
    car: { ka: 'მანქანა ტორტები', en: 'Car Cakes', ru: 'Торты-машины', tr: 'Araba Pastaları' },
    sports: { ka: 'სპორტული ტორტები', en: 'Sports Cakes', ru: 'Спортивные торты', tr: 'Spor Pastaları' },
    heart: { ka: 'გულის ტორტები', en: 'Heart Cakes', ru: 'Торты-сердца', tr: 'Kalp Pastaları' },
    marzipan: { ka: 'მარცეპანის ტორტი', en: 'Marzipan Cake', ru: 'Марципановый торт', tr: 'Badem Ezmesi Pastası' },
    baptism: { ka: 'ნათლობის ტორტები', en: 'Baptism Cakes', ru: 'Торты на крестины', tr: 'Vaftiz Pastaları' },
    round: { ka: 'მრგვალი ტორტები', en: 'Round Cakes', ru: 'Круглые торты', tr: 'Yuvarlak Pastalar' },
    adults: { ka: 'უფროსებისთვის', en: 'For Adults', ru: 'Для взрослых', tr: 'Yetişkinler İçin' },
    square: { ka: 'ოთხკუთხა ტორტები', en: 'Square Cakes', ru: 'Квадратные торты', tr: 'Kare Pastalar' },
    'new-year': { ka: 'საახალწლო ტორტები', en: 'New Year Cakes', ru: 'Новогодние торты', tr: 'Yılbaşı Pastaları' },
  };

  let pageTitle = subcategory ? subcategoryNames[subcategory]?.[language] || subcategory : categoryNames[category || '']?.[language] || category || 'Category';

  const filteredProducts = products.filter(p => {
    if (category !== 'cakes' && category !== undefined) return false;
    if (priceFilter === '0-100') return p.price30 <= 100;
    if (priceFilter === '100-200') return p.price30 > 100 && p.price30 <= 200;
    if (priceFilter === '200+') return p.price30 > 200;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} cartCount={items.length} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} language={language} />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{pageTitle}</h1>
          
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
          >
            <option value="all">{language === 'ka' ? 'ყველა ფასი' : language === 'en' ? 'All prices' : language === 'ru' ? 'Все цены' : 'Tüm fiyatlar'}</option>
            <option value="0-100">{language === 'ka' ? '100₾-მდე' : language === 'en' ? 'Up to 100₾' : language === 'ru' ? 'До 100₾' : "100₾'a kadar"}</option>
            <option value="100-200">100₾ - 200₾</option>
            <option value="200+">200₾+</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer group">
              <div className="aspect-square overflow-hidden">
                <img src={product.photos[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="font-medium text-xs sm:text-sm truncate">{product.name}</h3>
                <p className="text-[#ff0000] font-bold text-sm sm:text-base mt-1">₾{product.price30}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer language={language} />
      <WhatsAppButton />
      <ScrollToTopButton />

      {selectedProduct && <ProductModal product={selectedProduct} language={language} onClose={() => setSelectedProduct(null)} />}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} language={language} />
    </div>
  );
}

// ==================== APP ====================
function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <ScrollToTopOnNavigate />
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/:lang" element={<HomePage />} />
  <Route path="/:lang/:category" element={<CategoryPage />} />
  <Route path="/:lang/:category/:subcategory" element={<CategoryPage />} />
</Routes>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
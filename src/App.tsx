import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
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

// ==================== КОНФИГУРАЦИЯ API ====================
const BASEROW_API_URL = '/api/cakes';  // вместо n8n
const response = await fetch(BASEROW_API_URL);

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
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ka');
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

// ==================== ТОВАРЫ (запасные) ====================
const defaultProducts = [
  { id: 1, name: 'Наполеон', photos: ['https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=300&fit=crop'], price20: 80, price30: 100, price40: 120, fillings: ['fruit', 'fruit-mix', 'banana-chocolate', 'black-special', 'bounty-special'], category: 'cakes', description: 'Классический торт Наполеон' },
  { id: 2, name: 'Медовик', photos: ['https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&h=300&fit=crop'], price20: 70, price30: 90, price40: 110, fillings: ['fruit', 'fruit-mix', 'banana-chocolate', 'black-special', 'bounty-special'], category: 'cakes', description: 'Медовый торт' },
];

const heroBackgrounds = [
  'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1600&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1600&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=1600&h=600&fit=crop&q=80',
];

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ==================== ФУНКЦИЯ ЗАГРУЗКИ ТОВАРОВ ====================
const fetchProductsFromAPI = async () => {
  try {
    const response = await fetch(BASEROW_API_URL, {
      headers: { 'X-API-Key': API_KEY },
    });
    const responseData = await response.json();
// n8n может вернуть объект с данными внутри
const data = Array.isArray(responseData) ? responseData : (responseData.data || responseData.results || responseData.rows || []);
const formatted = data.map((item: any) => ({
      id: item.id,
      code: item.Code || '',
      name: item.Name || 'Без названия',
      price20: Number(item.Price20 || 0),
      price30: Number(item.Price30 || 0),
      price40: Number(item.Price40 || 0),
      fillings: item.Fillings || [],
      category: item.Category || 'cakes',
      photos: item.Photo ? item.Photo.map((f: any) => f.url) : [],
      description: item.Description || '',
      popular: item.Popular || false,
      published: item.Published !== false,
    })).filter((p: any) => p.published);
    return formatted;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};

// ==================== ГЛАВНАЯ СТРАНИЦА ====================
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>(defaultProducts);
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
    setAnimationClass(['float-bg-1','float-bg-2','float-bg-3','float-bg-4','float-bg-5'][Math.floor(Math.random() * 5)]);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductsFromAPI();
      if (data.length > 0) setProducts(data);
    };
    loadProducts();
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    navigate(`/${newLang}`);
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
      <Header language={language} onLanguageChange={handleLanguageChange} onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} cartCount={items.length} onProductClick={(p) => setSelectedProduct(p)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} language={language} />

      <main className="flex-1">
        <section className="relative bg-[#f5e6e6] text-gray-800 overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-[260px]">
          <div className={`absolute inset-0 opacity-30 ${animationClass}`} style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-[#f5e6e6]/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block bg-[#ff0000]/10 rounded-full px-3 py-0.5 text-xs font-medium mb-2 text-[#990000]">{t.badge}</div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2">{t.title}<br className="sm:hidden" /><span className="text-[#cc0000]">{t.titleHighlight}</span></h1>
              <p className="text-sm text-gray-600 mb-4">{t.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link to={`/${language}/cakes`} className="bg-[#ff0000] text-white px-5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm">{t.button}</Link>
                <button className="bg-gray-200 text-gray-700 px-5 py-1.5 rounded-xl font-semibold text-xs sm:text-sm">{t.button2}</button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold">
              <svg className="w-5 h-5 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
              {t.popular}
            </h2>
            <Link to={`/${language}/cakes`} className="text-[#ff0000] text-sm">{t.viewAll}</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map(product => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img src={product.photos[0] || 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=300&fit=crop'} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-xs truncate">{product.name}</h3>
                  <p className="text-[#ff0000] font-bold text-sm mt-1">₾{product.price30}</p>
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
  const [products, setProducts] = useState<any[]>(defaultProducts);
  const { items } = useCart();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && lang !== language) setLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductsFromAPI();
      if (data.length > 0) setProducts(data);
    };
    loadProducts();
  }, []);

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
    if (priceFilter === 'all') return true;
    if (priceFilter === '0-100') return p.price30 <= 100;
    if (priceFilter === '100-150') return p.price30 > 100 && p.price30 <= 150;
    if (priceFilter === '150-200') return p.price30 > 150 && p.price30 <= 200;
    if (priceFilter === '200+') return p.price30 > 200;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} cartCount={items.length} onProductClick={(p) => setSelectedProduct(p)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} language={language} />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">{pageTitle}</h1>
          {(category === 'cakes' || category === 'accessories' || category === 'flowers' || category === 'sale') && (
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="px-3 py-1.5 border rounded-lg text-xs bg-white">
              <option value="all">{language === 'ka' ? 'ყველა ფასი' : language === 'en' ? 'All prices' : language === 'ru' ? 'Все цены' : 'Tüm fiyatlar'}</option>
              <option value="0-100">{language === 'ka' ? '100₾-მდე' : 'До 100₾'}</option>
              <option value="100-150">100₾ - 150₾</option>
              <option value="150-200">150₾ - 200₾</option>
              <option value="200+">200₾+</option>
            </select>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <img src={product.photos[0] || 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=300&fit=crop'} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <h3 className="font-medium text-xs truncate">{product.name}</h3>
                <p className="text-[#ff0000] font-bold text-sm mt-1">₾{product.price30}</p>
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
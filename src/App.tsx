import React, { useState, createContext, useContext, useEffect } from 'react';
import { Routes, Route, useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
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

// ==================== SUPABASE ====================
const supabase = createClient(
  'https://jmsafpmxjmcnhejkbbgr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2FmcG14am1jbmhlamtiYmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MjQxNDgsImV4cCI6MjEwMzQwMDE0OH0.iGwAhWr47N_xfpkj4Da2vj5E0hEMTgLuZa-X3KKnKDI'
);

const fetchProductsFromAPI = async () => {
  try {
    const { data, error } = await supabase
      .from('cakes')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Supabase ошибка:', error);
      return [];
    }
    
    return data.map((item: any) => ({
      id: item.id,
      name: {
        ka: item.name_ka || '',
        en: item.name_en || item.name_ka || '',
        ru: item.name_ru || item.name_ka || '',
        tr: item.name_tr || item.name_ka || '',
      },
      description: {
        ka: item.description_ka || '',
        en: item.description_en || item.description_ka || '',
        ru: item.description_ru || item.description_ka || '',
        tr: item.description_tr || item.description_ka || '',
      },
      tags: {
        ka: item.tags_ka || '',
        en: item.tags_en || item.tags_ka || '',
        ru: item.tags_ru || item.tags_ka || '',
        tr: item.tags_tr || item.tags_ka || '',
      },
      code: item.code || '',
      price20: Number(item.price20 || 0),
      price30: Number(item.price30 || 0),
      price40: Number(item.price40 || 0),
      oldPrice: Number(item.old_price || 0),
      fillings: (item.fillings || '').split(',').map((f: string) => f.trim()).filter(Boolean),
      category: item.category || 'cakes',
      subcategory: item.subcategory || '',
      photos: Array.isArray(item.photos) ? item.photos : item.photos ? [item.photos] : [],
      popular: item.popular || false,
      published: item.published !== false,
    }));
  } catch (error) {
    console.error('Ошибка:', error);
    return [];
  }
};

// ==================== КОНТЕКСТ ЯЗЫКА ====================
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
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

// ==================== ГЛАВНАЯ СТРАНИЦА ====================
function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
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
    setBgImage(heroBackgrounds[Math.floor(Math.random() * heroBackgrounds.length)]);
    setAnimationClass(['float-bg-1','float-bg-2','float-bg-3','float-bg-4','float-bg-5'][Math.floor(Math.random() * 5)]);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductsFromAPI();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    navigate(`/${newLang}`);
  };

  const texts = {
    ka: { badge: 'საკონდიტრო', title: 'ტორტის შეკვეთა ', titleHighlight: 'Grant Bakery"-ში', subtitle: 'ონლაინ შეკვეთა, მიტანის სერვისით', button: 'შეკვეთა ახლავე', button2: 'გაიგე მეტი', popular: 'პოპულარული ტორტები', viewAll: 'ყველას ნახვა →' },
    en: { badge: '🧁 Bakery', title: 'Order a Cake ', titleHighlight: 'at Grant Bakery', subtitle: 'Online ordering with delivery service', button: 'Order Now', button2: 'Learn More', popular: 'Popular Cakes', viewAll: 'View All →' },
    ru: { badge: '🧁 Кондитерская', title: 'Заказ торта ', titleHighlight: 'в Grant Bakery', subtitle: 'Онлайн-заказ с доставкой', button: 'Заказать сейчас', button2: 'Узнать больше', popular: 'Популярные торты', viewAll: 'Смотреть все →' },
    tr: { badge: '🧁 Pastane', title: 'Pasta Siparişi ', titleHighlight: 'Grant Bakery\'de', subtitle: 'Teslimat hizmeti ile çevrimiçi sipariş', button: 'Şimdi Sipariş Ver', button2: 'Daha Fazla', popular: 'Popüler Pastalar', viewAll: 'Hepsini Gör →' },
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
            {products.length > 0 ? products.map(product => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer">
                <div className="aspect-square overflow-hidden">
                  <img src={product.photos?.[0] || ''} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-medium text-xs truncate flex-1">{typeof product.name === 'object' ? product.name[language] || product.name.ka : product.name}</h3>
                    {product.code && <span className="text-[10px] font-bold text-[#ff0000] flex-shrink-0">#{product.code}</span>}
                  </div>
                  {product.tags && product.tags[language] && (
                    <div className="flex flex-wrap gap-1 mt-1 justify-end">
                      {product.tags[language].split(',').slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[8px] text-black font-medium hover:text-[#ff0000] cursor-pointer transition-colors">#{tag.trim()}</span>
                      ))}
                    </div>
                  )}
                  {product.oldPrice && product.oldPrice > product.price20 ? (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] text-gray-400 line-through">₾{product.oldPrice}</span>
                      <span className="text-[#ff0000] font-bold text-sm">₾{product.price20}</span>
                    </div>
                  ) : (
                    <p className="text-[#ff0000] font-bold text-sm mt-1">₾{product.price20}</p>
                  )}
                </div>
              </div>
            )) : (
              <p className="text-gray-500 col-span-full text-center py-10">იტვირთება...</p>
            )}
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
  const [products, setProducts] = useState<any[]>([]);
  const { items } = useCart();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    if (lang && lang !== language) setLanguage(lang);
  }, [lang]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProductsFromAPI();
      setProducts(data);
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
    kids: { ka: 'საბავშვო', en: 'Kids', ru: 'Детские', tr: 'Çocuk' },
    photo: { ka: 'ფოტო ტორტები', en: 'Photo Cakes', ru: 'Фото торты', tr: 'Fotoğraflı' },
    car: { ka: 'მანქანა', en: 'Car Cakes', ru: 'Торты-машины', tr: 'Araba' },
    sports: { ka: 'სპორტული', en: 'Sports', ru: 'Спортивные', tr: 'Spor' },
    heart: { ka: 'გული', en: 'Heart', ru: 'Сердца', tr: 'Kalp' },
    marzipan: { ka: 'მარცეპანი', en: 'Marzipan', ru: 'Марципан', tr: 'Badem Ezmesi' },
    baptism: { ka: 'ნათლობა', en: 'Baptism', ru: 'Крестины', tr: 'Vaftiz' },
    round: { ka: 'მრგვალი', en: 'Round', ru: 'Круглые', tr: 'Yuvarlak' },
    adults: { ka: 'უფროსებისთვის', en: 'For Adults', ru: 'Для взрослых', tr: 'Yetişkinler' },
    square: { ka: 'ოთხკუთხა', en: 'Square', ru: 'Квадратные', tr: 'Kare' },
    'new-year': { ka: 'საახალწლო', en: 'New Year', ru: 'Новогодние', tr: 'Yılbaşı' },
  };

  let pageTitle = subcategory 
    ? subcategoryNames[subcategory]?.[language] || subcategory 
    : categoryNames[category || '']?.[language] || category || 'Category';

    const searchParams = new URLSearchParams(window.location.search);
    const tagFilter = searchParams.get('tag');
    
    const filteredProducts = products.filter(p => {
    if (tagFilter && (!p.tags || !p.tags[language] || !p.tags[language].split(',').map(t => t.trim()).includes(tagFilter))) return false;
    if (category === 'sale') return p.oldPrice && p.oldPrice > p.price20;
    if (category && p.category !== category) return false;
    if (subcategory && p.subcategory !== subcategory) return false;
    if (priceFilter === 'all') return true;
    if (priceFilter === '0-100') return p.price20 <= 100;
    if (priceFilter === '100-150') return p.price20 > 100 && p.price20 <= 150;
    if (priceFilter === '150-200') return p.price20 > 150 && p.price20 <= 200;
    if (priceFilter === '200+') return p.price20 > 200;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header language={language} onLanguageChange={handleLanguageChange} onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} cartCount={items.length} onProductClick={(p) => setSelectedProduct(p)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} language={language} />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 w-full">
        {/* КАРУСЕЛЬ ПОДКАТЕГОРИЙ */}
        {category === 'cakes' && !subcategory && (
          <div className="mb-6">
            <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
              {[
                { slug: 'corporate', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/1korporatiuli.png', names: { ka: 'კორპორატიული', en: 'Corporate', ru: 'Корпоративные', tr: 'Kurumsal' } },
                { slug: 'wedding', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/2saqorwilo.png', names: { ka: 'საქორწილო', en: 'Wedding', ru: 'Свадебные', tr: 'Düğün' } },
                { slug: 'kids', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/3sabavshvo.png', names: { ka: 'საბავშვო', en: 'Kids', ru: 'Детские', tr: 'Çocuk' } },
                { slug: 'photo', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/4photo.png', names: { ka: 'ფოტო ტორტები', en: 'Photo Cakes', ru: 'Фото торты', tr: 'Fotoğraflı' } },
                { slug: 'car', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/5manqana.png', names: { ka: 'მანქანა', en: 'Car Cakes', ru: 'Торты-машины', tr: 'Araba' } },
                { slug: 'sports', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/6sport.png', names: { ka: 'სპორტული', en: 'Sports', ru: 'Спортивные', tr: 'Spor' } },
                { slug: 'heart', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/7gulis.png', names: { ka: 'გული', en: 'Heart', ru: 'Сердца', tr: 'Kalp' } },
                { slug: 'marzipan', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/marcepani.png', names: { ka: 'მარცეპანი', en: 'Marzipan', ru: 'Марципан', tr: 'Badem Ezmesi' } },
                { slug: 'baptism', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/natlobis.png', names: { ka: 'ნათლობა', en: 'Baptism', ru: 'Крестины', tr: 'Vaftiz' } },
                { slug: 'round', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/10mrgvali.png', names: { ka: 'მრგვალი', en: 'Round', ru: 'Круглые', tr: 'Yuvarlak' } },
                { slug: 'adults', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/11ufrosebistvis.png', names: { ka: 'უფროსებისთვის', en: 'For Adults', ru: 'Для взрослых', tr: 'Yetişkinler' } },
                { slug: 'square', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/12square.png', names: { ka: 'ოთხკუთხა', en: 'Square', ru: 'Квадратные', tr: 'Kare' } },
                { slug: 'new-year', photo: 'https://jmsafpmxjmcnhejkbbgr.supabase.co/storage/v1/object/public/Subcategories/13saaxalwlo.png', names: { ka: 'საახალწლო', en: 'New Year', ru: 'Новогодние', tr: 'Yılbaşı' } },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/${language}/cakes/${cat.slug}`}
                  className="flex flex-col items-center gap-2 flex-shrink-0 w-24 group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent group-hover:border-[#ff0000] transition-all shadow-sm">
                    <img src={cat.photo} alt={cat.names[language] || cat.names.ka} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-700 text-center leading-tight group-hover:text-[#ff0000]">
                    {cat.names[language] || cat.names.ka}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">{pageTitle}</h1>
          {(category === 'cakes' || category === 'accessories' || category === 'flowers' || category === 'sale') && (
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="px-3 py-1.5 border rounded-lg text-xs bg-white">
              <option value="all">{language === 'ka' ? 'ყველა ფასი' : language === 'en' ? 'All prices' : language === 'ru' ? 'Все цены' : 'Tüm fiyatlar'}</option>
              <option value="0-100">{language === 'ka' ? '100₾-მდე' : language === 'en' ? 'Up to 100₾' : language === 'ru' ? 'До 100₾' : "100₾'a kadar"}</option>
              <option value="100-150">100₾ - 150₾</option>
              <option value="150-200">150₾ - 200₾</option>
              <option value="200+">200₾+</option>
            </select>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg">
            <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <img src={product.photos?.[0] || ''} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <div className="flex items-center justify-between gap-1">
                <h3 className="font-medium text-xs truncate flex-1 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  {typeof product.name === 'object' ? product.name[language] || product.name.ka : product.name}
                </h3>
                {product.code && <span className="text-[10px] font-bold text-[#ff0000] flex-shrink-0">#{product.code}</span>}
              </div>
              {product.tags && product.tags[language] && (
                <div className="flex flex-wrap gap-1 mt-1 justify-end">
                  {product.tags[language].split(',').slice(0, 2).map((tag: string) => (
                    <span 
                      key={tag} 
                      className="text-[8px] text-black font-medium hover:text-[#ff0000] cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/${language}/cakes?tag=${encodeURIComponent(tag.trim())}`;
                      }}
                    >#{tag.trim()}</span>
                  ))}
                </div>
              )}
              {product.oldPrice && product.oldPrice > product.price20 ? (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-gray-400 line-through">₾{product.oldPrice}</span>
                  <span className="text-[#ff0000] font-bold text-sm">₾{product.price20}</span>
                </div>
              ) : (
                <p className="text-[#ff0000] font-bold text-sm mt-1">₾{product.price20}</p>
              )}
            </div>
          </div>
          )) : (
            <p className="text-gray-500 col-span-full text-center py-10">იტვირთება...</p>
          )}
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
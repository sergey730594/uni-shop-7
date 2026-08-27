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
      .eq('published', true);
    
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

  // ==================== SVG ИКОНКИ ====================
  const PhoneIcon = () => (
    <svg className="w-4 h-4 text-[#ff0000] inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg className="w-4 h-4 text-[#ff0000] inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PinIcon = () => (
    <svg className="w-4 h-4 text-[#ff0000] inline" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C7.31 0 3.5 3.81 3.5 8.5c0 6.38 8.5 15.5 8.5 15.5s8.5-9.12 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11.5a3 3 0 110-6 3 3 0 010 6z"/>
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-4 h-4 text-[#ff0000] inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );

  const TruckIcon = () => (
    <svg className="w-4 h-4 text-[#ff0000] inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 8h13v8H1zM14 10h4l4 4v2h-8M5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
  );

  const BankIcon = () => (
    <svg className="w-4 h-4 text-[#ff0000] inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7M5 10v10h14V10M9 20v-6h6v6" />
    </svg>
  );

  // ==================== ТЕКСТОВЫЕ СТРАНИЦЫ (HTML) ====================
  const textPages: Record<string, Record<string, { title: string; content: string[] }>> = {
    fillings: {
      ka: {
        title: 'შიგთავსი',
        content: [
          '<h2 class="text-xl font-bold mb-3">ჩვენი ტორტების შიგთავსები</h2>',
          '<div class="space-y-3">',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">ხილის ტორტი</h3><p class="text-sm text-gray-600">ახალი ხილით, ნაღების კრემით</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">ბანანი შოკოლადით</h3><p class="text-sm text-gray-600">კლასიკური კომბინაცია</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">შავი საფირმო</h3><p class="text-sm text-gray-600">შოკოლადის მოყვარულთათვის</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">საფირმო ბაუნტი</h3><p class="text-sm text-gray-600">ქოქოსის არომატით</p></div>',
          '</div>',
        ],
      },
      en: {
        title: 'Fillings',
        content: [
          '<h2 class="text-xl font-bold mb-3">Our cake fillings</h2>',
          '<div class="space-y-3">',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Fruit Cake</h3><p class="text-sm text-gray-600">With fresh fruits</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Banana with Chocolate</h3><p class="text-sm text-gray-600">Classic combination</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Black Special</h3><p class="text-sm text-gray-600">For chocolate lovers</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Bounty Special</h3><p class="text-sm text-gray-600">Coconut flavor</p></div>',
          '</div>',
        ],
      },
      ru: {
        title: 'Начинки',
        content: [
          '<h2 class="text-xl font-bold mb-3">Начинки для наших тортов</h2>',
          '<div class="space-y-3">',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Фруктовый торт</h3><p class="text-sm text-gray-600">Со свежими фруктами</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Банан с шоколадом</h3><p class="text-sm text-gray-600">Классика</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Чёрный фирменный</h3><p class="text-sm text-gray-600">Для любителей шоколада</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Фирменный Баунти</h3><p class="text-sm text-gray-600">Кокосовый вкус</p></div>',
          '</div>',
        ],
      },
      tr: {
        title: 'Dolgular',
        content: [
          '<h2 class="text-xl font-bold mb-3">Pasta dolgularımız</h2>',
          '<div class="space-y-3">',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Meyveli Pasta</h3><p class="text-sm text-gray-600">Taze meyvelerle</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Çikolatalı Muz</h3><p class="text-sm text-gray-600">Klasik</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Siyah Özel</h3><p class="text-sm text-gray-600">Çikolata severler için</p></div>',
          '<div class="bg-white rounded-xl p-4 shadow-sm"><h3 class="font-bold text-[#ff0000]">Bounty Özel</h3><p class="text-sm text-gray-600">Hindistan cevizi aroması</p></div>',
          '</div>',
        ],
      },
    },
    delivery: {
      ka: {
        title: 'გადახდა-მიტანა',
        content: [
          '<h2 class="text-xl font-bold mb-3">მიტანის პირობები</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm mb-3 space-y-2">',
          '<p class="text-sm flex items-center gap-2">' + TruckIcon().toString() + ' თბილისის მასშტაბით — <strong>10₾</strong></p>',
          '<p class="text-sm">თვითგატანა — <strong>უფასო</strong></p>',
          '<p class="text-sm">9:00-დან 22:00-მდე</p>',
          '</div>',
          '<h2 class="text-xl font-bold mb-3">გადახდა</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm flex items-center gap-2">' + BankIcon().toString() + ' საქართველოს ბანკი</p>',
          '<p class="text-sm">ანგარიში: GE00BG0000000000000000</p>',
          '</div>',
        ],
      },
      en: {
        title: 'Payment & Delivery',
        content: [
          '<h2 class="text-xl font-bold mb-3">Delivery</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm mb-3 space-y-2">',
          '<p class="text-sm">Tbilisi — <strong>10₾</strong></p>',
          '<p class="text-sm">Pickup — <strong>Free</strong></p>',
          '<p class="text-sm">9:00 - 22:00</p>',
          '</div>',
          '<h2 class="text-xl font-bold mb-3">Payment</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm">Bank of Georgia</p>',
          '<p class="text-sm">Account: GE00BG0000000000000000</p>',
          '</div>',
        ],
      },
      ru: {
        title: 'Оплата и доставка',
        content: [
          '<h2 class="text-xl font-bold mb-3">Доставка</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm mb-3 space-y-2">',
          '<p class="text-sm">По Тбилиси — <strong>10₾</strong></p>',
          '<p class="text-sm">Самовывоз — <strong>бесплатно</strong></p>',
          '<p class="text-sm">9:00 - 22:00</p>',
          '</div>',
          '<h2 class="text-xl font-bold mb-3">Оплата</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm">Банк Грузии</p>',
          '<p class="text-sm">Счёт: GE00BG0000000000000000</p>',
          '</div>',
        ],
      },
      tr: {
        title: 'Ödeme & Teslimat',
        content: [
          '<h2 class="text-xl font-bold mb-3">Teslimat</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm mb-3 space-y-2">',
          '<p class="text-sm">Tiflis — <strong>10₾</strong></p>',
          '<p class="text-sm">Teslim alma — <strong>ücretsiz</strong></p>',
          '<p class="text-sm">9:00 - 22:00</p>',
          '</div>',
          '<h2 class="text-xl font-bold mb-3">Ödeme</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm">Georgia Bank</p>',
          '<p class="text-sm">Hesap: GE00BG0000000000000000</p>',
          '</div>',
        ],
      },
    },
    contact: {
      ka: {
        title: 'კონტაქტი',
        content: [
          '<h2 class="text-xl font-bold mb-3">დაგვიკავშირდით</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm flex items-center gap-2">' + PhoneIcon().toString() + ' <strong>ტელეფონი:</strong> +995 593 756 700</p>',
          '<p class="text-sm flex items-center gap-2">' + EmailIcon().toString() + ' <strong>Email:</strong> info@grant.ge</p>',
          '<p class="text-sm flex items-center gap-2">' + PinIcon().toString() + ' <strong>მისამართი:</strong> თბილისი, ნოდარ დუმბაძის გამზ. №4</p>',
          '<p class="text-sm flex items-center gap-2">' + ClockIcon().toString() + ' <strong>სამუშაო საათები:</strong> 9:00 - 22:00</p>',
          '</div>',
        ],
      },
      en: {
        title: 'Contact',
        content: [
          '<h2 class="text-xl font-bold mb-3">Contact us</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm"><strong>Phone:</strong> +995 593 756 700</p>',
          '<p class="text-sm"><strong>Email:</strong> info@grant.ge</p>',
          '<p class="text-sm"><strong>Address:</strong> Tbilisi, Nodar Dumbadze Ave. №4</p>',
          '<p class="text-sm"><strong>Hours:</strong> 9:00 - 22:00</p>',
          '</div>',
        ],
      },
      ru: {
        title: 'Контакты',
        content: [
          '<h2 class="text-xl font-bold mb-3">Свяжитесь с нами</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm"><strong>Телефон:</strong> +995 593 756 700</p>',
          '<p class="text-sm"><strong>Email:</strong> info@grant.ge</p>',
          '<p class="text-sm"><strong>Адрес:</strong> Тбилиси, просп. Нодара Думбадзе №4</p>',
          '<p class="text-sm"><strong>Часы работы:</strong> 9:00 - 22:00</p>',
          '</div>',
        ],
      },
      tr: {
        title: 'İletişim',
        content: [
          '<h2 class="text-xl font-bold mb-3">Bize ulaşın</h2>',
          '<div class="bg-white rounded-xl p-4 shadow-sm space-y-2">',
          '<p class="text-sm"><strong>Telefon:</strong> +995 593 756 700</p>',
          '<p class="text-sm"><strong>Email:</strong> info@grant.ge</p>',
          '<p class="text-sm"><strong>Adres:</strong> Tiflis, Nodar Dumbadze Cad. №4</p>',
          '<p class="text-sm"><strong>Saatler:</strong> 9:00 - 22:00</p>',
          '</div>',
        ],
      },
    },
  };

  const isTextPage = ['fillings', 'delivery', 'contact'].includes(category || '');
  const textPage = isTextPage ? textPages[category || '']?.[language] : null;

  if (textPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header language={language} onLanguageChange={handleLanguageChange} onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} cartCount={items.length} />
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} language={language} />
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
          <h1 className="text-2xl font-bold mb-6">{textPage.title}</h1>
          {textPage.content.map((html, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </main>
        <Footer language={language} />
        <WhatsAppButton />
        <ScrollToTopButton />
      </div>
    );
  }

  // ==================== КАТАЛОГ ====================
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

  let pageTitle = subcategory 
    ? subcategoryNames[subcategory]?.[language] || subcategory 
    : categoryNames[category || '']?.[language] || category || 'Category';

    const filteredProducts = products.filter(p => {
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
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">{pageTitle}</h1>
          {(category === 'cakes' || category === 'accessories' || category === 'flowers' || category === 'sale') && (
            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="px-3 py-1.5 border rounded-lg text-xs bg-white">
              <option value="all">ყველა ფასი</option>
              <option value="0-100">100₾-მდე</option>
              <option value="100-150">100₾ - 150₾</option>
              <option value="150-200">150₾ - 200₾</option>
              <option value="200+">200₾+</option>
            </select>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer">
              <div className="aspect-square overflow-hidden">
                <img src={product.photos?.[0] || ''} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-medium text-xs truncate flex-1">{typeof product.name === 'object' ? product.name[language] || product.name.ka : product.name}</h3>
                  {product.code && <span className="text-[10px] font-bold text-[#ff0000] flex-shrink-0">#{product.code}</span>}
                </div>
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
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../App';

// Supabase клиент (дублируем или импортируем из общего места)
const supabase = createClient(
  'https://jmsafpmxjmcnhejkbbgr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2FmcG14am1jbmhlamtiYmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MjQxNDgsImV4cCI6MjEwMzQwMDE0OH0.iGwAhWr47N_xfpkj4Da2vj5E0hEMTgLuZa-X3KKnKDI'
);

const ADMIN_PASSWORD = 'grant2026bakery'; // Замените на свой пароль

export const AdminPage: React.FC = () => {
  const { language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('admin_logged_in') === 'true');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({
    name_ka: '', name_en: '', name_ru: '', name_tr: '',
    description_ka: '', description_en: '', description_ru: '', description_tr: '',
    tags_ka: '', tags_en: '', tags_ru: '', tags_tr: '',
    code: '', price20: '', price30: '', price40: '', old_price: '',
    fillings: '', category: 'cakes', subcategory: '', photos: '', popular: false, published: true, sort_order: 0
  });
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('admin_logged_in', 'true');
    } else {
      alert('არასწორი პაროლი');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setMessage('');

    try {
      const { data, error } = await supabase.from('cakes').insert([{
        name_ka: form.name_ka,
        name_en: form.name_en,
        name_ru: form.name_ru,
        name_tr: form.name_tr,
        description_ka: form.description_ka,
        description_en: form.description_en,
        description_ru: form.description_ru,
        description_tr: form.description_tr,
        tags_ka: form.tags_ka,
        tags_en: form.tags_en,
        tags_ru: form.tags_ru,
        tags_tr: form.tags_tr,
        code: Number(form.code) || null,
        price20: Number(form.price20) || 0,
        price30: Number(form.price30) || 0,
        price40: Number(form.price40) || 0,
        old_price: Number(form.old_price) || null,
        fillings: form.fillings,
        category: form.category,
        subcategory: form.subcategory,
        photos: form.photos.split(',').map(s => s.trim()).filter(Boolean),
        popular: form.popular,
        published: form.published,
        sort_order: Number(form.sort_order) || 0
      }]);

      if (error) throw error;

      setMessage('✅ ტორტი დამატებულია!');
      // Сброс формы
      setForm({
        name_ka: '', name_en: '', name_ru: '', name_tr: '',
        description_ka: '', description_en: '', description_ru: '', description_tr: '',
        tags_ka: '', tags_en: '', tags_ru: '', tags_tr: '',
        code: '', price20: '', price30: '', price40: '', old_price: '',
        fillings: '', category: 'cakes', subcategory: '', photos: '', popular: false, published: true, sort_order: 0
      });
    } catch (err: any) {
      console.error(err);
      setMessage('❌ შეცდომა: ' + err.message);
    } finally {
      setIsSending(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4 text-center">ადმინ პანელი</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="პაროლი"
            className="w-full px-4 py-2 border rounded-lg mb-3"
          />
          <button onClick={handleLogin} className="w-full bg-[#ff0000] text-white py-2 rounded-lg font-bold">
            შესვლა
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header language={language} onMenuOpen={() => {}} onCartOpen={() => {}} cartCount={0} />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ტორტის დამატება</h1>
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-[#ff0000]">გასვლა</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" name="name_ka" value={form.name_ka} onChange={handleChange} placeholder="სახელი ქართულად" className="w-full px-3 py-2 border rounded-lg" required />
            <input type="text" name="name_en" value={form.name_en} onChange={handleChange} placeholder="Name in English" className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="name_ru" value={form.name_ru} onChange={handleChange} placeholder="Название на русском" className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="name_tr" value={form.name_tr} onChange={handleChange} placeholder="Türkçe ad" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <textarea name="description_ka" value={form.description_ka} onChange={handleChange} placeholder="აღწერა ქართულად" rows={2} className="w-full px-3 py-2 border rounded-lg" />
            <textarea name="description_en" value={form.description_en} onChange={handleChange} placeholder="Description in English" rows={2} className="w-full px-3 py-2 border rounded-lg" />
            <textarea name="description_ru" value={form.description_ru} onChange={handleChange} placeholder="Описание на русском" rows={2} className="w-full px-3 py-2 border rounded-lg" />
            <textarea name="description_tr" value={form.description_tr} onChange={handleChange} placeholder="Türkçe açıklama" rows={2} className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" name="tags_ka" value={form.tags_ka} onChange={handleChange} placeholder="თეგები ქართულად (მძიმით)" className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="tags_en" value={form.tags_en} onChange={handleChange} placeholder="Tags in English (comma separated)" className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="tags_ru" value={form.tags_ru} onChange={handleChange} placeholder="Теги на русском (через запятую)" className="w-full px-3 py-2 border rounded-lg" />
            <input type="text" name="tags_tr" value={form.tags_tr} onChange={handleChange} placeholder="Etiketler Türkçe (virgülle)" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <input type="number" name="code" value={form.code} onChange={handleChange} placeholder="კოდი" className="w-full px-3 py-2 border rounded-lg" />
            <input type="number" name="price20" value={form.price20} onChange={handleChange} placeholder="20 კუსკი ₾" className="w-full px-3 py-2 border rounded-lg" required />
            <input type="number" name="price30" value={form.price30} onChange={handleChange} placeholder="30 კუსკი ₾" className="w-full px-3 py-2 border rounded-lg" required />
            <input type="number" name="price40" value={form.price40} onChange={handleChange} placeholder="40 კუსკი ₾" className="w-full px-3 py-2 border rounded-lg" required />
            <input type="number" name="old_price" value={form.old_price} onChange={handleChange} placeholder="ძველი ფასი" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" name="fillings" value={form.fillings} onChange={handleChange} placeholder="შიგთავსები (მძიმით)" className="w-full px-3 py-2 border rounded-lg" />
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg">
              <option value="cakes">cakes</option>
              <option value="accessories">accessories</option>
              <option value="flowers">flowers</option>
            </select>
            <input type="text" name="subcategory" value={form.subcategory} onChange={handleChange} placeholder="ქვეკატეგორია" className="w-full px-3 py-2 border rounded-lg" />
          </div>

          <input type="text" name="photos" value={form.photos} onChange={handleChange} placeholder="ფოტოების URL-ები (მძიმით გამოყოფილი)" className="w-full px-3 py-2 border rounded-lg" />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} />
              <span>პოპულარული</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
              <span>გამოქვეყნებული</span>
            </label>
            <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} placeholder="სორტირება" className="w-24 px-3 py-2 border rounded-lg" />
          </div>

          <button type="submit" disabled={isSending} className="w-full bg-[#ff0000] text-white py-3 rounded-lg font-bold disabled:opacity-50">
            {isSending ? 'იტვირთება...' : 'ტორტის დამატება'}
          </button>
          {message && <p className="text-center font-bold">{message}</p>}
        </form>
      </main>
      <Footer language={language} />
    </div>
  );
};
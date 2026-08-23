import React, { useState } from 'react';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  // Тестовые товары
  const products = [
    { id: 1, name: 'iPhone 15 Pro', price: 99900, category: 'Electronics', image: '📱', rating: 4.8 },
    { id: 2, name: 'MacBook Pro', price: 199900, category: 'Computers', image: '💻', rating: 4.9 },
    { id: 3, name: 'AirPods Pro', price: 24900, category: 'Audio', image: '🎧', rating: 4.7 },
    { id: 4, name: 'iPad Air', price: 69900, category: 'Tablets', image: '📱', rating: 4.6 },
    { id: 5, name: 'Samsung Galaxy S24', price: 89900, category: 'Electronics', image: '📱', rating: 4.8 },
    { id: 6, name: 'Dyson V15', price: 59900, category: 'Home', image: '🧹', rating: 4.5 },
    { id: 7, name: 'Sony WH-1000XM5', price: 34900, category: 'Audio', image: '🎧', rating: 4.9 },
    { id: 8, name: 'Apple Watch Ultra', price: 79900, category: 'Wearables', image: '⌚', rating: 4.7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <span className="font-bold text-2xl text-gray-800 hidden sm:block">UniShop</span>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Поиск */}
              <div className="hidden md:block">
                <input
                  type="text"
                  placeholder="🔍 Поиск товаров..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
                />
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <span className="text-xl">🌐</span>
              </button>
              
              <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                <span className="text-xl">🛒</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Герой секция */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              🔥 Новая коллекция 2024
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Добро пожаловать в <span className="text-blue-200">UniShop</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Современный магазин с лучшими товарами по выгодным ценам
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:bg-blue-50 transition-all">
                Начать покупки
              </button>
              <button className="bg-blue-700/50 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700/70 transition-all">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Товары */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">🔥 Популярные товары</h2>
            <p className="text-gray-500 text-sm mt-1">Лучшие предложения для вас</p>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition flex items-center gap-1">
            Смотреть все →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
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
                  <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all hover:scale-105">
                    <span className="text-sm">🛒</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Подвал */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="font-bold text-gray-800">UniShop</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 UniShop. Все права защищены.
            </p>
            <div className="flex gap-4">
              <span className="text-gray-400 hover:text-gray-600 cursor-pointer">Instagram</span>
              <span className="text-gray-400 hover:text-gray-600 cursor-pointer">Telegram</span>
              <span className="text-gray-400 hover:text-gray-600 cursor-pointer">YouTube</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
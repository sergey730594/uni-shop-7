import React, { useState } from 'react';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="font-bold text-2xl text-gray-800">UniShop</span>
          </div>
          <div className="flex items-center gap-4">
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
      </header>

      {/* Герой */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Добро пожаловать в UniShop
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Современный магазин с лучшими товарами
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition">
            Начать покупки
          </button>
        </div>
      </section>

      {/* Товары */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Популярные товары</h2>
          <button className="text-blue-600 font-medium hover:text-blue-700">
            Смотреть все →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Товар {item}</h3>
                <p className="text-gray-500 text-sm">Категория</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-lg text-gray-900">9 999 ₽</span>
                  <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition">
                    <span className="text-sm">🛒</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Тестовая кнопка */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-gray-200 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
          >
            Нажатий: {count}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
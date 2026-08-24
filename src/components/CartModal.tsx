import React, { useState } from 'react';
import { X, Trash2, Send, Mail, Phone, Truck, Store } from 'lucide-react';
import { useCart } from '../CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, language }) => {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    extraPhone: '',
    date: '',
    time: '',
    address: '',
    comment: '',
  });

  const texts = {
    ka: {
      title: 'კალათა',
      empty: 'კალათა ცარიელია',
      name: 'სახელი და გვარი',
      phone: 'ტელეფონი',
      extraPhone: 'დამატებითი ტელეფონი',
      date: 'რომელ რიცხვში?',
      time: 'რომელ საათზე?',
      pickup: 'თვითგატანა',
      delivery: 'მიტანა (+10₾)',
      address: 'მისამართი',
      comment: 'კომენტარი',
      total: 'სულ',
      sendEmail: 'გაგზავნა ელ.ფოსტაზე',
      sendWhatsApp: 'გაგზავნა WhatsApp-ზე',
      required: 'აუცილებელია ველების შევსება',
      deliveryFee: 'მიტანის საფასური',
      timeSlots: [
        '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
        '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
        '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00',
      ],
    },
    en: {
      title: 'Cart',
      empty: 'Cart is empty',
      name: 'Full name',
      phone: 'Phone',
      extraPhone: 'Additional phone',
      date: 'Delivery date?',
      time: 'Delivery time?',
      pickup: 'Pickup',
      delivery: 'Delivery (+10₾)',
      address: 'Address',
      comment: 'Comment',
      total: 'Total',
      sendEmail: 'Send via Email',
      sendWhatsApp: 'Send via WhatsApp',
      required: 'Please fill required fields',
      deliveryFee: 'Delivery fee',
      timeSlots: [
        '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
        '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
        '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00',
      ],
    },
    ru: {
      title: 'Корзина',
      empty: 'Корзина пуста',
      name: 'Имя и фамилия',
      phone: 'Телефон',
      extraPhone: 'Доп. телефон',
      date: 'Дата доставки?',
      time: 'Время доставки?',
      pickup: 'Самовывоз',
      delivery: 'Доставка (+10₾)',
      address: 'Адрес',
      comment: 'Комментарий',
      total: 'Итого',
      sendEmail: 'Отправить на Email',
      sendWhatsApp: 'Отправить в WhatsApp',
      required: 'Заполните обязательные поля',
      deliveryFee: 'Стоимость доставки',
      timeSlots: [
        '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
        '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
        '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00',
      ],
    },
    tr: {
      title: 'Sepet',
      empty: 'Sepet boş',
      name: 'Ad soyad',
      phone: 'Telefon',
      extraPhone: 'Ek telefon',
      date: 'Teslim tarihi?',
      time: 'Teslim saati?',
      pickup: 'Teslim alma',
      delivery: 'Teslimat (+10₾)',
      address: 'Adres',
      comment: 'Yorum',
      total: 'Toplam',
      sendEmail: 'Email ile gönder',
      sendWhatsApp: 'WhatsApp ile gönder',
      required: 'Zorunlu alanları doldurun',
      deliveryFee: 'Teslimat ücreti',
      timeSlots: [
        '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
        '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
        '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00',
      ],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;
  const deliveryFee = deliveryType === 'delivery' ? 10 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const handleSendEmail = () => {
    if (!form.name || !form.phone) {
      alert(t.required);
      return;
    }
    
    const orderDetails = items.map(item => 
      `${item.name} - ${item.size} - ${item.filling}${item.cakeText ? ' - "' + item.cakeText + '"' : ''} - ₾${item.price} x${item.quantity}`
    ).join('\n');
    
    const mailto = `mailto:info@grant.ge?subject=${encodeURIComponent('Новый заказ - Grant Bakery')}&body=${encodeURIComponent(
      `Имя: ${form.name}\nТелефон: ${form.phone}\nДоп. телефон: ${form.extraPhone}\nДата: ${form.date}\nВремя: ${form.time}\nТип: ${deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'}\n${form.address ? 'Адрес: ' + form.address + '\n' : ''}${form.comment ? 'Комментарий: ' + form.comment + '\n' : ''}\n\nТовары:\n${orderDetails}\n\nИтого: ₾${grandTotal}`
    )}`;
    
    window.location.href = mailto;
  };

  const handleSendWhatsApp = () => {
    if (!form.name || !form.phone) {
      alert(t.required);
      return;
    }
    
    const orderDetails = items.map(item => 
      `${item.name} - ${item.size} - ${item.filling}${item.cakeText ? ' - "' + item.cakeText + '"' : ''} - ₾${item.price} x${item.quantity}`
    ).join('\n');
    
    const message = `Новый заказ - Grant Bakery\n\nИмя: ${form.name}\nТелефон: ${form.phone}\nДоп. телефон: ${form.extraPhone}\nДата: ${form.date}\nВремя: ${form.time}\nТип: ${deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'}\n${form.address ? 'Адрес: ' + form.address + '\n' : ''}${form.comment ? 'Комментарий: ' + form.comment + '\n' : ''}\n\nТовары:\n${orderDetails}\n\nИтого: ₾${grandTotal}`;
    
    window.open(`https://wa.me/995593756700?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Заголовок */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-800">{t.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-6 sm:p-8 text-center">
            <p className="text-gray-500">{t.empty}</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-4">
            {/* Список товаров */}
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                  <img src={item.photo} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.size} • {item.filling}</p>
                    {item.cakeText && (
                      <p className="text-xs text-gray-400 truncate">"{item.cakeText}"</p>
                    )}
                    <p className="text-sm font-bold text-[#ff0000] mt-1">₾{item.price} x{item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.filling)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition-colors self-start"
                    aria-label="Удалить"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>

            {/* Форма заказа */}
            <div className="space-y-3">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={t.phone}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
              />
              <input
                type="tel"
                value={form.extraPhone}
                onChange={(e) => setForm({ ...form, extraPhone: e.target.value })}
                placeholder={t.extraPhone}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
              />
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent bg-white"
              >
                <option value="">{t.time}</option>
                {t.timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>

              {/* Тип доставки */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    deliveryType === 'pickup'
                      ? 'bg-[#ff0000] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  {t.pickup}
                </button>
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    deliveryType === 'delivery'
                      ? 'bg-[#ff0000] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  {t.delivery}
                </button>
              </div>

              {deliveryType === 'delivery' && (
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder={t.address}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent"
                />
              )}

              <textarea
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                rows={2}
                placeholder={t.comment}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0000] focus:border-transparent resize-none"
              />

              {/* Итого */}
              <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{t.total}</span>
                  <span>₾{totalPrice}</span>
                </div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{t.deliveryFee}</span>
                    <span>+₾10</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-gray-800 border-t border-gray-200 pt-2">
                  <span>{t.total}</span>
                  <span className="text-[#ff0000]">₾{grandTotal}</span>
                </div>
              </div>

              {/* Кнопки отправки */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSendEmail}
                  className="flex items-center justify-center gap-2 bg-[#ff0000] hover:bg-[#cc0000] text-white font-bold py-3 rounded-xl transition-all text-xs sm:text-sm shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  {t.sendEmail}
                </button>
                <button
                  onClick={handleSendWhatsApp}
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b85a] text-white font-bold py-3 rounded-xl transition-all text-xs sm:text-sm shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  {t.sendWhatsApp}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
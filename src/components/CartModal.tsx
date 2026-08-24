import React, { useState } from 'react';
import { X, Trash2, Mail, Phone, Truck, Store, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, language }) => {
  const { items, removeFromCart, totalPrice } = useCart();
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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
      title: 'კალათა', empty: 'კალათა ცარიელია',
      name: 'სახელი და გვარი', phone: 'ტელეფონი', extraPhone: 'დამატებითი ტელეფონი',
      date: 'რომელ რიცხვში?', time: 'რომელ საათზე?',
      pickup: 'თვითგატანა', delivery: 'მიტანა (+10₾)', address: 'სრული მისამართი',
      comment: 'ტექსტი ტორტზე / კომენტარი', total: 'სულ',
      sendEmail: 'Email', sendWhatsApp: 'WhatsApp',
      required: 'შეავსეთ აუცილებელი ველები', deliveryFee: 'მიტანა',
      months: ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი','ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'],
      days: ['კვ','ორ','სამ','ოთხ','ხუთ','პარ','შაბ'],
      timeSlots: ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00'],
    },
    en: {
      title: 'Cart', empty: 'Cart is empty',
      name: 'Full name', phone: 'Phone', extraPhone: 'Additional phone',
      date: 'Date?', time: 'Time?',
      pickup: 'Pickup', delivery: 'Delivery (+10₾)', address: 'Full address',
      comment: 'Text on cake / Comment', total: 'Total',
      sendEmail: 'Email', sendWhatsApp: 'WhatsApp',
      required: 'Fill required fields', deliveryFee: 'Delivery',
      months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      days: ['Mo','Tu','We','Th','Fr','Sa','Su'],
      timeSlots: ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00'],
    },
    ru: {
      title: 'Корзина', empty: 'Корзина пуста',
      name: 'Имя и фамилия', phone: 'Телефон', extraPhone: 'Доп. телефон',
      date: 'Дата?', time: 'Время?',
      pickup: 'Самовывоз', delivery: 'Доставка (+10₾)', address: 'Полный адрес',
      comment: 'Текст на торте / Комментарий', total: 'Итого',
      sendEmail: 'Email', sendWhatsApp: 'WhatsApp',
      required: 'Заполните обязательные поля', deliveryFee: 'Доставка',
      months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      days: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
      timeSlots: ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00'],
    },
    tr: {
      title: 'Sepet', empty: 'Sepet boş',
      name: 'Ad soyad', phone: 'Telefon', extraPhone: 'Ek telefon',
      date: 'Tarih?', time: 'Saat?',
      pickup: 'Teslim alma', delivery: 'Teslimat (+10₾)', address: 'Tam adres',
      comment: 'Pasta üzerine yazı / Yorum', total: 'Toplam',
      sendEmail: 'Email', sendWhatsApp: 'WhatsApp',
      required: 'Zorunlu alanları doldurun', deliveryFee: 'Teslimat',
      months: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
      days: ['Pt','Sa','Ça','Pe','Cu','Ct','Pz'],
      timeSlots: ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','18:00-19:00','19:00-20:00','20:00-21:00','21:00-22:00'],
    },
  };

  const t = texts[language as keyof typeof texts] || texts.ka;
  const deliveryFee = deliveryType === 'delivery' ? 10 : 0;
  const grandTotal = totalPrice + deliveryFee;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const calendarDays: (number | null)[] = [];
  const mondayFirst = (firstDay + 6) % 7;
  for (let i = 0; i < mondayFirst; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const handleSelectDate = (day: number) => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setForm({ ...form, date: formatted });
    setShowCalendar(false);
  };

  const handleSendEmail = () => {
    if (!form.name || !form.phone) { alert(t.required); return; }
    const orderDetails = items.map(item => `${item.name} - ${item.size} - ${item.filling}${item.cakeText ? ' - "' + item.cakeText + '"' : ''} - ₾${item.price} x${item.quantity}`).join('\n');
    const mailto = `mailto:info@grant.ge?subject=Новый заказ&body=${encodeURIComponent(`Имя: ${form.name}\nТелефон: ${form.phone}\nДата: ${form.date}\nВремя: ${form.time}\nТип: ${deliveryType}\n${form.address ? 'Адрес: ' + form.address : ''}\n\nТовары:\n${orderDetails}\n\nИтого: ₾${grandTotal}`)}`;
    window.location.href = mailto;
  };

  const handleSendWhatsApp = () => {
    if (!form.name || !form.phone) { alert(t.required); return; }
    const orderDetails = items.map(item => `${item.name} - ${item.size} - ${item.filling}${item.cakeText ? ' - "' + item.cakeText + '"' : ''} - ₾${item.price} x${item.quantity}`).join('\n');
    const message = `Новый заказ - Grant Bakery\n\nИмя: ${form.name}\nТелефон: ${form.phone}\nДата: ${form.date}\nВремя: ${form.time}\nТип: ${deliveryType}\n${form.address ? 'Адрес: ' + form.address : ''}\n\nТовары:\n${orderDetails}\n\nИтого: ₾${grandTotal}`;
    window.open(`https://wa.me/995593756700?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-800">{t.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center text-gray-500">{t.empty}</div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-2 bg-gray-50 rounded-xl p-2">
                  <img src={item.photo} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-500">{item.size} • {item.filling}</p>
                    <p className="text-xs font-bold text-[#ff0000]">₾{item.price} x{item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.size, item.filling)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder={t.name} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
              <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder={t.phone} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
              <input type="tel" value={form.extraPhone} onChange={e => setForm({...form, extraPhone: e.target.value})} placeholder={t.extraPhone} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setShowCalendar(!showCalendar); setShowTimeSlots(false); }}
                  className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl border text-xs font-medium ${form.date ? 'bg-[#ff0000] text-white border-[#ff0000]' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                  <Calendar className="w-3 h-3" />
                  {form.date || t.date}
                </button>
                <button
                  onClick={() => { setShowTimeSlots(!showTimeSlots); setShowCalendar(false); }}
                  className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl border text-xs font-medium ${form.time ? 'bg-[#ff0000] text-white border-[#ff0000]' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                  <Clock className="w-3 h-3" />
                  {form.time || t.time}
                </button>
              </div>

              {showCalendar && (
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-1 hover:bg-gray-200 rounded-lg">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold">{t.months[month]} {year}</span>
                    <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-1 hover:bg-gray-200 rounded-lg">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {t.days.map((d, i) => (
                      <div key={i} className="text-center text-[9px] text-gray-400 font-medium">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => (
                      day ? (
                        <button
                          key={i}
                          onClick={() => handleSelectDate(day)}
                          className={`h-7 rounded-lg text-[10px] font-medium transition-colors ${
                            form.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                              ? 'bg-[#ff0000] text-white'
                              : 'text-gray-600 hover:bg-red-50'
                          }`}
                        >
                          {day}
                        </button>
                      ) : (
                        <div key={i} />
                      )
                    ))}
                  </div>
                </div>
              )}

              {showTimeSlots && (
                <div className="bg-gray-50 rounded-xl p-2 grid grid-cols-2 gap-1">
                  {t.timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => { setForm({...form, time: slot}); setShowTimeSlots(false); }}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-medium ${form.time === slot ? 'bg-[#ff0000] text-white' : 'bg-white text-gray-600 hover:bg-red-50'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setDeliveryType('pickup')} className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-medium ${deliveryType === 'pickup' ? 'bg-[#ff0000] text-white' : 'bg-gray-100'}`}>
                  <Store className="w-3 h-3" />{t.pickup}
                </button>
                <button onClick={() => setDeliveryType('delivery')} className={`flex items-center justify-center gap-1 px-2 py-2 rounded-xl text-xs font-medium ${deliveryType === 'delivery' ? 'bg-[#ff0000] text-white' : 'bg-gray-100'}`}>
                  <Truck className="w-3 h-3" />{t.delivery}
                </button>
              </div>

              {deliveryType === 'delivery' && (
                <input type="text" value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder={t.address} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm" />
              )}

              <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={2} placeholder={t.comment} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm resize-none" />

              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex justify-between text-sm"><span>{t.total}</span><span>₾{totalPrice}</span></div>
                {deliveryType === 'delivery' && (
                  <div className="flex justify-between text-sm"><span>{t.deliveryFee}</span><span>+₾10</span></div>
                )}
                <div className="flex justify-between font-bold text-lg border-t pt-2"><span>{t.total}</span><span className="text-[#ff0000]">₾{grandTotal}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2 pb-4">
                <button onClick={handleSendEmail} className="flex items-center justify-center gap-1 bg-[#ff0000] text-white py-2.5 rounded-xl text-xs font-bold"><Mail className="w-4 h-4" />{t.sendEmail}</button>
                <button onClick={handleSendWhatsApp} className="flex items-center justify-center gap-1 bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-bold"><Phone className="w-4 h-4" />{t.sendWhatsApp}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
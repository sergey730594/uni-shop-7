export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  const SUPABASE_URL = 'https://jmsafpmxjmcnhejkbbgr.supabase.co/rest/v1/';
  const SUPABASE_ANON_KEY = 'sb_publishable_mgekH7e9x4oxHVjrQjtqOw_Pjl7M4jP';

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/cakes?select=*&published=eq.true`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    const data = await response.json();
    
    const formatted = data.map((item) => ({
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
      fillings: (item.fillings || '').split(',').map(f => f.trim()).filter(Boolean),
      category: item.category || 'cakes',
      subcategory: item.subcategory || '',
      photos: item.photos ? [item.photos] : [],
      popular: item.popular || false,
      published: item.published !== false,
    }));

    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Ошибка', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
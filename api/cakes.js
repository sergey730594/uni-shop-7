export const config = {
  runtime: 'nodejs',
};
  
  export default async function handler(req, res) {
    const BASEROW_URL = 'https://sale-bot-database.duckdns.org';
    const BASEROW_TOKEN = '40jIKvApr4EgTXDw0W4B2TwxAAMyrZN4';
    const CAKES_TABLE_ID = 837;
  
    try {
      const response = await fetch(
        `${BASEROW_URL}/api/database/rows/table/${CAKES_TABLE_ID}/?user_field_names=true`,
        {
          headers: { 'Authorization': `Token ${BASEROW_TOKEN}` },
        }
      );
      const data = await response.json();
      
      const formatted = data.results
        .filter((item) => item.Name_ka || item.Name_en || item.Name_ru || item.Name_tr)
        .map((item) => ({
          id: item.id,
          name: {
            ka: item.Name_ka || '',
            en: item.Name_en || item.Name_ka || '',
            ru: item.Name_ru || item.Name_ka || '',
            tr: item.Name_tr || item.Name_ka || '',
          },
          code: item.Code || '',
          price20: Number(item['Price 20'] || 0),
          price30: Number(item['Price 30'] || 0),
          price40: Number(item['Price 40'] || 0),
          oldPrice: Number(item.oldPrice || 0),
          fillings: (item.Fillings || []).map((f) => f.value),
          category: item.Category?.[0]?.value || 'cakes',
          photos: (item.Photo || []).map((p) => p.url),
          description: {
            ka: item.Description_ka || '',
            en: item.Description_en || '',
            ru: item.Description_ru || '',
            tr: item.Description_tr || '',
          },
          popular: item.Popular || false,
          published: item.Published !== false,
        }))
        .filter((item) => item.published);
  
      return new Response(JSON.stringify(formatted), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Ошибка', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
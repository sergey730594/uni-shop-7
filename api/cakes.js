module.exports = async (req, res) => {
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
          ka: item.Name_ka || item.Name_en || '',
          en: item.Name_en || item.Name_ka || '',
          ru: item.Name_ru || item.Name_ka || '',
          tr: item.Name_tr || item.Name_ka || '',
        },
        description: {
          ka: item.Description_ka || '',
          en: item.Description_en || item.Description_ka || '',
          ru: item.Description_ru || item.Description_ka || '',
          tr: item.Description_tr || item.Description_ka || '',
        },
        code: item.Code || '',
        price20: Number(item['Price 20'] || 0),
        price30: Number(item['Price 30'] || 0),
        price40: Number(item['Price 40'] || 0),
        oldPrice: Number(item.oldPrice || 0),
        fillings: (item.Fillings || []).map((f) => f.value),
        category: item.Category?.[0]?.value || 'cakes',
        subcategory: item.SubCategory?.[0]?.value || '',
        photos: (item.Photo || []).map((p) => p.url),
        popular: item.Popular || false,
        published: item.Published !== false,
      }))
      .filter((item) => item.published);

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка', details: error.message });
  }
};
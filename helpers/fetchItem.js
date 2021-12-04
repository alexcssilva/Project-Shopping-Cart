const fetchItem = async (ItemID) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

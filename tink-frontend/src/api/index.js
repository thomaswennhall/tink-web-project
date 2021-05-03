import axios from 'axios'

const BACKEND_URL = 'http://localhost:3000'

const fetchFavouriteMerchant = async (accessToken) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/favourite-merchant`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error(error);
  }
}
const fetchBiggestPurchase = async (accessToken) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/biggest-purchase`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error(error);
  }
}
const fetchMostFrequentMerchant = async (accessToken) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/most-frequent-merchant`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export default {
  fetchFavouriteMerchant,
  fetchBiggestPurchase,
  fetchMostFrequentMerchant
}
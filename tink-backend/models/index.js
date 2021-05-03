const axios = require('axios')
require('dotenv').config()

const { CodeMissing, AccessTokenMissing } = require('../errors')

const url = 'https://api.tink.com/api/v1/oauth/token'
const { CLIENT_ID, CLIENT_SECRET } = process.env
const BASE_URL = 'https://api.tink.com/v2'

const getToken = async (code) => {
  if (!code) { throw new CodeMissing }
  try {
    const body = `code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=authorization_code`
    const response = await axios({
      method: 'post',
      url,
      data: body,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
    const token = await response.data.access_token
    return token
  } catch (error) {
    throw error
  }
}

const getTransactions = async (accessToken) => {
  if (!accessToken) { throw new AccessTokenMissing }
  try {
    const response = await axios.get(`${BASE_URL}/transactions`, {
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const getNextPage = async (accessToken, nextPage) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions?pageSize=100&pageToken=${nextPage}`, {
      headers: {
        'Authorization': `${accessToken}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const getTransactionsFromYear = async (accessToken, year) => {
  const response = await getTransactions(accessToken)

  let { transactions, nextPageToken } = response

  let iterate = true
  while (iterate) {
    let nextPageResponse = await getNextPage(accessToken, nextPageToken)
    transactions.push(...nextPageResponse.transactions)

    nextPageToken = nextPageResponse.nextPageToken

    let latestTransaction = transactions[transactions.length - 1]
    let tooFarBack = latestTransaction.dates.booked.startsWith(year - 1)

    if (tooFarBack || !nextPageToken) {
      iterate = false
    }
  }

  transactions = transactions.filter(obj => obj.dates.booked.startsWith(year))

  return transactions
}

const getfavouriteMerchant = (transactions) => {

  let allMerchantAmounts = []

  transactions.forEach(transaction => {
    const merchant = transaction.descriptions.original
    const amount = +transaction.amount.value.unscaledValue

    const obj = allMerchantAmounts.find(obj => obj.merchant === merchant)
    if (obj) {
      obj.amount += amount
    } else {
      allMerchantAmounts.push({ merchant, amount })
    }
  })

  let favouriteMerchant = allMerchantAmounts[0]

  allMerchantAmounts.forEach(obj => {
    if (obj.amount < favouriteMerchant.amount) {
      favouriteMerchant = obj
    }
  })

  return favouriteMerchant
}

const getFavouriteMerchantFromYear = async (token, year) => {
  const transactions = await getTransactionsFromYear(token, year)
  const favouriteMerchant = getfavouriteMerchant(transactions)
  return favouriteMerchant
}

const findBiggestPurchase = (transactions) => {

  let biggestPurchase = { amount: 0 }

  transactions.forEach(transaction => {
    const amount = +transaction.amount.value.unscaledValue
    const merchant = transaction.descriptions.original

    if (amount < biggestPurchase.amount) {
      biggestPurchase = { amount, merchant }
    }
  })

  return biggestPurchase
}

const findmostFrequentMerchant = (transactions) => {
  let allMerchants = []
  let allIndividualMerchants = []

  transactions.forEach(transaction => {
    const merchant = transaction.descriptions.original
    allMerchants.push(merchant)

    if (!allIndividualMerchants.includes(merchant)) {
      allIndividualMerchants.push(merchant)
    }
  })

  let mostFrequentMerchant = { amount: 0 }

  allIndividualMerchants.forEach(merchant => {
    const occurence = allMerchants.filter(string => string === merchant).length
    if (occurence > mostFrequentMerchant.amount) {
      mostFrequentMerchant = { amount: occurence, merchant }
    }
  })

  return mostFrequentMerchant
}

const getBiggestPurchase = async (token, year) => {
  const transactions = await getTransactionsFromYear(token, year)
  const biggestPurchase = findBiggestPurchase(transactions)
  return biggestPurchase
}

const getMostFrequentMerchant = async (token, year) => {
  const transactions = await getTransactionsFromYear(token, year)
  const mostFrequentMerchant = findmostFrequentMerchant(transactions)
  return mostFrequentMerchant
}

module.exports = {
  getToken,
  getFavouriteMerchantFromYear,
  getBiggestPurchase,
  getMostFrequentMerchant
}
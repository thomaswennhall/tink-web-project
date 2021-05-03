const express = require('express')
require('dotenv').config()

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors({ origin: 'http://localhost:8080' }))

const errorHandler = require('./middleware/errorHandler')

const API = require('./models')

const PORT = process.env.PORT || 3000

app.get('/callback', async (req, res, next) => {
  try {
    const { code } = req.query
    const token = await API.getToken(code)
    res.cookie('token', token)
    res.redirect('http://localhost:8080/2020')
  } catch (error) {
    next(error)
  }
})

app.get('/favourite-merchant', async (req, res, next) => {
  try {
    const year = 2020
    const bearerToken = req.headers.authorization
    const favouriteMerchant = await API.getFavouriteMerchantFromYear(bearerToken, year)
    res.json(favouriteMerchant)
  } catch (error) {
    next(error);
  }
})

app.get('/biggest-purchase', async (req, res, next) => {
  try {
    const year = 2020
    const bearerToken = req.headers.authorization
    const biggestPurchase = await API.getBiggestPurchase(bearerToken, year)
    res.json(biggestPurchase)
  } catch (error) {
    next(error);
  }
})

app.get('/most-frequent-merchant', async (req, res, next) => {
  try {
    const year = 2020
    const bearerToken = req.headers.authorization
    const mostFrequentMerchant = await API.getMostFrequentMerchant(bearerToken, year)
    res.json(mostFrequentMerchant)
  } catch (error) {
    next(error);
  }
})

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })
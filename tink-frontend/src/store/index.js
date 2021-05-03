import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    favouriteMerchant: {},
    biggestPurchase: {},
    mostFrequentMerchant: {}
  },
  getters: {
    getToken: state => state.token,
    getFavouriteMerchant: state => state.favouriteMerchant,
    getBiggestPurchase: state => state.biggestPurchase,
    getMostFrequentMerchant: state => state.mostFrequentMerchant
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    setFavouriteMerchant: (state, favouriteMerchant) => {
      state.favouriteMerchant = favouriteMerchant
    },
    setBiggestPurchase: (state, biggestPurchase) => {
      state.biggestPurchase = biggestPurchase
    },
    setMostFrequentMerchant: (state, mostFrequentMerchant) => {
      state.mostFrequentMerchant = mostFrequentMerchant
    }
  },
  actions: {
    login: ({ commit }, token) => {
      commit('setToken', token)
    },
    updateFavouriteMerchant: async ({ commit, getters }) => {
      const token = getters.getToken
      const favouriteMerchant = await API.fetchFavouriteMerchant(token)
      commit('setFavouriteMerchant', favouriteMerchant)
    },
    updateBiggestPurchase: async ({ commit, getters }) => {
      const token = getters.getToken
      const biggestPurchase = await API.fetchBiggestPurchase(token)
      commit('setBiggestPurchase', biggestPurchase)
    },
    updateMostFrequentMerchant: async ({ commit, getters }) => {
      const token = getters.getToken
      const mostFrequentMerchant = await API.fetchMostFrequentMerchant(token)
      commit('setMostFrequentMerchant', mostFrequentMerchant)
    }
  }
})

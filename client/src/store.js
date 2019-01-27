import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = 'http://localhost:4000'

const state = {
  articles: null,
  tags: null,
  years: null,
  counts: "",
}

//commmit, state
const mutations = {
  setArticles(state, data) {
    state.articles = data
  },
  setTags(state, data) {
    state.tags = data
  },
  setCounts(state, query) {
    state.counts = counts;
 },
}

//dispatch, store
const actions = {
  async doSearch({ commit }, { search, tagged, yeared }) {
    const result = await axios.get(URL + '/search', {
      params: { search, yeared: yeared.join(','), tagged: tagged.join(',') }
    })
    commit('setArticles', result.data)
  },
  async loadTags({ commit }) {
    const result = await axios.get(`${URL}/tags`)
    commit('setTags', result.data)
    console.log(result.data)
  }
}

const getters = {
  years: state => {
    return (state.articles || []).map(a => {
      return new Date(a.dateCreated.split('.').reverse().join('-')).getFullYear()
    })
  },
  counts: state => state.counts
}

export default new Vuex.Store({ state, mutations, actions, getters })
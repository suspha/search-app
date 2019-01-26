import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = 'http://localhost:4000'

const state = {
  articles: null,
  tags: null
}

//commmit, state
const mutations = {
  setArticles(state, data) {
    state.articles = data
  },
  setTags(state, data) {
    state.tags = data
  }
}

//dispatch, store
const actions = {
  async doSearch({ commit }, { search, tagged }) {
    console.log(tagged)
    const result = await axios.get(URL + '/search', {
      params: { search, tagged: tagged.join(',') }
    })
    commit('setArticles', result.data)
  },
  async loadTags({ commit }) {
    const result = await axios.get(`${URL}/tags`)
    commit('setTags', result.data)
    console.log(result.data)
  }
}

// getters map articles leser ut året
const getters = {
  years: state => {
    return (state.articles || []).map(a => {
      return new Date(a.dateCreated.split('.').reverse().join('-')).getFullYear()
    })
  }
}


export default new Vuex.Store({ state, mutations, actions, getters })
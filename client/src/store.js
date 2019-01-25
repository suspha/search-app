import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  result: null
}

//commmit, state
const mutations = {
  setResult(state, data) {
    state.result = data
  }
}

//dispatch, store
const actions = {
  async doSearch(store, search) {
    const result = await axios.get('http://localhost:4000/search', {
      params: { search }
    })
    store.commit('setResult', result.data)
  }
}

export default new Vuex.Store({ state, mutations, actions })
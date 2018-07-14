import Vue from 'vue'
import { state } from './state'
import * as mutations from './mutations'

import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState()]
})

export default store

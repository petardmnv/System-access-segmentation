import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import modelModule from './modules/model/index.js'

export default createStore({
  modules: {
    authModule,
    models: modelModule
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
});

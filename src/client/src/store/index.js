import { createStore } from 'vuex';
import authModule from './modules/auth/index.js';
import modelModule from './modules/model/index.js';
import resultsModule from './modules/result/index.js';

export default createStore({
  modules: {
    authModule,
    models: modelModule,
    results: resultsModule
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

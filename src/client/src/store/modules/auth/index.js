import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      isAuthenticated: false
    };
  },
  getters,
  mutations,
  actions,
};
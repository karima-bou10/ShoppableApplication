// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    dots: [],
    
  },
  mutations: {
    updateDotsArrBuf(state, newDotsArr) {
      state.dots = newDotsArr;
    },
    // Other mutations...
  },
  actions: {
    // Your actions...
  },
  getters: {
    // Your getters...
  }
});

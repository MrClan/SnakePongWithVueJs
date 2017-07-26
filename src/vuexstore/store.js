import Vuex from 'vuex';
import Vue from 'vue';
import Coordinate from '../modules/Coordinate';
import defaults from '../modules/Defaults';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0,
    foodLocation: new Coordinate(
      Math.floor(Math.random() * defaults.gridWidth),
      Math.floor(Math.random() * defaults.gridHeight)
    )
  },
  mutations: {
    newFoodLocation(state) {
      state.foodLocation = new Coordinate(
        Math.floor(Math.random() * defaults.gridWidth),
        Math.floor(Math.random() * defaults.gridHeight)
      );
    }
  }
});


export default store;

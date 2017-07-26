import Vue from 'vue';
import Router from 'vue-router';
import GameScreen from '@/components/GameScreen';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'GameScreen',
    component: GameScreen
  }]
});

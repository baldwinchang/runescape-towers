import Vue from 'vue';
import Router from 'vue-router';
import Solver from '@/components/Solver';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Solver',
      component: Solver,
    },
  ],
});

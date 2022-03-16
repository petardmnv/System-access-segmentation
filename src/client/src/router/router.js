import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// set up routes tha my application needs: home, login, register, data, pipelines, models and their child routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: null
  },
  {
    path: '/register',
    name: 'register',
    component: null
  },
  {
    path: '/data',
    name: 'data',
    component: null
  },  
  {
    path: 'data/:id',
    name: 'data by provided id',
    component: null
  },
  {
    path: '/models',
    name: 'models',
    component: null
  },  
  {
    path: 'models/:id',
    name: 'model',
    component: null
  },
  {
    path: '/pipelines',
    name: 'pipilines',
    component: null
  },
  {
    path: 'pipelines/:id',
    name: 'pipeline',
    component: null,
    //add "children" route in pipelines/:id
    children:[
      {
        path: 'run',
        name: 'run pipeline',
        component: null
      },
      {
        path: 'result',
        name: 'pipeline result',
        component: null
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  linkActiveClass: 'active',
  // to - the going age properties,
  // from - page came from properties
  // savedPosition - saved scroll level of the left page 
  scrollBehavour(to, from, savedPosition){
    // if saved position exists then jump to it in the next page
    if (savedPosition) {
      return savedPosition;
    }
    //else set default position on new page 
     return { left: 0, top: 0 };
  }
});

export default router;

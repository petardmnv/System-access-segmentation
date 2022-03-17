import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LogInView from '../views/LogInView.vue';
import RegisterView from '../views/RegisterView.vue';

// set up routes tha my application needs: home, login, register, data, pipelines, models and their child routes
const routes = [
  // redirect url
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomeView
  },
  {
    path:'/about',
    component: AboutView
  },
  {
    path: '/login',
    component: LogInView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/data',
    component: AboutView
  },
  {
    path: '/models',
    component: AboutView
  }, 
  {
    path: '/pipelines',
    component: AboutView
  }/*, 
  {
    path: 'models/:id',
    props: true,
    component: null
  },
  {
    path: 'data/:id',
    props: true,
    component: null
  },
  {
    path: 'pipelines/:id',
    component: null,
    props: true,
    //add "children" route in pipelines/:id
    children:[
      {
        path: 'run',
        component: null
      },
      {
        path: 'result',
        component: null
      }
    ]
  }*/
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

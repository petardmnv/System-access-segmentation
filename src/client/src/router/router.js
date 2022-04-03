import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFound.vue';
import LogInView from '../views/LogInView.vue';
import RegisterView from '../views/RegisterView.vue';
import PipelineView from '../views/PipelineView.vue';
import ModelsView from '../views/ModelsView.vue';
import ModelView from '../views/ModelView.vue';
import SaveResultView from '../views/SaveResultView.vue';
import ResultsView from '../views/ResultsView.vue';
import ResultView from '../views/ResultView.vue';
import store from '@/store';

// set up routes tha my application needs: home, login, register, data, pipelines, models and their child routes
const routes = [
  // redirect url
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: HomeView
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
    path: '/results',
    component: ResultsView,
    meta: { needAuthentication: true }
  },
  {
    path: '/models',
    component: ModelsView,
    meta: { needAuthentication: true }
  },
  {
    path: '/pipelines',
    component: PipelineView,
    meta: { needAuthentication: true }
  }, 
  {
    path: '/models/:id',
    props: true,
    component: ModelView,
    meta: { needAuthentication: true }
  },
  {
    path: '/pipelines/result',
    component: SaveResultView,
    meta: { needAuthentication: true }
  },
  {
    path: '/results/:id',
    component: ResultView,
    meta: { needAuthentication: true }
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
  // to - the going age properties,
  // from - page came from properties
  // savedPosition - saved scroll level of the left page 
  scrollBehavour(to, from, savedPosition) {
    // if saved position exists then jump to it in the next page
    if (savedPosition) {
      return savedPosition;
    }
    //else set default position on new page 
    return { left: 0, top: 0 };
  }
});


// Deni access to routes who need authentication if user didn't authenticate himself
router.beforeEach(function (to, from, next) {
  if (to.meta.needAuthentication && !store.getters.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

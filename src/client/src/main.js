import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/index.js';

import AuthenticationComponent from './components/AuthenticationComponent.vue';
import ButtonComponent from './components/ButtonComponent.vue';
import ContentComponent from './components/ContentComponent.vue';
import DialogComponent from './components/DialogComponent.vue';
import ModelComponent from './components/ModelComponent.vue';
import NavComponent from './components/NavComponent.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('authentication-component', AuthenticationComponent);
app.component('button-component', ButtonComponent);
app.component('content-component', ContentComponent);
app.component('dialog-component', DialogComponent);
app.component('model-component', ModelComponent);
app.component('nav-component', NavComponent);

app.mount('#app');

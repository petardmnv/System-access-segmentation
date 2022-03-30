import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/index.js';

import AuthenticationComponent from './components/AuthenticationComponent.vue';
import ButtonComponent from './components/ButtonComponent.vue';
import CardComponent from './components/CardComponent.vue';
import DialogComponent from './components/DialogComponent.vue';
import ContentComponent from './components/ContentComponent.vue';
import NavComponent from './components/NavComponent.vue';
import PipelineComponent from './components/PipelineComponent.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('authentication-component', AuthenticationComponent);
app.component('button-component', ButtonComponent);
app.component('card-component', CardComponent);
app.component('dialog-component', DialogComponent);
app.component('content-component', ContentComponent);
app.component('nav-component', NavComponent);
app.component('pipeline-component', PipelineComponent);

app.mount('#app');

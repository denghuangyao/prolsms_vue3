import './assets/main.css';
import './styles/index.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initStores } from '@dhy/stores';
// Try named import if the module exports a named value
import { default as vue3Biobank } from 'vue3-biobank';
import 'vue3-biobank/style';
import directives from './directives';
import SvgIcon from '@dhy/icons';
const app = createApp(App);
const pinia = await initStores();
app.use(vue3Biobank);
app.use(SvgIcon);
app.use(pinia);
app.use(router);
app.use(directives);
app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import components from './components';
import '@dhy/styles';
import './styles/index.scss';
function bootstrap() {
  const app = createApp(App);
  app.use(components);
  app.mount('#app');
}
export { bootstrap };

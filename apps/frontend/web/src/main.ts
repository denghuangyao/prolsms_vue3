import './assets/main.css';
import './styles/index.scss';
async function initApplication() {
  // vue应用主要逻辑及视图
  const { bootstrap } = await import('./bootstrap');
  await bootstrap();
}
initApplication();

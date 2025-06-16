import './assets/main.css'
import './styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
//这是虚拟模块的引入方式，用于给脚手架插件在打包和开发时做相应的处理。
//Vite 和 Rollup 中都约定以 virtual: 作为虚拟模块的前缀：
import 'virtual:svg-icons-register'
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')

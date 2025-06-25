import './assets/main.css'
import './styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initStores } from './stores'
//这是虚拟模块的引入方式，用于给脚手架插件在打包和开发时做相应的处理。
//Vite 和 Rollup 中都约定以 virtual: 作为虚拟模块的前缀：
import 'virtual:svg-icons-register'
import directives from './directives'
const app = createApp(App)
const pinia = await initStores()
app.use(pinia)
app.use(router)
app.use(directives)
app.mount('#app')

import { createApp } from 'vue'
import '@/assets/style/normalize.css'
import ElementPlus from 'element-plus'
import './style.css'
import 'element-plus/dist/index.css'
import router from '@/router'
import pinia from '@/store'
import '@/permission.ts'
import directives from './directives'
import App from './App.vue'

createApp(App).use(ElementPlus).use(router).use(pinia).use(directives).mount('#app')

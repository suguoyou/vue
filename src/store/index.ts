import { createPinia } from "pinia"
import piniaPluginState from 'pinia-plugin-persistedstate'
const store = createPinia().use(piniaPluginState)
// .use(piniaPluginState)
export default store
import { createApp } from 'vue'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import './main.css'

const app = createApp(App)
const queryClient = new QueryClient()

app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')

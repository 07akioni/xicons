import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import App from './App'
import './index.css'

const app = createApp({
  render () {
    return h(RouterView)
  }
})

app.use(createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/zh-CN',
      component: App
    }
  ]
}))

app.mount('#app')
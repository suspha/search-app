import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import filters from './lib/filters.js'


// gjøre filters tilgengelig overalt
for(const f in filters) {
  Vue.filter(f, filters[f])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
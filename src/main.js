import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import Page from './Page.vue'
import Youtube from './Youtube.vue'

import showdown from 'showdown'
import showdownTargetBlank from 'showdown-target-blank'


const converter = new showdown.Converter({extensions: [showdownTargetBlank]})

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', component: Page},
    {path: '/:page(science|make|about)', component: Page},
  ]
})

Vue.config.productionTip = false
Vue.use(Router)
Vue.component('youtube-player', Youtube)
Vue.mixin({
  methods: {
    markdown(string) {
      return converter.makeHtml(string)
    },
  },
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

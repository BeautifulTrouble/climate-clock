import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import Page from './Page.vue'
import Youtube from './Youtube.vue'

import VueCarousel from 'vue-carousel'
import VueSmoothScroll from 'vue2-smooth-scroll'
import showdown from 'showdown'
import showdownTargetBlank from 'showdown-target-blank'


const converter = new showdown.Converter({extensions: [showdownTargetBlank]})

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/jobs', redirect: () => window.location.replace('https://jobs.climateclock.world/jobs')},
    {path: '/:page(about|yourcity|make|story|get|science|widget)', component: Page},
    {path: '/', component: Page},
    {path: '/*', redirect: '/'},
  ]
})

Vue.config.productionTip = false
Vue.config.ignoredElements = ['climate-clock']

Vue.use(VueCarousel)
Vue.use(VueSmoothScroll)
Vue.use(Router)

Vue.component('youtube-player', Youtube)

Vue.mixin({
  methods: {
    markdown(string) {
      return converter.makeHtml(string)
    },
    local(link) {
      return !/^http/.test(link)
    },
  },
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

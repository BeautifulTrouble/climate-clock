import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import Page from './Page.vue'
import Youtube from './Youtube.vue'

import VueSmoothScroll from 'vue2-smooth-scroll'
import VueScrollReveal from 'vue-scroll-reveal'
import showdown from 'showdown'
import showdownTargetBlank from 'showdown-target-blank'


const converter = new showdown.Converter({extensions: [showdownTargetBlank]})

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', component: Page},
    {path: '/:page(about|donate|make|science|widget)', component: Page},
  ]
})

Vue.config.productionTip = false
Vue.config.ignoredElements = ['climate-clock']

Vue.use(VueSmoothScroll)
Vue.use(VueScrollReveal)
Vue.use(Router)

Vue.component('youtube-player', Youtube)

// Is this against the law?
Vue.prototype.reveal = {
  origin: 'left', 
  distance: '50px', 
  opacity: .2,
}

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

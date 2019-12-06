<template>
  <div id="app">
    <a id="top"></a>
    <div class="wrapper container-fluid">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <header>
          <div class="row">
            <div class="col-sm-12">
              <router-link to="/" class="hide-md-up" v-html="markdown(content.header_small)"></router-link>
              <router-link to="/" class="hide-sm" v-html="markdown(content.header)"></router-link>
              <menu>
                <div class="hide-sm" v-for="(item, i) in content.menu.slice(1)" :key="i">
                  <router-link v-if="item.link.slice(0, 4) != 'http'" :to="item.link"><h3>{{ item.title }}</h3></router-link>
                  <a v-else :href="item.link" target="_blank"><h3>{{ item.title }}</h3></a>
                </div>
              </menu>
              <climate-clock id="climate-clock"></climate-clock>
              <router-link class="button" to="widget">{{ content.widget_button }}</router-link>
            </div>
          </div>
        </header>
        <section id="hero">
          <div class="row">
            <div class="col-sm-12">
              <carousel 
                :perPage="1"
                :autoplay="true"
                :autoplayTimeout="10000"
                :loop="true"
                >
                <!--
                <slide>
                  <youtube-player :video-id="content.video_projection"></youtube-player>
                  <h2>{{ content.video_projection_caption }}</h2>
                </slide>
                -->
                <slide>
                  <img src="/img/8yearsleft.jpg" style="width:100%;">
                  <h2>Spread the word</h2>
                </slide>
                <slide>
                  <youtube-player :video-id="content.video"></youtube-player>
                  <h2>{{ content.video_caption }}</h2>
                </slide>
                <slide>
                  <img src="/img/ifwearetosurvive.jpg" style="max-width:100%;">
                  <h2>Let's make it a lifeline</h2>
                </slide>
              </carousel>
            </div>
          </div>
        </section>
        <router-view></router-view>
        <footer>
          <menu>
            <div v-for="(item, i) in content.menu" :key="i">
              <a v-if="item.link == '#top'" v-smooth-scroll="{duration: 250}" href="#top"><h3>HOME</h3></a>
              <router-link v-else-if="item.link.slice(0, 4) != 'http'" :to="item.link"><h3>{{ item.title }}</h3></router-link>
              <a v-else :href="item.link" target="_blank"><h3>{{ item.title }}</h3></a>
            </div>
          </menu>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import content from './content.aml'

export default {
  data: () => ({
    content: content,
  }),
  methods: {
  },
}
</script>

<style lang="scss">
@import './common';

header {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  .button {
    font-size: .75rem;
    float: right;
    padding: .3rem .5rem .2rem .5rem;
    margin: .5rem 0;
  }
  h3 {
    text-transform: uppercase;
    color: $dark;
    margin: 0 3rem;
    @include breakpoint($sm) {
      margin: 0;
      font-size: 3rem;
    }
  }
}
menu {
  padding: 0;
  display: flex;
  justify-content: center;
  @include breakpoint($sm) {
    flex-direction: column;
  }
  h3 {
    text-transform: uppercase;
    color: $dark;
    margin: 0 3.5vw;
    @include breakpoint($sm) {
      margin: 0;
      font-size: 3rem;
    }
  }
}
#hero {
  border: 1px solid $light;
  padding: 1rem;
  margin-bottom: 3rem;
  @include breakpoint($sm) {
    margin-bottom: 2rem;
    padding: 0;
  }
  h2 {
    margin: 1.25rem 0 .25rem 0;
    text-align: center;
    @include breakpoint($sm) {
      font-size: 1.25rem;
      margin: .5rem;
    }
  }
  .image {
  }
}
.VueCarousel-dot, .VueCarousel-dot-container {
  margin-top: 0 !important;
}
footer {
  margin: 5rem 0 10rem 0;
}
</style>

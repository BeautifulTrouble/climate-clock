<template>
  <div id="app">
    <a id="top"></a>
    <div class="wrapper container-fluid">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <header v-scroll-reveal.reset="reveal">
          <div class="row">
            <div class="col-sm-12">
              <router-link to="/" class="hide-md-up" v-html="markdown(content.header_small)"></router-link>
              <router-link to="/" class="hide-sm" v-html="markdown(content.header)"></router-link>
              <climate-clock id="climate-clock"></climate-clock>
              <router-link class="button" to="widget">{{ content.widget_button }}</router-link>
            </div>
          </div>
        </header>
        <section id="video">
          <div class="row">
            <div class="col-sm-12">
              <!--
              <youtube-player :video-id="content.video"></youtube-player>
              <h2>{{ content.video_caption }}</h2>
              -->
              <img src="/img/greta_un.jpg" style="max-width:100%;">
            </div>
          </div>
        </section>
        <router-view></router-view>
        <footer v-scroll-reveal.reset="reveal">
          <div v-for="(item, i) in content.menu" :key="i">
            <a v-if="item.link == '#top'" v-smooth-scroll="{duration: 250}" href="#top"><h3>HOME</h3></a>
            <router-link v-else :to="item.link"><h3>{{ item.title }}</h3></router-link>
          </div>
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
}
#video {
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
footer {
  display: flex;
  justify-content: center;
  margin: 5rem 0 10rem 0;
  @include breakpoint($sm) {
    flex-direction: column;
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
</style>

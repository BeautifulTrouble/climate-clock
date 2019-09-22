<template>
  <div id="app">
    <div class="wrapper container-fluid">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <header>
          <div class="row">
            <div class="col-sm-12">
              <router-link to="/" class="hide-md-up" v-html="markdown(content.header_small)"></router-link>
              <router-link to="/" class="hide-sm" v-html="markdown(content.header)"></router-link>
              <climate-clock id="climate-clock"></climate-clock>
              <div class="button">{{ content.widget_button }}</div>
            </div>
          </div>
        </header>
        <section id="video">
          <div class="row">
            <div class="col-sm-12">
              <youtube-player :video-id="content.video"></youtube-player>
              <h2>{{ content.video_caption }}</h2>
            </div>
          </div>
        </section>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <footer>
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
}
</style>

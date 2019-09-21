<template>
  <div id="app">
    <div class="wrapper container-fluid">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <header>
          <div class="row">
            <div class="col-sm-12">
              <div class="hide-md-up" v-html="markdown(content.header_small)"></div>
              <div class="hide-sm" v-html="markdown(content.header)"></div>
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
        <section id="clocks">
          <div class="row">
            <div class="col-sm-12 col-md-4" v-for="(clock, index) in content.clocks" :key="index">
              <figure class="clock" :style="{backgroundImage: 'url(/img/' + clock.image}">
                <figcaption>{{ clock.title }}</figcaption>
              </figure>
            </div>
            <div class="col-sm-12">
              <h2>{{ content.cta }}</h2>
            </div>
          </div>
        </section>
        <router-view></router-view>
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
  components: {
  },
  methods: {
  },
  mounted() {
  }
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
#clocks {
  figure {
    margin: 0;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 72%;
    position: relative;
    padding-bottom: $gutter-width;
    @include breakpoint($sm) {
      margin-bottom: 1rem;
    }
  }
  figcaption {
    text-transform: uppercase;
    font-weight: 800;
    position: absolute;
    top: 1rem; left: 1rem;
    color: white;
    font-size: 1.25rem;
  }
  h2 {
    text-transform: uppercase;
    text-align: justify;
    text-justify: inter-word;
    &:after { // This hack forces text justification to work
      content: "";
      display: inline-block;
      width: 100%;
    }
  }
}
</style>

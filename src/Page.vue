<template>
  <article>
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
    <section id="cta">
      <div class="row">
        <div v-for="(p, i) in content.pages" :key="i" class="col-sm-12 col-md-4">
          <div :class="['cta', 'cta-' + i]">
            <h3>{{ p.title }}</h3>
            <div v-html="markdown(p.cta)"></div>
            <!-- sm buttons -->
            <router-link v-if="local(p.button_link)" :to="p.button_link" class="button hide-md-up">{{ p.button }}</router-link> 
            <a v-if="!local(p.button_link)" class="button hide-md-up" :href="p.button_link" target="_blank">{{ p.button }}</a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4" v-for="(p, i) in content.pages" :key="100 + i">
          <div :class="['cta', 'cta-' + i]">
            <!-- md lg buttons -->
            <router-link v-if="local(p.button_link)" :to="p.button_link" class="button hide-sm">{{ p.button }}</router-link> 
            <a v-if="!local(p.button_link)" class="button hide-sm" :href="p.button_link" target="_blank">{{ p.button }}</a>
          </div>
        </div>
      </div>
      <transition name="fade">
        <!-- Here are the page-specific overlays -->
        <div v-if="page != 'home'" class="overlay">
          <router-link to="/" class="button close">x</router-link>
          <div v-for="(p, i) in content.pages" :key="i">
            <div v-if="page == p.button_link" class="row">
              <h2>{{ p.button }}</h2>
              <div v-if="p.content" v-html="markdown(p.content)" class="col-sm-12"></div>
              <div v-if="p.content1" v-html="markdown(p.content1)" class="col-sm-12 col-md-4"></div>
              <div v-if="p.content2" v-html="markdown(p.content2)" class="col-sm-12 col-md-4"></div>
              <div v-if="p.content3" v-html="markdown(p.content3)" class="col-sm-12 col-md-4"></div>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </article>
</template>

<script>
import content from './content.aml'

export default {
  data: () => ({
    content: content,
  }),
  computed: {
    page() { return this.$route.params.page || 'home' },
  },
  watch: {
    '$route.params.page' (newPage, oldPage) {
      this.page = newPage ? newPage : 'home'
      if (this.page != 'home') {
        console.log('gottascroll')
      }
    },
  },
  methods: {
  },
  mounted() {
    if (this.$route.params.page) {

    }
  },
}
</script>

<style lang="scss">
@import './common';

article {
  @include breakpoint($upper) {
    //min-height: 30rem;
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
    text-shadow: 0 0 3px $light;
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
#cta {
  position: relative;
  margin-bottom: 3rem;
  h3 {
    margin-top: 0;
    text-transform: uppercase;
  }
  p {
    font-size: .8rem;
  }
  .button {
    display: inline-block;
  }
  .overlay {
    position: absolute;
    top: -1rem; left: 0;
    width: 100%;
    min-height: 110%;
    min-height: calc(100% + 1rem);
    //background: rgba(255, 255, 255, .83);
    background: white;
    border: 1px solid $light;
    padding: .5rem 1.5rem;
    h2 {
      width: 100%;
      @include breakpoint($sm) {
        margin-right: 3.5rem;
      }
    }
    .close {
      text-transform: none;
      font-size: 1.5rem;
      padding: 0 .6rem .2rem .6rem;
      margin: 0;
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      @include breakpoint($sm) {
        padding: .15rem .8rem .4rem .8rem;
      }
    }
  }
  @include breakpoint($upper) {
    .cta {
      height: 100%;
    }
    .cta-0, .cta-1 {
      border-right: 1px solid $light;
      padding-right: 1rem;
    }
    .cta-1, .cta-2 {
      padding-left: 1rem;
    }
  }
}
</style>


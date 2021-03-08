<template>
  <article>
    <section id="clocks">
      <div class="row">
        <div class="col-sm-12 col-md-4" v-for="(clock, index) in content.clocks" :key="index">
          <figure @click="clockOn(index)" :class="'clock-' + index" :style="{backgroundImage: 'url(/img/' + clock.image}">
            <figcaption>{{ clock.title }}</figcaption>
            <transition name="fade">
              <div v-if="clockIsOn(index)" v-html="markdown(clock.description)"></div>
            </transition>
          </figure>
        </div>
        <div class="col-sm-12">
          <h2>{{ content.cta }}</h2>
        </div>
      </div>
    </section>
    <section id="cta">
      <div class="row">
        <div v-for="(p, i) in content.ctas" :key="i" class="col-sm-12 col-md-4">
          <div :class="['cta', 'cta-' + i]">
            <h3 class="title">{{ p.title }}</h3>
            <div v-html="markdown(p.cta)"></div>
            <!-- sm buttons -->
            <router-link v-if="local(p.link)" :to="p.link" class="button hide-md-up">{{ p.button }}</router-link> 
            <a v-if="!local(p.link)" class="button hide-md-up" :href="p.link" target="_blank">{{ p.button }}</a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4" v-for="(p, i) in content.ctas" :key="100 + i">
          <div :class="['cta', 'cta-' + i]">
            <!-- md lg buttons -->
            <router-link v-if="local(p.link)" :to="p.link" class="button hide-sm">{{ p.button }}</router-link> 
            <a v-if="!local(p.link)" class="button hide-sm" :href="p.link" target="_blank">{{ p.button }}</a>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="page != 'home'" @click="$router.push('/')" class="overlay hide-sm"></div>
      </transition>
      <transition name="fade">
        <div v-if="page != 'home'" class="modal-background">
          <div class="wrapper container-fluid">
            <div class="row">
              <div class="col-sm-12 col-md-10 col-md-offset-1">
                <!-- Here are the page-specific modals -->
                <div :class="{modal: true, [page]: true}">
                  <router-link to="/" class="button close">x</router-link>
                  <!-- 
                    Due to a lack of foresight, "pages" from the [cta] section of content.aml display in one 
                    way while the other "pages" display in another.
                  -->
                  <div v-for="(p, i) in content.ctas" :key="i">
                    <div v-if="page == p.link" class="row">
                      <div class="col-sm-12">
                        <h2>{{ p.button }}</h2>
                      </div>
                      <div v-if="p.content" v-html="markdown(p.content)" class="col-sm-12"></div>
                      <div v-if="p.content1" v-html="markdown(p.content1)" class="cta cta-0 col-sm-12 col-md-4"></div>
                      <div v-if="p.content2" v-html="markdown(p.content2)" class="cta cta-1 col-sm-12 col-md-4"></div>
                      <div v-if="p.content3" v-html="markdown(p.content3)" class="cta cta-2 col-sm-12 col-md-4"></div>
                    </div>
                  </div>
                  <!-- Conditional rendering for each page -->
                  <div v-if="page == 'story'" class="row">
                    <div v-html="markdown(story)" class="col-sm-12"></div>
                  </div>
                  <div v-if="page == 'make'" class="row">
                    <h2>Make a CLIMATECLOCK</h2>
                    <div v-html="markdown(makerkit)" class="col-sm-12"></div>
                  </div>
                  <div v-if="page == 'about'" class="row">
                    <div class="col-sm-12">
                      <h2>{{ content.pages[0].title }}</h2>
                    </div>
                    <div v-html="markdown(content.pages[0].content1)" class="cta cta-0 col-sm-12 col-md-4"></div>
                    <div v-html="markdown(content.pages[0].content2)" class="cta cta-1 col-sm-12 col-md-4"></div>
                    <div v-html="markdown(content.pages[0].content3)" class="cta cta-2 col-sm-12 col-md-4"></div>
                  </div>
                  <div v-if="page == 'widget'" class="row">
                    <div class="col-sm-12">
                      <h2>{{ content.pages[1].title }}</h2>
                    </div>
                    <div v-html="markdown(content.pages[1].content)" class="col-sm-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </article>
</template>

<script>
import content from './content.aml'
import makerkit from '../climate-clock-kit/instructions/instructions.md'
import story from './story.md'

export default {
  data: () => ({
    content: content,
    makerkit: makerkit,
    story: story,
    // TODO: sheesh I'm tired
    clock0: false,
    clock1: false,
    clock2: false,
  }),
  methods: {
    clockOn(n) {
      this['clock' + n] = true
      setTimeout(() => { this['clock' + n] = false }, 10000)
    },
    clockIsOn(n) {
      return this['clock' + n]
    },
  },
  computed: {
    page() { return this.$route.params.page || 'home' },
  },
}
</script>

<style lang="scss">
@import './common';

#clocks {
  figure {
    // WTF IE
    &.clock-0 { background-image: url(/img/berlin.jpg); }
    &.clock-1 { background-image: url(/img/paris.jpg); }
    &.clock-2 { background-image: url(/img/newyork.jpg); }
    margin: 0;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 72%;
    position: relative;
    padding-bottom: $gutter-width;
    @include breakpoint($sm) {
      margin-bottom: 1rem;
    }
    div {
      position: absolute;
      top: 0; left: 0;
      bottom: 0; right: 0;
      background-color: rgba($dark, .6);
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 0 2rem;
      h3 {
        color: white;
        text-shadow: 0 0 100px 20px $dark;
        text-align: center;
      }
    }
  }
  figcaption {
    text-transform: uppercase;
    font-weight: 800;
    position: absolute;
    top: 1rem; left: 1rem;
    color: white;
    font-size: 1.25rem;
    text-shadow: 0 0 2px $light;
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
  h3.title {
    margin-top: 0;
    text-transform: uppercase;
  }
  p {
    font-size: .8rem;
  }
  .button {
    display: inline-block;
    @include breakpoint($sm) {
      margin: 0 0 2rem 0;
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
.overlay {
  position: fixed;
  top: 0; left: 0;
  bottom: 0; right: 0;
  background-color: rgba(255, 255, 255, .8);
}
.modal-background {
  position: fixed;
  top: 0; left: 0;
  bottom: 0; right: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.modal {
  pointer-events: auto;
  position: relative;
  background-color: white;
  border: 1px solid $light;
  padding: .5rem 1.5rem 1.5rem 1.5rem;
  max-height: 100vh;
  h1 {
    margin-top: 1rem;
    padding: 0;
  }
  h2 {
    @include breakpoint($sm) {
      margin-right: 3.5rem;
    }
  }
  h3 {
    text-transform: none !important;
    line-height: 1.2;
  }
  ul {
    padding-inline-start: 1rem;
    line-height: 1.2;
  }
  img {
    width: 100%;
    padding-right: 1rem;
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
  &.story, &.make {
    overflow-y: scroll;
  }
  h4#andaveryspecialthanksto + ul {
    padding-inline-start: 0;
    li { 
      list-style: none; 
      display: inline; 
    }
    li:after { 
      content: " |"; 
      color: $accent;
      font-size: 1.1rem;
      position: relative;
      top: 2px;
    }
    li:last-child:after { content: none; }
  }
  input[type=email] {
    width: 100%;
    padding: .35rem .7rem;
  }
  @include breakpoint($sm) {
    overflow-y: scroll;
    position: fixed;
    top: 0; left: 0;
    bottom: 0; right: 0;
    input[type=submit] {
      margin-top: .5rem !important;
    }
  }
}
.story, .make {
  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1rem;
  }
  img {
    padding-right: 0;
  }
  p:first-of-type img, p:last-of-type img {
    width: 100% !important;
  }
  blockquote:first-of-type p {
    font-size: 1rem !important;
  }
  ul {
    padding-inline-start: 1rem;
  }
  blockquote {
    padding: 0 1rem;
    border: 1px solid $light;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
}
.make {
  img {
    width: 50% !important;
  }
}
</style>


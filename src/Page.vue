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
        <div v-for="(p, i) in content.ctas" :key="i" class="col-sm-12 col-md-4">
          <div :class="['cta', 'cta-' + i]">
            <h3>{{ p.title }}</h3>
            <div v-html="markdown(p.cta)"></div>
            <!-- sm buttons -->
            <router-link v-if="local(p.button_link)" :to="p.button_link" class="button hide-md-up">{{ p.button }}</router-link> 
            <a v-if="!local(p.button_link)" class="button hide-md-up" :href="p.button_link" target="_blank">{{ p.button }}</a>
          </div>
        </div>
        <div class="col-sm-12 col-md-4" v-for="(p, i) in content.ctas" :key="100 + i">
          <div :class="['cta', 'cta-' + i]">
            <!-- md lg buttons -->
            <router-link v-if="local(p.button_link)" :to="p.button_link" class="button hide-sm">{{ p.button }}</router-link> 
            <a v-if="!local(p.button_link)" class="button hide-sm" :href="p.button_link" target="_blank">{{ p.button }}</a>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="page != 'home'" @click="$router.push('/')" class="overlay"></div>
      </transition>
      <transition name="fade-left">
        <div v-if="page != 'home'" class="modal-background">
          <div class="wrapper container-fluid">
            <div class="row">
              <div class="col-sm-12 col-md-10 col-md-offset-1">
                <!-- Here are the page-specific modals -->
                <div class="modal">
                  <router-link to="/" class="button close">x</router-link>
                  <div v-for="(p, i) in content.ctas" :key="i">
                    <div v-if="page == p.button_link" class="row">
                      <div class="col-sm-12">
                        <h2>{{ p.button }}</h2>
                      </div>
                      <div v-if="p.content" v-html="markdown(p.content)" class="col-sm-12"></div>
                      <div v-if="p.content1" v-html="markdown(p.content1)" class="cta cta-0 col-sm-12 col-md-4"></div>
                      <div v-if="p.content2" v-html="markdown(p.content2)" class="cta cta-1 col-sm-12 col-md-4"></div>
                      <div v-if="p.content3" v-html="markdown(p.content3)" class="cta cta-2 col-sm-12 col-md-4"></div>
                    </div>
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

export default {
  data: () => ({
    content: content,
  }),
  computed: {
    page() { return this.$route.params.page || 'home' },
  },
  /*
  watch: {
    '$route.params.page' (newPage, oldPage) {
      this.page = newPage ? newPage : 'home'
      if (this.page != 'home') {
        console.log('gottascroll')
      }
    },
  },
  */
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
  bottom: 2rem;
  background-color: white;
  border: 1px solid $light;
  padding: .5rem 1.5rem 1.5rem 1.5rem;
  h2 {
    width: 100%;
    @include breakpoint($sm) {
      margin-right: 3.5rem;
    }
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
}
</style>


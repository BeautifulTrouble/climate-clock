<template>
  <div id="app">
    <a id="top"></a>
    <div class="wrapper container-fluid">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <header>
          <div class="row">
            <div class="col-sm-12">
              <router-link to="/" class="hide-md-up" v-html="markdown(content.header_small)"></router-link>
              <climate-clock id="climate-clock"></climate-clock>
              <router-link class="button widget" to="widget">{{ content.widget_button }}</router-link>
              <router-link to="/" class="hide-sm" v-html="markdown(content.header)"></router-link>
              <menu>
                <div class="hide-sm" v-for="(item, i) in content.menu" :key="i">
                  <router-link v-if="item.type == 'route'" :to="item.link"><h3>{{ item.title }}</h3></router-link>
                  <a v-else-if="item.type == 'link'" :href="item.link" target="_blank"><h3>{{ item.title }}</h3></a>
                </div>
                <!--
                <div class="hide-md-up">
                  <a v-smooth-scroll="{duration: 250}" href="#bottom" class="css-menu"></a>
                </div>
                -->
              </menu>
              <div id="signup">
                <h3>{{ content.signup }}</h3>
                <form action="https://beautifultrouble.us7.list-manage.com/subscribe/post?u=2aa3b5c34f535e74090f9098d&amp;id=e450999d72" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="EMAIL">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                    <div style="position: absolute; left: -5000px;" aria-hidden="true">
                      <input type="text" name="b_2aa3b5c34f535e74090f9098d_e450999d72" tabindex="-1" value="">
                    </div>
                    <input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" class="button">
                </form>
              </div>
            </div>
          </div>
        </header>
        <section id="hero">
          <div class="row">
            <div class="col-sm-12">
              <carousel ref="carousel"
                :perPage="1"
                :autoplay="true"
                :autoplayTimeout="10000"
                :autoplayHoverPause="false"
                :loop="true"
                >
                <slide v-for="(slide, i) in content.slides" :key="i">
                  <youtube-player v-if="slide.type == 'youtube'" 
                    :video-id="slide.content"
                    @playing="$refs.carousel.pauseAutoplay()"
                    @stopped="$refs.carousel.advancePage(1); $refs.carousel.startAutoplay()"
                    ></youtube-player>
                  <a v-else-if="slide.type == 'image' && slide.link" :href="slide.link" target="_blank">
                    <img :src="slide.content" style="width:100%;">
                  </a>
                  <img v-else-if="slide.type == 'image'" :src="slide.content" style="width:100%;">
                  <h2>{{ slide.caption }}</h2>
                </slide>
              </carousel>
            </div>
          </div>
        </section>
        <router-view></router-view>
        <a id="bottom"></a>
        <footer>
          <menu>
            <div v-for="(item, i) in content.menu" :key="i">
              <a v-if="item.link.slice(0, 1) == '#'" v-smooth-scroll="{duration: 250}" :href="item.link"><h3>{{ item.title }}</h3></a>
              <router-link v-else-if="item.type == 'route'" :to="item.link"><h3>{{ item.title }}</h3></router-link>
              <a v-else-if="item.type == 'link'" :href="item.link" target="_blank"><h3>{{ item.title }}</h3></a>
            </div>
          </menu>
          <div class="branding">
            <div>
              <a href="https://beautifultrouble.org" target="_blank"><div class="logo"></div></a>
              <p v-html="markdown(content.footer)"></p>
            </div>
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
  margin: 1rem 0;
  .button.widget {
    font-size: .75rem;
    float: right;
    padding: .3rem .5rem .2rem .5rem;
    margin: .5rem 0;
  }
  h1 {
    padding: 3rem 0 0 0;
    @include breakpoint($sm) {
      padding: .5rem 0 2rem 0;
    }
  }
  menu {
    margin: 0 0 3rem 0
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
  .css-menu {
    position: relative;
    padding-left: 1.25em;
  }
  .css-menu:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.25em;
    width: 1em;
    height: 0.15em;
    background: black;
    box-shadow: 
      0 0.25em 0 0 black,
      0 0.5em 0 0 black;
  }
}
#signup {
  border: 1px solid $light;
  padding: .75rem 1rem .75rem 1rem;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
    display: inline-block;
  }
  form {
    display: inline-block;
  }
  input[type=email] {
    padding: .35rem;
    margin: 0;
    margin-right: .75rem;
    border: 1px solid $light
  }
  input[type=submit] {
    margin: 0;
    padding: .35rem 1rem .4rem 1rem;
    font-size: .9rem;
  }
  @include breakpoint($md) {
    h3 {
      font-size: .8rem;
    }
  }
  @include breakpoint($md-plus) {
    h3 {
      font-size: 1.05rem;
    }
  }
  @include breakpoint($sm) {
    padding: .75rem .75rem .5rem .75rem;
    margin-top: 3rem;
    flex-direction: column;
    align-items: flex-start;
    h3 {
      font-size: .9rem;
      display: block;
    }
    form {
      display: block;
    }
    input[type=submit] {
      font-size: .75rem;
      padding: .3rem .5rem .2rem .5rem;
      margin: .5rem 0;
    }
    input[type=email] {
      padding: .1rem .5rem;
      font-size: .9rem;
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
      font-size: 1rem;
      margin: .5rem 0 0 0;
    }
  }
  .image {
  }
}
.VueCarousel-dot, .VueCarousel-dot-container {
  margin-top: 0 !important;
}
footer {
  menu {
    margin-bottom: 6rem;
  }
  .branding {
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include breakpoint($sm) {
      align-items: flex-start;
    }
    > div {
      width: 50%;
      max-width: 300px;
      @include breakpoint($sm) {
        width: 100%;
        max-width: none;
      }
    }
    .logo {
      background-image: url(/img/bt.png);
      background-size: cover;
      background-repeat: no-repeat;
      padding-top: 49%;
      @include breakpoint($sm) {
        width: 50%;
        padding-top: 24%;
      }
    }
  }
}
</style>

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
                <!--
                <div class="hide-md-up">
                  <a v-smooth-scroll="{duration: 250}" href="#bottom" class="css-menu"></a>
                </div>
                -->
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
        <a id="bottom"></a>
        <footer>
          <menu>
            <div v-for="(item, i) in content.menu" :key="i">
              <a v-if="item.link == '#top'" v-smooth-scroll="{duration: 250}" href="#top"><h3>HOME</h3></a>
              <router-link v-else-if="item.link.slice(0, 4) != 'http'" :to="item.link"><h3>{{ item.title }}</h3></router-link>
              <a v-else :href="item.link" target="_blank"><h3>{{ item.title }}</h3></a>
            </div>
          </menu>
          <div class="signup">
            <div>
              <p style="color: black">Contact us at info (at) climateclock (dot) world,<br>or leave us your email and we'll keep in touch.</p>
              <!-- TODO: clean this up -->
              <form action="https://beautifultrouble.us7.list-manage.com/subscribe/post?u=2aa3b5c34f535e74090f9098d&amp;id=e450999d72" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                  <div id="mc_embed_signup_scroll">
              <div class="mc-field-group">
                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
              </div>
                <div id="mce-responses" class="clear">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2aa3b5c34f535e74090f9098d_e450999d72" tabindex="-1" value=""></div>
                  <div class="clear"><input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                  </div>
              </form>
              <p>&copy; 2019</p>
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
  p {
    font-size: .75rem;
  }
  p, form {
    color: #ccc;
    margin: .5rem 0;
  }
  div.signup {
    padding-top: 2rem;
    @include breakpoint($upper) {
      padding-top: 4rem;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

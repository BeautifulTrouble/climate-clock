<template>
  <main>
    <!-- Home -->
    <article v-if="!page">
      <section id="cta">
        <div class="row">
          <div class="col-sm-12 col-md-4" v-for="(cta, index) in content.cta_sections" :key="index">
            <div :class="['cta', 'cta-' + index]">
              <h3>{{ cta.title }}</h3>
              <div v-html="markdown(cta.content)"></div>
              <!-- sm buttons -->
              <router-link v-if="local(cta.button_link)" :to="cta.button_link" class="button hide-md-up">{{ cta.button }}</router-link> 
              <a v-if="!local(cta.button_link)" class="button hide-md-up" :href="cta.button_link" target="_blank">{{ cta.button }}</a>
            </div>
          </div>
          <div class="col-sm-12 col-md-4" v-for="(cta, index) in content.cta_sections" :key="100 + index">
            <div :class="['cta', 'cta-' + index]">
              <!-- md lg buttons -->
              <router-link v-if="local(cta.button_link)" :to="cta.button_link" class="button hide-sm">{{ cta.button }}</router-link> 
              <a v-if="!local(cta.button_link)" class="button hide-sm" :href="cta.button_link" target="_blank">{{ cta.button }}</a>
            </div>
          </div>
        </div>
      </section>
    </article>

    <!-- Science -->
    <article v-if="page == 'science'">
      <section id="clocks">
        <div class="row">
          <div class="col-sm-12">
            <h2>SCIENCE</h2>
          </div>
        </div>
      </section>
    </article>

    <!-- Make -->
    <article v-if="page == 'make'">
      <section id="clocks">
        <div class="row">
          <div class="col-sm-12">
            <h2>MAKE</h2>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import content from './content.aml'

export default {
  data: () => ({
    content: content,
  }),
  computed: {
    page() {
      console.log(this.$route.params)
      return this.$route.params.page || null
    },
  },
  methods: {
    local(link) {
      return !/^http/.test(link)
    },
  },
}
</script>

<style lang="scss">
@import './common';

article {
  @include breakpoint($upper) {
    min-height: 30rem;
  }
}
#cta {
  h3 {
    text-transform: uppercase;
  }
  p {
    font-size: .8rem;
  }
  .button {
    display: inline-block;
  }
  margin-bottom: 3rem;
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


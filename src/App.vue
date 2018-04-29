<template>
  <div id="app">
    <responsive v-if="isMobile === true"></responsive>
    <div v-else>
      <background></background>
      <progress-loader></progress-loader>
      <global-header></global-header>

      <router-view/>

      <div class="illustrations" ref="illustrations" v-if="goProject">
        <div class="illustration" ref="illustrationValue" v-if="currentProject == index" v-for="(project, index) in projects" :key="index">
          <div class="illustration-wrapper">
            <div class="illustration-source">
              <img :src="project.illustration">
            </div>
          </div>
        </div>
      </div>

      <div class="scroll__fill" :class="{'scroll__fill--active' : ['Home', 'Project'].indexOf($route.name) > -1 && websiteReady}" ref="scroll">
        <div class="scroll__fill-1">scroll</div>
        <div class="scroll__fill-line"></div>
        <div class="scroll__fill-2">down</div>
      </div>
  </div>
    </div>
</template>

<script>
import GlobalHeader from '@/components/Header';
import ProgressLoader from '@/components/ProgressLoader';
import Background from '@/components/Background';
import Responsive from '@/components/Responsive';
import { isMobile } from '@/services/utils';
import { LOAD_ASSETS, SWITCH_MOBILE } from '@/store/types';

export default {
  name: 'App',
  components: {
    GlobalHeader,
    ProgressLoader,
    Background,
    Responsive
  },
  data() {
    return {
      isMobile: false,
      breakpoint: 900
    }
  },
  computed: {
    websiteReady() {
      return this.$store.state.websiteReady;
    },

    goProject() {
      return this.$store.state.goProject;
    },

    currentProject() {
      return this.$store.state.currentProject;
    },

    projects() {
      return this.$store.state.content.projects;
    }
  },
  mounted() {
    this.$store.dispatch(LOAD_ASSETS);

    window.addEventListener('resize', () => {
      if (window.innerWidth <= this.breakpoint && this.isMobile !== true) {
        this.isMobile = true;
        this.$store.commit(SWITCH_MOBILE, true);
      } else if (window.innerWidth >= this.breakpoint && this.isMobile !== false) {
        window.location.reload();
      }
    });
  },
  beforeMount() {
    if (isMobile() === true || window.innerWidth <= this.breakpoint) {
      this.isMobile = true;
      this.$store.commit(SWITCH_MOBILE, true);
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/app.scss";

.illustrations {
  position: absolute;
  top: $horizontal-line-1;
  left: $vertical-line-2;
  width: $size-illustration;
  z-index:0;
  height: 50%;
  overflow: hidden;
  user-select: none;
}

.illustration {
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.illustration-wrapper,
.illustration-source {
  width: 100%;
  height: 100%;
}

.illustration-source {
  position: absolute;
  width: 100%;
  left: 0%;
  overflow: hidden;

  img {
    position: absolute;
    right: 0;
    width: 74vw;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }
}

.scroll__fill {
  position:fixed;
  bottom: 20px;
  color:$grey;
  height: 27px;
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.7s $easing;
  will-change: opacity;

  div:nth-child(odd){
    margin: 0 12px;
  }

  &--active {
    opacity: 1;
    transition-delay: 0.7s;
  }
}

.scroll__fill-line {
  height: 27px;
  width: 1px;
  background-color: $white;
  display: inline-block;
  position: fixed;
  left:50%;
  animation: scroll-fill 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
  animation-direction: reverse;
  will-change: transform;
}
</style>

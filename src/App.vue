<template>
  <div id="app">
    <responsive v-if="isMobile === true"></responsive>
    <div v-else>
      <background></background>
      <progress-loader></progress-loader>
      <global-header></global-header>

      <router-view/>

      <div class="illustrations" ref="illustrations">
        <div class="illustration" ref="illustrationValue" :class="{'illustration--current': currentProject === index, 'illustration--previous': previousProject === index }" v-for="(project, index) in projects" :key="index">
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

      <audio loop="loop" ref="sound">
        <source :src="sound.mp3" type="audio/mp3" />
        <source :src="sound.ogg" type="audio/ogg" />
        Your browser doesn't support audio API
      </audio>
    </div>
  </div>
</template>

<script>
import GlobalHeader from '@/components/Header';
import ProgressLoader from '@/components/ProgressLoader';
import Background from '@/components/Background';
import Responsive from '@/components/Responsive';
import { isMobile, ease } from '@/services/utils';
import { LOAD_ASSETS, SWITCH_MOBILE } from '@/store/types';
import { TweenMax, TimelineMax } from 'gsap';
import 'intersection-observer';

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
      breakpoint: 900,
      illustrationHeight: null
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

    previousProject() {
      return this.$store.state.previousProject;
    },

    projects() {
      return this.$store.state.content.projects;
    },

    sound() {
      return this.$store.state.content.sound;
    },

    goAbout() {
      return this.$store.state.goAbout;
    },

    returnHome() {
      return this.$store.state.returnHome;
    }
  },
  mounted() {
    this.$store.dispatch(LOAD_ASSETS);
    this.wheelScroll = event => {
      this.onScroll(event);
    };
    this.illustrationHeight = this.$refs.illustrationValue[this.currentProject].scrollHeight
    window.addEventListener('scroll', this.wheelScroll);

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
  },
  methods: {
    startSound() {
      this.$refs.sound.play()
      this.$refs.sound.volume = '0.2'
    },

    onScroll(event) {
      if (this.$route.name === 'Project') {
        const reduction = this.illustrationHeight - window.scrollY / 3

        if (reduction < this.illustrationHeight) {
          TweenMax.set(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), {
            height: `${reduction}px`,
            yoyo: true,
            ease: ease
          });
        }
      }
    },

    enterAnimation() {
      if (this.$route.name === 'Home') {
        TweenMax.fromTo(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), 0.8, {
          width: '0%',
          left: '100%'
        }, {
          width: '50%',
          left: '50%',
          ease: ease
        })
      }

      if (this.$route.name === 'Project') {
        TweenMax.fromTo(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), 0.8, {
          width: '0%',
          left: '100%'
        }, {
          width: '100%',
          left: '0%',
          ease: ease
        })
        TweenMax.to(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source img'), 1, {
          css: { 'filter': 'grayscale(0%)', '-webkit-filter': 'grayscale(0%)' },
          ease: ease,
          delay: 0.6
        })
      }
    },

    goHome() {
      TweenMax.set(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), {
        top: '0%',
        height: '100%'
      })
      TweenMax.to(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), 0.8, {
        width: '50%',
        left: '50%',
        ease: ease,
        delay: 1.6
      })
    },

    switchProject() {
      if (this.$route.name === 'Home') {
        const timeline = new TimelineMax()
        timeline
          .to(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), 1, {
            width: '50%',
            left: '50%',
            ease: ease
          })
          .to(this.$refs.illustrationValue[this.previousProject].querySelector('.illustration-source'), 1, {
            width: '0%',
            left: '100%',
            ease: ease
          })
      }
    },

    enterInProject() {
      const timeline = new TimelineMax();

      timeline
        .to(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source'), 0.8, {
          width: '100%',
          left: '0%',
          ease: ease,
          delay: 0.8
        })
        .to(this.$refs.illustrationValue[this.currentProject].querySelector('.illustration-source img'), 1, {
          css: { 'filter': 'grayscale(0%)', '-webkit-filter': 'grayscale(0%)' },
          ease: ease
        })
    },

    exitAnimation() {
      TweenMax.to(this.$refs.illustrations.querySelectorAll('.illustration-source'), 0.8, {
        left: '100%',
        width: '0%',
        ease: ease
      })
      TweenMax.to(this.$refs.illustrations.querySelectorAll('.illustration-source img'), 0.8, {
        css: { 'filter': 'grayscale(100%)', '-webkit-filter': 'grayscale(100%)' },
        ease: ease
      })
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        this.enterAnimation();
        this.startSound();
      }
    },

    returnHome(boolean) {
      if (boolean === true) {
        this.exitAnimation()
        this.goHome();
      }
    },

    goAbout(boolean) {
      if (boolean === true) {
        this.exitAnimation();
      }
    },

    goProject(boolean) {
      if (boolean === true) {
        this.enterInProject()
      }
    },

    currentProject() {
      this.switchProject()
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/app.scss";

.illustrations {
  position: absolute;
  top: $horizontal-line-1;
  left: calc(13% + 1px);
  width: calc(74vw - 2px);
  height: 50%;
  overflow: hidden;
  user-select: none;
  z-index: 0;
}

.illustration {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: $zindex-home-illustrations;
  will-change: transform;

  &--previous {
    z-index: $zindex-home-illustrations-previous;
  }

  &--current {
    z-index: $zindex-home-illustrations-current;
  }
}

.illustration-wrapper,
.illustration-source {
  width: 100%;
  height: 100%;
}

.illustration-source {
  position: absolute;
  width: 0%;
  left: 100%;
  overflow: hidden;
  will-change: transform;

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

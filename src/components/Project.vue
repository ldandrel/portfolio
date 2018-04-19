<template>
  <div class="project">
    <div class="project__head">
      <div class="project__illustration-wrapper" ref="illustration">
        <div class="project__illustration">
          <div class="project__illustration-source" :class="{'project__illustration-source--from-home': fromHome}">
            <img :src="project.illustration">
          </div>
        </div>
      </div>
      <div class="project__title" ref="title">
        <div class="project__title-wrapper">
          <h1 class="project__title-value">
            {{ project.title }}
          </h1>
        </div>
      </div>

      <div class="project__details" ref="details">
        <div class="project__details-wrapper">
          <div class="project__details-content">
            <div class="project__details-detail">
              <div class="project__details-content-wrapper">
                <div class="project__details-content-value" ref="type">{{ project.type }}</div>
              </div>
            </div>

            <div class="project__details-detail">
              <div class="project__details-content-wrapper">
                <div class="project__details-content-value" ref="job">{{ project.job }}</div>
              </div>
            </div>

            <div class="project__details-detail">
              <div class="project__details-content-wrapper">
                <div class="project__details-content-value" ref="date">{{ project.date }}</div>
              </div>
            </div>

            <div class="project__details-detail">
              <div class="project__details-content-wrapper">
                <div class="project__details-content-value" ref="roleContent">
                  <a :href="project.link" class="link">website</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="project__content">
      <div class="project__description">
        <div class="project__description-wrapper">
          <p class="project__description-text">{{ project.description }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax } from 'gsap';
import { GO_PROJECT } from '@/store/types';
import { ease } from '@/services/utils'
export default {
  name: 'Project',
  props: ['slug'],
  data() {
    return {
      currentScrollPosition: 0,
      overflowed: false,
      ready: false,
      elements: [],
      buttonWrapperDetails: null,
      currentButtonPositionX: 0,
      currentButtonPositionY: 0,
      pressTimeout: null,
      leavingToProject: false,
      observer: null,
      fromHome: false,
      illustrationHeight: null
    }
  },
  computed: {
    project() {
      return this.$store.state.content.projects.find(project => project.slug === this.slug);
    },
    goProject() {
      return this.$store.state.goProject;
    },
    websiteReady() {
      return this.$store.state.websiteReady;
    },
    returnHome() {
      return this.$store.state.returnHome;
    },
    goAbout() {
      return this.$store.state.goAbout;
    }
  },
  beforeMount() {
    const existingProject = this.$store.state.content.projects.find(project => project.slug === this.slug);

    this.fromHome = this.goProject
    if (existingProject === undefined) {
      this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
    if (this.goProject === true) {
      this.enterAnimation();
      this.$store.commit(GO_PROJECT, false);
    }

    this.illustrationHeight = this.$refs.illustration.scrollHeight

    window.addEventListener('scroll', (event) => {
      this.onScroll(event);
    });
  },
  methods: {
    onScroll(event) {
      TweenMax.to(this.$refs.illustration, 0, {
        height: `${this.illustrationHeight - window.scrollY / 3}px`,
        repeat: 2,
        yoyo: true,
        ease: ease
      });
      /*
      const percentageScroll = Math.round(((this.$refs.title.getBoundingClientRect().top - 55) * 100) / window.innerHeight)
      console.log(percentageScroll)
      if (percentageScroll <= 25) {
        this.$refs.title.style.position = 'fixed'
        this.$refs.details.style.position = 'fixed'
        this.$refs.title.style.top = 'calc(25% - 55px)'
      }
      */
    },

    enterAnimation() {
      const timeline = new TimelineMax();

      timeline
        .to(this.$refs.illustration.querySelector('.project__illustration-source'), 1, {
          left: '0%',
          width: '100%',
          ease: ease
        })
        .to(this.$refs.illustration.querySelector('.project__illustration-source img'), 1, {
          css: { 'filter': 'grayscale(0%)', '-webkit-filter': 'grayscale(0%)' },
          ease: ease
        }, '-=1')
        .staggerFromTo([this.$refs.title.querySelector('.project__title-wrapper'), this.$refs.details.querySelector('.project__details-wrapper')], 0.5, {
          width: '0%'
        }, {
          width: '100%',
          ease: ease
        }, 0.5, '-=1')
        .to(this.$refs.title.querySelector('.project__title-value'), 0, {
          css: { 'white-space': 'normal' }
        })
    },
    exitAnimation(routeName) {
      const timeline = new TimelineMax({
        onComplete: () => { this.$router.push({name: routeName}) }
      });

      timeline
        .to(this.$refs.title.querySelector('.project__title-value'), 0, {
          css: { 'white-space': 'nowrap' }
        })
        .to(this.$refs.illustration.querySelector('.project__illustration-source'), 1, {
          left: '100%',
          width: '00%',
          ease: ease
        })
        .staggerFromTo([this.$refs.title.querySelector('.project__title-wrapper'), this.$refs.details.querySelector('.project__details-wrapper')], 0.5, {
          width: '100%'
        }, {
          width: '0%',
          ease: ease
        }, -0.5, '-=1')
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        this.enterAnimation();
      }
    },
    returnHome(boolean) {
      if (boolean === true) {
        this.exitAnimation('Home');
      }
    },
    goAbout(boolean) {
      if (boolean === true) {
        this.exitAnimation('About');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project{
  width: 100vw;
  height: 100vh;
}

.project__head {
  position: relative;
  width: 100%;
  height: 100vh;
  pointer-events: all;
  z-index:2;
}

.project__illustration-wrapper {
  position: absolute;
  top: $horizontal-line-1;
  left: $vertical-line-2;
  width: $size-illustration;
  height: 50%;
  z-index: $zindex-home-illustrations;
  overflow: hidden;
  user-select: none;
}

.project__illustration {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: $zindex-home-illustrations;
  will-change: transform;
}

.project__illustration-source {
  width: 100%;
  height: 100%;
}

.project__illustration-source {
  position: absolute;
  width: 0%;
  right: 0;
  overflow: hidden;

  &--from-home {
    left:0%;
    width: 100%;
  }

  img {
    position: absolute;
    right: 0;
    height: 50vh;
    width: 74vw;
    object-fit: cover;
    will-change: transform;
    filter: grayscale(100%);
  }
}

.project__title {
  position: absolute;
  top: $project-info;
  left: $vertical-line-2;
  max-width: $size-description;
}

.project__title-wrapper {
  overflow: hidden;
  width: 0%;
}

.project__title-value {
  font-family: $title-font;
  font-size: 70px;
  will-change: transform;
  transform: translate(-4px, 0);
  line-height: 1;
  white-space: nowrap;

  @include responsive($xl) {
    font-size: 55px;
    transform: translate(-3px, 0);
  }
}

.project__details {
  position: absolute;
  top: $project-info;
  left: $vertical-line-3;
  width: $size-description;
  height: 55px;

  @include responsive($xl) {
    height: 45px;
  }
}

.project__details-content {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100%;
  justify-content: space-between;
  z-index: 2;
  width: 37vw;
}

.project__details-wrapper {
  overflow: hidden;
  width: 0%;
  height: 100%;
}

.project__details-detail {
  padding:0px 12px;

  &:first-of-type{
    padding: 0 12px 0 0;
  }

  &:last-of-type {
    padding:0 0 0 12px;
  }
}
.project__details-content-value {
  color:$grey;

  a:hover {
    &::after {
      transform:scaleX(4.4)
    }
  }
}

.project__content {
  position: relative;
  pointer-events: all;
  overflow: hidden;
  width: 74vw;
  margin:82px auto 300px auto;
}

.project__description {
  width: 45%;
}

.project__description-text {
  color:$grey;
}
</style>

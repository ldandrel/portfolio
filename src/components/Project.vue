<template>
  <div class="project">
    <div class="project__container">
      <div class="project__illustration-wrapper" ref="illustration">
        <div class="project__illustration">
          <div class="project__illustration-source" :class="{'project__illustration-source--from-home': fromHome}">
            <img :src="project.illustration">
          </div>
        </div>
      </div>
      <div class="project__sticky">
        <div class="project__title" :class="{'project__title--fixed': fixed}" ref="title">
          <div class="project__title-wrapper">
            <h1 class="project__title-value">
              {{ project.title }}
            </h1>
          </div>
        </div>

        <div class="project__details" :class="{'project__details--fixed': fixed}" ref="details">
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
                    <a :href="project.url" target="_blank" class="link">website</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="project__description" :class="{'project__description--fixed': fixed}" ref="description">
        <div class="project__description-wrapper">
          <p class="project__description-text">{{ project.description }}</p>
        </div>
      </div>

      <div class="project__elements" ref="elements">
        <div class="project__elements-wrapper">
          <div class="project__element" ref="elements" v-for="(element, index) in project.elements" :key="index">
            <div v-if="element.title !== false" class="project__element-title">
              {{ element.title }}
            </div>
            <div v-if="element.type === 'video'" class="project__element-source project__element-source--video">
              <video ref="projectVideo" playsinline autoplay muted loop :src="element.source"></video>
            </div>

            <div v-if="element.type === 'image'" class="project__element-source project__element-source--image">
              <img :src="element.source">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineMax, TweenMax } from 'gsap';
import { GO_PROJECT, CURRENT_PROJECT, RETURN_HOME } from '@/store/types';
import { ease } from '@/services/utils'

export default {
  name: 'Project',
  props: ['slug'],
  data() {
    return {
      observer: null,
      fromHome: false,
      illustrationHeight: null,
      fixed: false
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
    this.wheelScroll = event => {
      this.onScroll(event);
    };

    this.$store.commit(CURRENT_PROJECT, this.project.id);

    if (this.goProject === true) {
      this.enterAnimation();
      this.$store.commit(GO_PROJECT, false);
    }

    this.illustrationHeight = this.$refs.illustration.scrollHeight

    const config = {
      rootMargin: `100% 0% -75% 0%`,
      threshold: [0]
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          TweenMax.to(entry.target, 0.5, {
            autoAlpha: 0.3,
            ease: ease
          });
        } else {
          TweenMax.to(entry.target, 0.5, {
            autoAlpha: 1,
            ease: ease
          });
        }
      });
    }, config);

    this.$refs.elements.querySelectorAll('.project__element').forEach(element => {
      this.observer.observe(element);
    });

    window.addEventListener('scroll', this.wheelScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.wheelScroll);
  },
  methods: {
    onScroll(event) {
      TweenMax.set(this.$refs.illustration, {
        height: `${this.illustrationHeight - window.scrollY / 3}px`,
        repeat: -1,
        yoyo: true,
        ease: ease
      });
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
        .staggerTo(this.$refs.elements.querySelectorAll('.project__element'), 1, {
          x: '0%',
          ease: ease
        }, 0.05, '-=1')
        .to(this.$refs.description.querySelector('.project__description-text'), 1, {
          x: '0%',
          ease: ease
        }, '-=1');
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
        .staggerTo(this.$refs.elements.querySelectorAll('.project__element'), 1, {
          x: '-105%',
          ease: ease
        }, 0.05, '-=1')
        .to(this.$refs.description.querySelector('.project__description-text'), 1, {
          x: '-100%',
          ease: ease
        }, '-=1');
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Home') this.$store.commit(RETURN_HOME, true)
    next()
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

}

.project__container {
  width: calc(74vw - 2px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin:auto;
}

.project__illustration-wrapper {
  margin-top: 25vh;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  user-select: none;
}

.project__illustration {
  position: relative;
  width: 100%;
  height: 100%;
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

.project__sticky {
  width: 100%;
  margin-top: $project-info;
  display: flex;
  position: sticky;
  top: calc(25% - 55px);
  height: 55px;

  @include responsive($xl) {
    top: calc(25% - 45px);
    height: 45px;
  }
}

.project__title {
  width: 50%;
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
  width: 50%;
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

.project__description {
  width: 32%;
  padding-top: 24px;
  margin-top: calc(25vh - 90px);
  position: sticky;
  top: 25%;
  height: 50vh;
  display: flex;
  align-items: flex-end;

  @include responsive($xl) {
    margin-top: calc(25vh - 80px);
  }
}

.project__description-wrapper {
  overflow: hidden;
}

.project__description-text {
  color:$grey;
  transform: translateX(-100%);
  will-change: transform;
}

.project__elements {
  width: calc(50% - 2px);
  margin-left: calc(18% + 1px);
  margin-top: calc(25vh - 90px);

  @include responsive($xl) {
    margin-top: calc(25vh - 80px);
  }
}

.project__elements-wrapper {
  overflow: hidden;
}

.project__element {
  margin-bottom: 55px;
  transform: translateX(-100%);
  will-change: transform;

  &:last-of-type {
    margin-bottom: 25vh;
  }
}

.project__element-source {
  video,
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 415px;
  }
}

.project__element-title {
  margin: 0 0 12px 10px;
  color:$grey;
}
</style>

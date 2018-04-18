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
    <div class="project__title">
      <div class="project__title-wrapper" ref="title">
        <h1 class="project__title-value">
          {{ project.title }}
        </h1>
      </div>
    </div>

    <div class="project__details">
      <div class="project__details-wrapper" ref="details">
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
</div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
import { TimelineMax } from 'gsap';
import { GO_PROJECT } from '@/store/types';
import { ease } from '@/services/utils'
export default {
  name: 'Project',
  props: ['slug'],
  data() {
    return {
      currentScrollPosition: 0,
      prevScrollPosition: 0,
      scrollSpeed: 0,
      scrollDifference: 0,
      scrollDirection: 1,
      overflowed: false,
      ready: false,
      elements: [],
      buttonWrapperDetails: null,
      currentButtonPositionX: 0,
      currentButtonPositionY: 0,
      pressTimeout: null,
      leavingToProject: false,
      scrollbar: null,
      observer: null,
      fromHome: false
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

    const options = {
      damping: 0.06,
      thumbMinSize: 40,
      renderByPixels: !('ontouchstart' in document),
      alwaysShowTracks: false,
      continuousScrolling: true
    };

    Scrollbar.init(document.querySelector('.project'), {
      ...options,
      wheelEventTarget: document
    });

    this.scrollbar = Scrollbar.get(document.querySelector('.project'));

    this.scrollbar.addListener(event => {
      this.onScroll(event);
    });
  },
  methods: {
    onScroll(event) {
      const percentage = Math.round(((event.offset.y / window.innerHeight) * 100) / 0.7);
      console.log(percentage)
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
        .staggerFromTo([this.$refs.title, this.$refs.details], 0.5, {
          width: '0%'
        }, {
          width: '100%',
          ease: ease
        }, 0.5, '-=1')
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        this.enterAnimation();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
}

.project__head {
  position: relative;
  width: 100%;
  height: 100vh;
  pointer-events: all;
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
    height: 150%;
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

</style>

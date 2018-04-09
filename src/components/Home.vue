<template>
  <div class="home">
    <div class="home__project" :class="{'home__project--current': currentProject === index}" v-for="(project, index) in projects" :key="index" ref="projects">
      <div class="home__project-wrapper">
        <div class="home__project-content" ref="project">
          <div class="home__project-infos">
            <div class="home__project-info-index">{{ project.index|pad }}</div>
            <div class="home__project-info-title">{{ project.title }}</div>
            <div class="home__project-info-type">{{ project.type }}</div>
            <div class="home__project-info-job">{{ project.job }}</div>
            <div class="home__project-info-link">
              <a class="link" v-on:click="goToProject(project.slug)" href="#">see the case</a>
            </div>
          </div>
          <div class="home__project-illustration">
            <img :src="project.illustration" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap';
import { Lethargy } from 'lethargy';
import { ease } from '@/services/utils';

export default {
  name: 'Home',
  data() {
    return {
      currentProject: 0,
      previousProject: null,
      switing: false,
      buttonWrapperDetails: null,
      currentButtonPositionX: 0,
      currentButtonPositionY: 0,
      lethargy: new Lethargy(),
      pressTimeout: null,
      leavingToProject: false,
      wheelHandler: null,
      keydownHandler: null
    }
  },
  computed: {
    projects() {
      return this.$store.state.content.projects;
    },
    websiteReady() {
      return this.$store.state.websiteReady;
    }
  },
  mounted() {
    this.wheelHandler = event => {
      this.onMouseWheel(event);
    };

    this.keydownHandler = event => {
      this.onKeydown(event);
    };

    this.wheelHandler = this.wheelHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);

    window.addEventListener('mousewheel', this.wheelHandler);
    window.addEventListener('wheel', this.wheelHandler);
    window.addEventListener('DOMMouseScroll', this.wheelHandler);
    window.addEventListener('MozMousePixelScroll', this.wheelHandler);
    window.addEventListener('keydown', this.keydownHandler);
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel', this.wheelHandler);
    window.removeEventListener('wheel', this.wheelHandler);
    window.removeEventListener('DOMMouseScroll', this.wheelHandler);
    window.removeEventListener('MozMousePixelScroll', this.wheelHandler);
    window.removeEventListener('keydown', this.keydownHandler);
    this.clearDefinitelySwitchingInterval();
  },
  methods: {
    enterAnimation() {
      TweenMax.to(this.$refs.project, 0.5, {
        y: '0%',
        ease: ease,
        delay: 0.7
      });
    },

    onKeydown(event) {
      if (event.keyCode === 40 || event.keyCode === 38) {
        if (!this.switing) {
          this.switing = true;
          this.previousProject = this.currentProject;

          switch (event.keyCode) {
            case 40:
              this.updateCurrentProject('down');
              break;
            case 38:
              this.updateCurrentProject('up');
              break;
          }

          this.switchProject();
          setTimeout(() => {
            this.switing = false;
          }, 500);
        }
      }
    },

    onMouseWheel(event) {
      event.preventDefault()
      event.stopPropagation();
      const check = this.lethargy.check(event);

      if (check !== false) {
        if (this.switing === false) {
          this.switing = true;

          this.previousProject = this.currentProject;

          if (check === -1) {
            this.updateCurrentProject('down');
          } else {
            this.updateCurrentProject('up');
          }

          this.switchProject();

          setTimeout(() => {
            this.switing = false;
          }, 500);
        }
      }
    },

    updateCurrentProject(direction) {
      switch (direction) {
        case 'up':
          if (this.currentProject === 0) {
            this.currentProject = this.projects.length - 1;
          } else {
            this.currentProject -= 1;
          }
          break;
        case 'down':
          if (this.currentProject === this.projects.length - 1) {
            this.currentProject = 0;
          } else {
            this.currentProject += 1;
          }
          break;
        default:
          console.error(`Undefined direction "${direction}" used.`);
          break;
      }
    },

    switchProject() {
      const timeline = new TimelineMax();
      timeline
        .fromTo(this.$refs.projects[this.currentProject].querySelector('.home__project-content'), 0.5, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.05)
    },

    goToProject(slug) {
      /*
      const timeline = new TimelineMax({
        onComplete: () => {
          this.$router.push({
            name: 'project',
            params: { slug: this.$store.state.content.projects[this.currentProject].slug }
          });
        }
      });

      const timeline = new TimelineMax()

      timeline
        .to(this.$refs.backgroundValue[this.currentProject].querySelector('.home__background-source'), 1.5, {
          scale: 1.5,
          ease: ease
        })
        .to(this.$refs.bars.querySelectorAll('.home__subbar--1'), 0.8, {
          scaleY: 0,
          ease: ease
        }, '-=1.5')
        .to(this.$refs.bars.querySelectorAll('.home__subbar--2'), 0.8, {
          scaleY: 0,
          ease: ease
        }, '-=1.35')
        .to(this.$refs.bars.querySelectorAll('.home__subbar--3'), 0.8, {
          scaleY: 0,
          ease: ease
        }, '-=1.2');
      this.$router.push({
        name: 'project',
        params: { slug: slug }
      });
      */
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
.home{
  width: 100vw;
  height: 100vh;
  position:relative;
  top:0;
  left:0;
  bottom:0;
  right: 0;
}
.home__project {
  position:absolute;
  top:25%;
  left:13%;
  width: 74vw;
  height: 50vh;
  z-index: -1;
}

.home__project--current {
  z-index:0;
}

.home__project-wrapper {
  position: absolute;
  display: flex;
  height: calc(100% + 16px);
  top:-16px;
  overflow: hidden;
}

.home__project-content {
  height: calc(100% - 16px);
  margin-top:16px;
  display: flex;
  transform: translateY(calc(100% + 16px));
}
.home__project-infos{
  width: 50%;
}

.home__project-info-title{
  font-family: $title-font;
  font-size:100px;
  line-height:120px;
  margin:40px 0;
}
.home__project-info-index{
  margin-top:-16px;
}

.home__project-info-type,
.home__project-info-job{
  color:$grey;
  margin: 12px 0;
}

.home__project-info-link{
  position: absolute;
  bottom: 0;
}

.home__project-illustration{
  width: 50%;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

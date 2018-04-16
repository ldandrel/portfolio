<template>
  <div class="home">
    <div class="home__projects-number">
      <div class="home__projects-number-wrapper">
        <div class="home__project-number" ref="projectNumber" v-for="(project, index) in projects" :key="index">
          <div class="home__project-number-wrapper">
            <div class="home__project-number-value" ref="indexValue">{{ (index + 1)|pad }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__illustrations" ref="illustrations">
      <div class="home__illustration" ref="illustrationValue" :class="{'home__illustration--current': currentProject === index, 'home__illustration--previous': previousProject === index}" v-for="(project, index) in projects" :key="index">
        <div class="home__illustration-wrapper">
          <div class="home__illustration-source">
            <img :src="project.illustration">
          </div>
        </div>
      </div>
    </div>

    <div class="home__titles home__titles--line1">
      <div class="home__titles-wrapper">
        <div class="home__titles-project" ref="title1Value" :class="{'home__titles-project--current': currentProject === index }" v-for="(title, index) in projectsTitle1" :key="index">
          <div class="home__titles-project-value">
            <div class="home__titles-part-wrapper" :class="{'home__titles-part-wrapper--descending': isDescending(part) === true, 'home__titles-part-wrapper--space': hasSpaces(part) === true }" v-for="(part, index) in title" :key="index">
              <div class="home__titles-part-value">{{ part }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__titles home__titles--line2">
      <div class="home__titles-wrapper">
        <div class="home__titles-project" ref="title2Value" :class="{'home__titles-project--current': currentProject === index }" v-for="(title, index) in projectsTitle2" :key="index">
          <div class="home__titles-project-value">
            <div class="home__titles-part-wrapper" :class="{'home__titles-part-wrapper--descending': isDescending(part) === true, 'home__titles-part-wrapper--space': hasSpaces(part) === true }" v-for="(part, index) in title" :key="index">
              <div class="home__titles-part-value">{{ part }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__details">
      <div class="home__details-content">
        <div class="home__details-type" ref="typeValue" v-for="(project, index) in projects" :key="index">
          <div class="home__details-type-wrapper">
            <div class="home__details-type-value">{{ project.type }}</div>
          </div>
        </div>
        <div class="home__details-job" ref="jobValue" v-for="(project, index) in projects" :key="index">
          <div class="home__details-job-wrapper">
            <div class="home__details-job-value">{{ project.job }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__links">
      <div class="home__links-wrapper">
        <div class="home__link" ref="linkProject">
          <div class="home__link-wrapper">
            <div class="link home__link-value" v-on:click="goToProject(currentProject)">see the case</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from 'gsap';
import { Lethargy } from 'lethargy';
import { ease } from '@/services/utils';
import PictureEffect from '@/services/PicturesEffect';

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

    projectsTitle1() {
      return this.$store.state.content.projects.map(project => project.title1.split('').map(part => `${part}`));
    },

    projectsTitle2() {
      return this.$store.state.content.projects.map(project => project.title2.split('').map(part => `${part}`));
    },

    websiteReady() {
      return this.$store.state.websiteReady;
    }
  },
  mounted() {
    console.log(PictureEffect)

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
      const timeline = new TimelineMax();

      timeline
        .staggerFromTo(this.$refs.title1Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.05)
        .staggerFromTo(this.$refs.title2Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.05, '-=0.7')
        .fromTo(this.$refs.illustrationValue[this.currentProject].querySelector('.home__illustration-source img'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=1')
        .fromTo(this.$refs.typeValue[this.currentProject].querySelector('.home__details-type-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=0.7')
        .fromTo(this.$refs.jobValue[this.currentProject].querySelector('.home__details-job-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=0.7')
        .fromTo(this.$refs.linkProject.querySelector('.home__link-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=0.7')
        .fromTo(this.$refs.projectNumber[this.currentProject].querySelector('.home__project-number-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=0.7');
    },

    isDescending(text) {
      const descendings = 'ypqgj';
      return descendings.indexOf(text) !== -1;
    },

    hasSpaces(text) {
      const space = ' ';
      return space.indexOf(text) !== -1;
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
        .staggerFromTo(this.$refs.title1Value[this.previousProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, 0.05)
        .staggerFromTo(this.$refs.title2Value[this.previousProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, 0.05, '-=0.7')
        .staggerFromTo(this.$refs.title1Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.05, '-=0.7')
        .staggerFromTo(this.$refs.title2Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.05, '-=0.7')
        .fromTo(this.$refs.illustrationValue[this.currentProject].querySelector('.home__illustration-source img'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=1.3')
        .fromTo(this.$refs.typeValue[this.previousProject].querySelector('.home__details-type-value'), 0.6, {
          y: '0%'
        }, {
          y: '-105%',
          ease: ease
        }, '-=1.3')
        .fromTo(this.$refs.typeValue[this.currentProject].querySelector('.home__details-type-value'), 0.6, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=1.3')
        .fromTo(this.$refs.jobValue[this.previousProject].querySelector('.home__details-job-value'), 0.6, {
          y: '0%'
        }, {
          y: '-105%',
          ease: ease
        }, '-=1.3')
        .fromTo(this.$refs.jobValue[this.currentProject].querySelector('.home__details-job-value'), 0.6, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=1.3')
        .fromTo(this.$refs.projectNumber[this.previousProject].querySelector('.home__project-number-value'), 0.8, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, '-=1.3')
        .fromTo(this.$refs.projectNumber[this.currentProject].querySelector('.home__project-number-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, '-=1.3');
    },

    goToProject(id) {
      const timeline = new TimelineMax({
        onComplete: () => {
          console.log(id)
        }
      });

      timeline
        .staggerFromTo(this.$refs.title1Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.8, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, -0.05)
        .staggerFromTo(this.$refs.title2Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.8, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, -0.05, '-= 0.8')
        .fromTo(this.$refs.illustrationValue[this.currentProject].querySelector('.home__illustration-source '), 0.8, {
          left: '50%',
          width: '50%'
        }, {
          left: '0%',
          width: '100%',
          ease: ease
        })
        .to(this.$refs.jobValue[this.currentProject].querySelector('.home__details-job-value'), 0.6, {
          x: '-100%',
          ease: ease
        }, '-=0.6')
        .to(this.$refs.typeValue[this.currentProject].querySelector('.home__details-type-value'), 0.6, {
          x: '-100%',
          ease: ease
        }, '-=0.6')
        .to(this.$refs.linkProject.querySelector('.home__link-value'), 0.6, {
          x: '-100%',
          ease: ease
        }, '-=0.6')
        .to(this.$refs.projectNumber[this.currentProject].querySelector('.home__project-number-value'), 0.6, {
          y: '-100%',
          ease: ease
        }, '-=0.6');
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
.home {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.home__projects-number{
  position: absolute;
  left:$vertical-line-2;
  top: $horizontal-line-1;
  z-index: $zindex-home-index;
}

.home__projects-number-wrapper{
  position:relative;
  width: 37vw;
}
.home__project-number {
  position: absolute;
  left: 0;
  bottom:-2px;
  text-align: left;
}

.home__project-number-wrapper{
  overflow: hidden;
}

.home__project-number-value {
  transform: translateY(100%);
  user-select: none;
  will-change: transform;
}

.home__illustrations {
  position: absolute;
  top: $horizontal-line-1;
  left: $vertical-line-2;
  width: $size-illustration;
  height: 50%;
  z-index: $zindex-home-illustrations;
  overflow: hidden;
  user-select: none;
}

.home__illustration {
  position: relative;
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

.home__illustration-wrapper,
.home__illustration-source {
  width: 100%;
  height: 100%;
}

.home__illustration-source {
  position: absolute;
  width: 50%;
  left: 50%;
  overflow: hidden;

  img {
    position: absolute;
    right: 0;
    height: 150%;
    width: 74vw;
    object-fit: cover;
    transform: translateY(100%);
    will-change: transform;
  }
}

.home__titles {
  position: absolute;
  left: $vertical-line-2;
  z-index: $zindex-home-title;

  &--line1 {
    top: calc(25% + 40px);
  }

  &--line2{
    top: calc(25% + 40px + 110px)
  }
}

.home__titles-wrapper {
  position: relative;
}

.home__titles-project {
  position: absolute;
}

.home__titles-project-value {
  display: flex;
  flex-direction: row;
}

.home__titles-part-wrapper {
  display: inline-block;
  overflow: hidden;
  height: 100px;

  &--descending {
    height: 110px;
  }

  &--space {
    width: 20px;
  }
}

.home__titles-part-value {
  font-family: $title-font;
  font-weight: bold;
  font-size: 100px;
  color: $white;
  transform: translateY(100%);
  user-select: none;
  will-change: transform;
}

.home__details{
  position: absolute;
  left:$vertical-line-2;
  bottom: calc(25% + 50px);
  z-index: $zindex-home-details;
}

.home__details-content {
  position: relative;
  height: 52px;
  width: 37vw;
}

.home__details-type,
.home__details-job {
  position: absolute;
  left: 0;
  text-align: right;
  color: $grey;
}

.home__details-job {
  bottom: 0;
}

.home__details-type {
  top:0;
}

.home__details-type-wrapper,
.home__details-job-wrapper {
  overflow: hidden;
}

.home__details-type-value,
.home__details-job-value {
  transform: translateY(100%);
  user-select: none;
  will-change: transform;
}

.home__links{
  position: absolute;
  left:$vertical-line-2;
  bottom: $horizontal-line-1;
  z-index: $zindex-home-links;
}

.home__links-wrapper{
  position:relative;
  width: 37vw;
}
.home__link{
  position: absolute;
  left: 0;
  bottom: -2px;
  text-align: right;
  color: $grey;
}

.home__link-wrapper{
  overflow: hidden;
}

.home__link-value {
  transform: translateY(100%);
  user-select: none;
  will-change: transform;
  z-index: $zindex-home-links;
}
</style>

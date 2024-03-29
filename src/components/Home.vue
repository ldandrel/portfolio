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

    <div class="home__progress" ref="progress">
      <div class="home__progress-wrapper">
        <div class="home__progress-number" :class="{'home__progress-number--is-active': currentProject === index}" v-for="(project, index) in projects" :key="index">
          <div class="home__progress-number-wrapper">
            <div class="home__progress-number-value" v-on:click="updateCurrentProject(index)" ref="indexValue">{{ (index + 1)|pad }}</div>
          </div>
        </div>
        <div class="home__progress-bar" ref="progressBar" :style="{ transform: `translateY(${(this.currentProject * 2) * 16}px)`}"></div>
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
        <div class="home__details-type">
          <div class="home__details-type-wrapper" ref="typeValue" v-for="(project, index) in projects" :key="index">
            <div class="home__details-type-value">{{ project.type }}</div>
          </div>
        </div>
        <div class="home__details-job">
          <div class="home__details-job-wrapper" ref="jobValue" v-for="(project, index) in projects" :key="index">
            <div class="home__details-job-value">{{ project.job }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="home__links">
      <div class="home__links-wrapper">
        <div class="home__link" ref="linkProject">
          <div class="home__link-wrapper" :class="{ 'link--hover': hover }">
            <router-link class="link home__link-value" :to="{ name: 'Project', params: { slug: $store.state.content.projects[currentProject].slug }}" tag="div">see the case</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="home__project-hover" v-on:click="$router.push({ name: 'Project', params: { slug: $store.state.content.projects[currentProject].slug }}) " v-on:mouseover="hover = true" v-on:mouseleave="hover = false"></div>
  </div>
</template>

<script>
import { TimelineMax } from 'gsap';
import { Lethargy } from 'lethargy';
import { ease } from '@/services/utils';
import { RETURN_HOME, GO_PROJECT, GO_ABOUT, CURRENT_PROJECT, PREVIOUS_PROJECT } from '@/store/types';

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
      keydownHandler: null,
      hover: false
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
    },

    returnHome() {
      return this.$store.state.returnHome;
    },

    goAbout() {
      return this.$store.state.goAbout;
    },

    currentProjectInStore() {
      return this.$store.state.currentProject;
    }
  },
  mounted() {
    this.currentProject = this.currentProjectInStore;

    this.wheelHandler = event => {
      this.onMouseWheel(event);
    };

    this.keydownHandler = event => {
      this.onKeydown(event);
    };

    if (this.websiteReady === true) {
      this.enterAnimation();
    }

    if (this.returnHome === true) {
      this.enterAnimation();
      this.$store.commit(RETURN_HOME, false);
    }

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
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'About') {
      this.$store.commit(GO_ABOUT, true);
      this.exitAnimation(next)
    } else if (to.name === 'Project') {
      this.$store.commit(GO_PROJECT, true);
      this.goToProject(next)
    }
  },
  methods: {
    onHover() {
      this.hover = !this.hover
    },
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
        .to(this.$refs.progress, 0.4, {
          opacity: '1',
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

    exitAnimation(next) {
      const timeline = new TimelineMax({
        onComplete: () => {
          next()
        }
      });

      timeline
        .fromTo(this.$refs.projectNumber[this.currentProject].querySelector('.home__project-number-value'), 0.5, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        })
        .staggerFromTo(this.$refs.title1Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.6, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, -0.05, '-=0.8')
        .staggerFromTo(this.$refs.title2Value[this.currentProject].querySelectorAll('.home__titles-part-value'), 0.6, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, -0.05, '-=0.8')
        .fromTo(this.$refs.typeValue[this.currentProject].querySelector('.home__details-type-value'), 0.5, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, '-=0.8')
        .fromTo(this.$refs.jobValue[this.currentProject].querySelector('.home__details-job-value'), 0.5, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, '-=0.8')
        .fromTo(this.$refs.linkProject.querySelector('.home__link-value'), 0.6, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, '-=0.8');
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
          this.$store.commit(PREVIOUS_PROJECT, this.previousProject);

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
          }, 1500);
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
          this.$store.commit(PREVIOUS_PROJECT, this.previousProject);

          if (check === -1) {
            this.updateCurrentProject('down');
          } else {
            this.updateCurrentProject('up');
          }

          this.switchProject();

          setTimeout(() => {
            this.switing = false;
          }, 1500);
        }
      }
    },

    updateCurrentProject(direction) {
      if (typeof direction === 'string') {
        switch (direction) {
          case 'up':
            if (this.currentProject === 0) {
              this.currentProject = this.projects.length - 1;
            } else {
              this.currentProject -= 1;
            }
            this.$store.commit(CURRENT_PROJECT, this.currentProject);
            break;
          case 'down':

            if (this.currentProject === this.projects.length - 1) {
              this.currentProject = 0;
            } else {
              this.currentProject += 1;
            }
            this.$store.commit(CURRENT_PROJECT, this.currentProject);
            break;
          default:
            console.error(`Undefined direction "${direction}" used.`);
            break;
        }
      } else if (this.switing === false) {
        this.$store.commit(PREVIOUS_PROJECT, this.currentProject);
        this.switing = true
        this.previousProject = this.currentProject;
        this.currentProject = direction
        this.$store.commit(CURRENT_PROJECT, this.currentProject);
        this.switchProject();

        setTimeout(() => {
          this.switing = false;
        }, 1500);
      }
    },

    switchProject() {
      const timeline = new TimelineMax();

      timeline
        .to(this.$refs.progressBar, 0.7, {
          y: `${(this.currentProject * 2) * 16}px`,
          ease: ease
        })
        .staggerFromTo(this.$refs.title1Value[this.previousProject].querySelectorAll('.home__titles-part-value'), 0.7, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, 0.05, '-=0.7')
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

    goToProject(next) {
      const timeline = new TimelineMax({
        onComplete: () => {
          next()
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
        .to(this.$refs.jobValue[this.currentProject].querySelector('.home__details-job-value'), 0.6, {
          x: '-100%',
          ease: ease
        }, '-=0.6')
        .to(this.$refs.typeValue[this.currentProject].querySelector('.home__details-type-value'), 0.6, {
          x: '-100%',
          ease: ease
        }, '-=0.6')
        .to(this.$refs.linkProject.querySelector('.home__link-value'), 0.6, {
          x: '-105%',
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
  z-index: 1;
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

.home__progress {
  position: absolute;
  right: $vertical-line-1;
  top:$horizontal-line-1;
  height: 50vh;
  display:flex;
  align-items: center;
  width: 26px;
  opacity:0;
}

.home__progress-wrapper {
  position: relative;
  width: 100%;
}

.home__progress-number {
  padding:8px 0;
  line-height: 1;
  color:$grey;
  cursor:pointer;

  &--is-active{
    color:$white;
  }
}

.home__progress-bar {
  position:absolute;
  right: 0;
  top:4px;
  height: 24px;
  width: 1px;
  background-color:$white;
  will-change: transform;
}

.home__titles {
  position: absolute;
  left: $vertical-line-2;
  z-index: $zindex-home-title;
  transform: translateX(-6px);

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

  @include responsive($lg) {
    font-size: 85px;
  }

  @include responsive($height) {
    font-size: 85px;
  }
}

.home__details{
  position: absolute;
  left:$vertical-line-2;
  bottom: calc(25% + 90px);
  z-index: $zindex-home-details;

  @include responsive($height) {
    bottom: calc(25% + 50px);
  }
}

.home__details-content {
  position: relative;
  height: 52px;
  width: 37vw;
}

.home__details-type-wrapper,
.home__details-job-wrapper {
  overflow: hidden;
  position: absolute;
  left: 0;
  text-align: right;
  color: $grey;
}

.home__details-job-wrapper {
  bottom: 0;
}

.home__details-type-wrapper {
  top:0;
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

.home__project-hover {
  position: absolute;
  top: 25vh;
  left: 13vw;
  z-index: 5;
  width: 74vw;
  height: 50vh;
  cursor:pointer;
}
</style>

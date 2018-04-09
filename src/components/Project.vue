<template>
  <div class="project">
    <div class="project__head">
      <div class="project__picture-wrapper" ref="projectPicture">
        <div class="project__picture">
          <img :src="project.illustration">
        </div>
      </div>
      <div class="project__intro">
        <div class="project__intro-content">
          <div class="project__intro-left">
            <h1 class="project__intro-title">
              {{ project.title }}
            </h1>
          </div>
          <div class="project__intro-right">
              <span class="project__intro-type">{{ project.type }}</span>
              <span class="project__intro-job">{{ project.job }}</span>
              <span class="project__intro-date">{{ project.date }}</span>
              <a class="link" :href="project.url">see the website</a>
          </div>
        </div>
      </div>
    </div>
    <div class="project__section">
      <div class="project__paragraph">
        <p>{{project.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';
import { TweenMax } from 'gsap';

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
      observer: null
    }
  },
  computed: {
    project() {
      return this.$store.state.content.projects.find(project => project.slug === this.slug);
    }
  },
  beforeMount() {
    const existingProject = this.$store.state.content.projects.find(project => project.slug === this.slug);

    if (existingProject === undefined) {
      this.$router.push({ name: 'home' });
    }
  },
  mounted() {
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

      TweenMax.to(this.$refs.projectPicture, 0.4, {
        height: `${percentage}%`
      });
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
  width: 100vw;
  height: 100vh;
  pointer-events: all;
}

.project__picture-wrapper{
  position: absolute;
  top:25%;
  left: 13%;
  width: 74%;
  height: 50%;
  will-change: transform;
  overflow: hidden;
}

.project__picture img{
    width: 100%;
    height: auto;
}

.project__intro {
  position: absolute;
  width:100%;
  top:calc(75% + 50px);
}

.project__intro-content {
  position:sticky;
  top:25%;
  left:13%;
  width: 74%;
  display: flex;
  align-items: flex-end;
}

.project__intro-left,
.project__intro-right {
  width: 50%;
}

.project__intro-title {
  font-family: $title-font;
  font-size:70px;
  transform: translateX(-6px);
}
.project__intro-right {
  color:$grey;
  display: flex;
  justify-content: space-between;

  span{
    margin: 0 12px;
  }
}

.project__section {
  position: relative;
}

</style>

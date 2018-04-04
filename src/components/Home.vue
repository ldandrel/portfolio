<template>
  <div class="home">
    <div class="home__project" v-for="(project, index) in projects" :key="index">
      <div class="home__project-wrapper">
        <div class="home__project-content" ref="project">
          <div class="home__project-infos">
            <div class="home__project-info-index">{{ project.index|pad }}</div>
            <div class="home__project-info-title">{{ project.title }}</div>
            <div class="home__project-info-type">{{ project.type }}</div>
            <div class="home__project-info-job">{{ project.job }}</div>
            <div class="home__project-info-link">
              <a class="link" href="#">see the case</a>
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
import { TweenMax } from 'gsap';
import { ease } from '@/services/utils';

export default {
  name: 'Home',
  computed: {
    projects() {
      return this.$store.state.content.projects;
    },
    websiteReady() {
      return this.$store.state.websiteReady;
    }
  },
  methods: {
    enterAnimation() {
      TweenMax.to(this.$refs.project, 0.5, {
        y: '0%',
        ease: ease,
        delay: 0.7
      });
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
.home__project{
  position:absolute;
  top:25%;
  left:13%;
  width: 74vw;
  height: 50vh;
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

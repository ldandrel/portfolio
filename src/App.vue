<template>
  <div id="app">
    <responsive v-if="isMobile === true"></responsive>
    <div v-else>
      <background></background>
      <progress-loader></progress-loader>
      <global-header></global-header>

      <router-view/>

      <div class="scroll-fill" v-if="$route.name !== 'about'">
        <div class="scroll-fill-1">scroll</div>
        <div class="scroll-fill-line"></div>
        <div class="scroll-fill-2">down</div>
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

.scroll-fill{
  position:fixed;
  bottom: 20px;
  color:$grey;
  height: 27px;
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: center;

  div:nth-child(odd){
    margin: 0 12px;
  }

  .scroll-fill-line{
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
}
</style>

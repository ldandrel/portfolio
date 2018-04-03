<template>
  <div id="app">
    <canvas id="js-background-noise" ref="backgroundCanvas" class="noise"></canvas>

    <div class="background-grid">
      <div class="background-grid-vertical">
        <div class="background-line background-line-vertical background-line-vertical-1" ref="lineVertical1"></div>
        <div class="background-line background-line-vertical background-line-vertical-2" ref="lineVertical2"></div>
        <div class="background-line background-line-vertical background-line-vertical-3" ref="lineVertical3"></div>
        <div class="background-line background-line-vertical background-line-vertical-4" ref="lineVertical4"></div>
        <div class="background-line background-line-vertical background-line-vertical-5" ref="lineVertical5"></div>
      </div>
      <div class="background-grid-horizontal">
        <div class="background-line background-line-horizontal background-line-horizontal-1" ref="lineHorizontal1"></div>
        <div class="background-line background-line-horizontal background-line-horizontal-2" ref="lineHorizontal2"></div>
      </div>
    </div>

    <progress-loader></progress-loader>

    <global-header></global-header>
    <router-view/>

    <div class="scroll-fill">
      <div class="scroll-fill-1">scroll</div>
      <div class="scroll-fill-line"></div>
      <div class="scroll-fill-2">down</div>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from 'gsap';
import GlobalHeader from '@/components/Header';
import ProgressLoader from '@/components/ProgressLoader';
import { LOAD_ASSETS } from '@/store/types';
import { ease } from '@/services/utils';

export default {
  name: 'App',
  components: {
    GlobalHeader,
    ProgressLoader
  },
  data () {
    return {
      backgroundCanvas: this.$refs.backgroundCanvas,
      backgroundToggle: true
    }
  },
  computed: {
    websiteReady() {
      return this.$store.state.websiteReady;
    }
  },
  methods: {
    noise () {
      let ctx = this.$refs.backgroundCanvas.getContext('2d')
      let w = ctx.canvas.width
      let h = ctx.canvas.height
      let idata = ctx.createImageData(w, h)
      let buffer32 = new Uint32Array(idata.data.buffer)
      let len = buffer32.length
      let i = 0

      for (; i < len;) {
        buffer32[i++] = ((255 * Math.random()) | 0) << 24
      }

      ctx.putImageData(idata, 0, 0)
    },
    loop () {
      this.backgroundToggle = !this.backgroundToggle
      if (this.backgroundToggle) {
        requestAnimationFrame(this.loop)
        return
      }
      this.noise()
      requestAnimationFrame(this.loop)
    },
    enterAnimation() {
      const timeline = new TimelineMax();

      timeline
        .to(this.$refs.lineVertical1, 1, {
          scaleY: 1,
          ease: ease
        })
        .to(this.$refs.lineVertical2, 1, {
          scaleY: 1,
          ease: ease
        }, '-=1')
        .to(this.$refs.lineVertical3, 1, {
          scaleY: 1,
          ease: ease
        }, '-=1')
        .to(this.$refs.lineVertical4, 1, {
          scaleY: 1,
          ease: ease
        }, '-=1')
        .to(this.$refs.lineVertical5, 1, {
          scaleY: 1,
          ease: ease
        }, '-=1')
        .to(this.$refs.lineHorizontal1, 1, {
          scaleX: 1,
          ease: ease
        }, '-=1')
        .to(this.$refs.lineHorizontal2, 1, {
          scaleX: 1,
          ease: ease
        }, '-=1')
    }
  },
  mounted () {
    this.$store.dispatch(LOAD_ASSETS);

    if (this.websiteReady === true) {
      console.log('ready')
    }

    let _this = this
    let resizeCanvas = (() => {
      _this.$refs.backgroundCanvas.width = window.innerWidth
      _this.$refs.backgroundCanvas.height = window.innerHeight
    })()
    window.onresize = resizeCanvas
    this.loop()
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

<style lang="scss">
@import "./assets/scss/app.scss";

#js-background-noise {
    position:fixed;
    background:#222224;
    width: 100vw;
    height: 100vh;
}

.background-grid {
  position: fixed;
  width: 100vw;
  height: 100vh;

  .background-grid-vertical, .background-grid-horizontal {
    width: 100%;
    height: 100%;
  }

  .background-line {
    background-color: $background-line;
    position: fixed;
  }
  .background-line-vertical{
    height: 100vh;
    width: 1px;
    transform:scaleY(0);
    transform-origin: top;
  }
  .background-line-horizontal{
    width: 100vw;
    height: 1px;
    transform:scaleX(0);
    transform-origin: left;
  }

  .background-line-vertical-1 {
    left:7%;
  }

  .background-line-vertical-2 {
    left:13%;
  }

  .background-line-vertical-3 {
    left:50%;
  }

  .background-line-vertical-4 {
    right:13%;
  }

  .background-line-vertical-5 {
    right:7%;
  }

  .background-line-horizontal-1 {
    top:25%;
  }

  .background-line-horizontal-2 {
    bottom:25%;
  }
}

.scroll-fill{
  position:fixed;
  bottom: 20px;
  color:$grey;
  height: 27px;
  display: flex;
  align-items: center;
  width: 100vw;
  justify-content: center;
  opacity: 0;

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

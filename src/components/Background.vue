<template>
    <div class="background">
        <canvas id="js-background-noise" ref="backgroundCanvas" class="noise"></canvas>

        <div class="background-grid">
            <div class="background-grid-vertical" ref="linesVertical">
                <div class="background-line background-line-vertical background-line-vertical-1"></div>
                <div class="background-line background-line-vertical background-line-vertical-2"></div>
                <div class="background-line background-line-vertical background-line-vertical-3"></div>
                <div class="background-line background-line-vertical background-line-vertical-4"></div>
                <div class="background-line background-line-vertical background-line-vertical-5"></div>
            </div>
            <div class="background-grid-horizontal" ref="linesHorizontal">
                <div class="background-line background-line-horizontal background-line-horizontal-1"></div>
                <div class="background-line background-line-horizontal background-line-horizontal-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { LOAD_ASSETS } from '@/store/types';
import { ease } from '@/services/utils';
import { TimelineMax } from 'gsap';

export default {
  name: 'Background',
  data () {
    return {
      backgroundToggle: true
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
        .to(this.$refs.linesVertical.querySelectorAll('.background-line-vertical'), 1, {
          scaleY: 1,
          ease: ease
        })
        .to(this.$refs.linesHorizontal.querySelectorAll('.background-line-horizontal'), 1, {
          scaleX: 1,
          ease: ease
        }, '-=1')
    }
  },
  computed: {
    websiteReady() {
      return this.$store.state.websiteReady;
    }
  },
  mounted () {
    this.$store.dispatch(LOAD_ASSETS);

    if (this.websiteReady === true) {
      this.enterAnimation();
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

<style lang="scss" scoped>
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

  .background-grid-vertical,
  .background-grid-horizontal {
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
</style>

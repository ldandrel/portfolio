<template>
  <div id="app">
    <canvas id="js-background-noise" ref="backgroundCanvas" class="noise"></canvas>

    <div class="background-grid">
      <div class="background-grid-vertical">
        <div class="background-line background-line-vertical background-line-vertical-1"></div>
        <div class="background-line background-line-vertical background-line-vertical-2"></div>
        <div class="background-line background-line-vertical background-line-vertical-3"></div>
        <div class="background-line background-line-vertical background-line-vertical-4"></div>
        <div class="background-line background-line-vertical background-line-vertical-5"></div>
      </div>
      <div class="background-grid-horizontal">
        <div class="background-line background-line-horizontal background-line-horizontal-1"></div>
        <div class="background-line background-line-horizontal background-line-horizontal-2"></div>
      </div>
    </div>

    <div class="header">
      <div class="header-logo">
        <router-link tag="a" to="/">Luc <br> Dandrel</router-link>
      </div>
      <div class="header-about">
        <router-link tag="a" to="/">About</router-link>
      </div>
    </div>

    <router-view/>

    <div class="scroll-fill">
      <div class="scroll-fill-1">scroll</div>
      <div class="scroll-fill-line"></div>
      <div class="scroll-fill-2">down</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      backgroundCanvas: this.$refs.backgroundCanvas,
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
    }
  },
  mounted () {
    let _this = this
    let resizeCanvas = (() => {
      _this.$refs.backgroundCanvas.width = window.innerWidth
      _this.$refs.backgroundCanvas.height = window.innerHeight
    })()
    window.onresize = resizeCanvas
    this.loop()
  }
}
</script>

<style lang="scss">
@import './styles/font.scss';
@import './styles/variables.scss';
@import './styles/normalize.scss';
@import './styles/base.scss';

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
  }
  .background-line-horizontal{
    width: 100vw;
    height: 1px;
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

.header{
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: fixed;
  top:32px;
  a{
      color:$white;
      font-family: $title-font;
      position:relative;
      &:before{
        content:"";
        width: 1px;
        height: calc(100% + 1px);
        background-color:$white;
        position:absolute;
        will-change: transform;
      }
      &:hover{
        &:before{
            animation: scroll-fill 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
      }
    }

  .header-logo{
    margin-left:7%;
    a{
      left:10px;
      &::before{
        left:-10px;
      }
    }
  }

  .header-about{
    margin-right: 7%;
    a{
      right:10px;
      &::before{
        right:-10px;
      }
    }
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

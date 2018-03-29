<template>
  <div class="home">
    <canvas id="js-background-noise" ref="backgroundCanvas" class="noise"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Home',
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

<style lang="scss" scoped>
#js-background-noise {
    position:fixed;
    background:#191919;
}
</style>

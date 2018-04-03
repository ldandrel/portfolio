<template>
  <div class="progress-loader" ref="progressLoader">
    <div class="progress-loader__percentage">
      <div class="progress-loader__percentage-wrapper">
        <div class="progress-loader__percentage-value" ref="percentageValue">{{ formattedProgressPercentage }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineMax, Power4 } from 'gsap';

export default {
  name: 'ProgressLoader',
  computed: {
    formattedProgressPercentage() {
      return `${this.$store.state.assetsLoadingProgress}%`;
    },
    progressFinished() {
      return this.$store.state.assetsLoaded;
    }
  },
  watch: {
    progressFinished(value) {
      if (value === true) {
        this.progressFinishedAnimation();
      }
    }
  },
  methods: {
    progressFinishedAnimation() {
      const progressLoader = this.$refs.progressLoader;

      const timeline = new TimelineMax({
        onComplete() {
          TweenMax.set(progressLoader, {
            css: {
              'pointer-events': 'none'
            }
          });
        }
      });

      timeline
        .to(this.$refs.percentageValue, 1.2, {
          y: '-100%',
          ease: Power4.easeOut,
          delay: 1.0
        })
      ;
    }
  }
}
</script>

<style lang="scss" scoped>
.progress-loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: $zindex-progress-loader;
}

.progress-loader__percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress-loader__percentage-wrapper {
  overflow: hidden;
  padding-bottom: 5px;
}

.progress-loader__percentage-value {
  color: $white;
  font-size: 100px;
  font-family: $title-font;
}

</style>

<template>
    <div class="background">
        <div class="background-grid">
            <div class="background-grid-vertical" ref="linesVertical">
                <div class="background-line background-line-vertical background-line-vertical-1"></div>
                <div class="background-line background-line-vertical background-line-vertical-2"></div>
                <div class="background-line background-line-vertical background-line-vertical-3"></div>
                <div class="background-line background-line-vertical background-line-vertical-4"></div>
                <div class="background-line background-line-vertical background-line-vertical-5"></div>
                <div v-if="$route.name == 'Project'" class="background-line background-line--white background-line-vertical-2"></div>
                <div v-if="$route.name == 'Project'" class="background-line background-line--white background-line-vertical-4"></div>

            </div>
            <div class="background-grid-horizontal" ref="linesHorizontal">
                <div class="background-line background-line-horizontal background-line-horizontal-1"></div>
                <div class="background-line background-line-horizontal background-line-horizontal-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { ease } from '@/services/utils';
import { TweenMax, TimelineMax } from 'gsap';

export default {
  name: 'Background',
  data () {
    return {
      backgroundToggle: true,
      currentScroll: 0,
      documentHeight: 0
    }
  },
  methods: {
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
    },
    handleScroll() {
      if (this.$route.name === 'Project' && this.websiteReady) {
        TweenMax.set(this.$refs.linesVertical.querySelectorAll('.background-line--white'), {
          scaleY: Math.abs(window.scrollY / ((window.innerHeight / 2) - window.innerHeight)),
          yoyo: true,
          ease: ease
        });
      }
    },
    enterInProject() {
      if (this.$route.name === 'Project') {
        TweenMax.to(this.$refs.linesVertical.querySelectorAll('.background-line--white'), 1, {
          scaleY: Math.abs(window.scrollY / ((window.innerHeight / 2) - window.innerHeight)),
          ease: ease,
          delay: 0.2
        });
      }
    },
    exitProject() {
      TweenMax.to(this.$refs.linesVertical.querySelectorAll('.background-line--white'), 1, {
        scaleY: 0,
        ease: ease
      });
    }
  },
  computed: {
    websiteReady() {
      return this.$store.state.websiteReady;
    },
    returnHome() {
      return this.$store.state.returnHome;
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);

    if (this.websiteReady === true) {
      this.enterAnimation();
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        this.enterAnimation();
        this.enterInProject();
      }
    },
    returnHome(boolean) {
      if (boolean === true && this.$route.name === 'Project') {
        this.exitProject();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.background-grid {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background:$background;

  .background-grid-vertical,
  .background-grid-horizontal {
    width: 100%;
    height: 100%;
  }

  .background-line {
    background-color: $background-line;
    position: fixed;

    &--white {
      background-color: $white;
      height: 100vh;
      width: 1px;
      transform:scaleY(0);
      transform-origin: top;
      will-change: transform;
    }
  }
  .background-line-vertical{
    height: 100vh;
    width: 1px;
    transform:scaleY(0);
    transform-origin: top;
    will-change: transform;
  }
  .background-line-horizontal{
    width: 100vw;
    height: 1px;
    transform:scaleX(0);
    transform-origin: left;
    will-change: transform;

  }

  .background-line-vertical-1 {
    left:$vertical-line-1;
  }

  .background-line-vertical-2 {
    left:$vertical-line-2;
  }

  .background-line-vertical-3 {
    left:$vertical-line-3;
  }

  .background-line-vertical-4 {
    right:$vertical-line-2;
  }

  .background-line-vertical-5 {
    right:$vertical-line-1;
  }

  .background-line-horizontal-1 {
    top:$horizontal-line-1;
  }

  .background-line-horizontal-2 {
    bottom:$horizontal-line-1;
  }
}
</style>

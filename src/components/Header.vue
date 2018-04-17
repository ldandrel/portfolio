<template>
    <div class="header">
        <div class="header-wrapper" ref="header">
          <div class="header-logo">
              <router-link tag="a" to="/">Luc <br> Dandrel</router-link>
          </div>
          <div class="header__return">
            <div class="header__return-wrapper">
              <div ref="return" class="link header__return-value" v-on:click="goHome">return home</div>
            </div>
          </div>
          <div class="header-about">
              <a v-on:click="goAbout">About</a>
          </div>
        </div>
    </div>
</template>

<script>
import { TweenMax } from 'gsap';
import { easeDefault } from '@/services/utils';
import { RETURN_HOME, GO_ABOUT } from '@/store/types';

export default {
  name: 'Header',
  methods: {
    enterAnimation() {
      TweenMax.to(this.$refs.header, 0.25, {
        y: '0%',
        ease: easeDefault,
        delay: 0.7
      });

      if (this.$route.name !== 'Home') {
        TweenMax.to(this.$refs.return, 0.25, {
          y: '0%',
          ease: easeDefault,
          delay: 0.7
        });
      }
    },
    goHome() {
      this.$store.commit(RETURN_HOME, true);
    },

    goAbout() {
      if (this.$route.name !== 'About') {
        this.$store.commit(GO_ABOUT, true);
        TweenMax.to(this.$refs.return, 0.6, {
          y: '0%',
          ease: easeDefault,
          delay: 1.5
        });
      }
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        this.enterAnimation();
      }
    },
    returnHome(boolean) {
      if (boolean === true) {
        TweenMax.to(this.$refs.return, 0.6, {
          y: '-100%',
          ease: easeDefault,
          delay: 0.2
        });
      }
    }
  },
  computed: {
    websiteReady() {
      return this.$store.state.websiteReady;
    },
    returnHome() {
      return this.$store.state.returnHome;
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100vw;
  position: fixed;
  top:32px;
  overflow: hidden;
  z-index: $zindex-header;
  .header-wrapper{
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    transform: translateY(100%);
  }
  .header-logo a, .header-about a{
    font-family: $title-font;
    position:relative;
    color:$white;
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

.header__return-wrapper{
  overflow: hidden;
}

.header__return-value {
  transform: translateY(100%);
  will-change: transform;
}
</style>

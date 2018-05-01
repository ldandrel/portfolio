<template>
    <div class="header">
        <div class="header-wrapper" ref="header">
          <div class="header-logo">
              <router-link to="/" tag="div">Luc <br> Dandrel</router-link>
          </div>
          <div class="header__return">
            <div class="header__return-wrapper">
              <router-link to="/" tag="div" class="link header__return-value">return home</router-link>
            </div>
          </div>
          <div class="header-about">
              <router-link :to="{name : 'About'}" tag="div">About</router-link>
          </div>
        </div>
    </div>
</template>

<script>
import { TweenMax } from 'gsap';
import { easeDefault } from '@/services/utils';

export default {
  name: 'Header',
  methods: {
    enterAnimation() {
      TweenMax.to(this.$refs.header, 0.25, {
        y: '0%',
        ease: easeDefault,
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
  },
  computed: {
    websiteReady() {
      return this.$store.state.websiteReady;
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
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
  .header-logo div, .header-about div{
    font-family: $title-font;
    position:relative;
    color:$white;
    cursor:pointer;
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
    div{
      left:10px;
      &::before{
        left:-10px;
      }
    }
  }

  .header-about{
    margin-right: 7%;
    div{
      right:10px;
      &::before{
        right:-10px;
      }
    }
  }
}

.header__return-wrapper{
  overflow: hidden;

  .header__return-value:not(.router-link-exact-active) {
    transform: translateY(0%);
  }
}

.header__return-value {
  transform: translateY(100%);
  will-change: transform;
  transition: transform 0.5s $easing;
  cursor:pointer;
}

</style>

<template>
    <div class="header">
        <div class="header-logo">
            <router-link tag="a" to="/">Luc <br> Dandrel</router-link>
        </div>
        <div class="header-return">
            <router-link tag="a" to="/">return home</router-link>
        </div>
        <div class="header-about">
            <router-link tag="a" to="/">About</router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.header{
  width: 100vw;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: fixed;
  top:32px;
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

  .header-return a{
    color:$white;
    position:relative;
    margin-left:-12px;
    &::after{
      content:"";
      width: 20px;
      height: 1px;
      position: absolute;
      background-color:$white;
      bottom:2px;
      margin-left:12px;
      transform-origin: right;
      will-change: transform;
    }
  }

  .header-return:hover{
      a::after{
        transform: scaleX(6);
        transition: all 1s ease;
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
</style>

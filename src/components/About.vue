<template>
  <div class="about">
    <div class="about__subhead">
      <div class="about__subhead-content">
        <div class="about__subhead-wrapper">
          <div class="about__subhead-value" ref="subhead">{{ about.subhead }}</div>
        </div>
      </div>
    </div>

    <div class="about__head">
      <div class="about__head-content" ref="head">
        <div class="about__head-wrapper" :class="{'about__head-wrapper--descending': isDescending(part) === true, 'about__head-wrapper--space': hasSpaces(part) === true }" v-for="(part, index) in head" :key="index">
          <div class="about__head-value">{{ part }}</div>
        </div>
      </div>
    </div>

    <div class="about__email">
      <div class="about__email-content">
        <div class="about__email-wrapper">
          <div class="about__email-value" ref="email">
             <a class="link" :href="mail">{{ about.contact.email }}</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { TimelineMax } from 'gsap';
import { ease } from '@/services/utils'

export default {
  name: 'About',
  computed: {
    about() {
      return this.$store.state.content.about;
    },
    mail() {
      return `mailto:${this.$store.state.content.about.contact.email}`;
    },
    head() {
      return this.$store.state.content.about.head.split('').map(part => `${part}`);
    },
    websiteReady() {
      return this.$store.state.websiteReady;
    }
  },
  methods: {
    isDescending(text) {
      const descendings = 'ypqgj';
      return descendings.indexOf(text) !== -1;
    },

    hasSpaces(text) {
      const space = ' ';
      return space.indexOf(text) !== -1;
    },

    enterAnimation() {
      const timeline = new TimelineMax();

      timeline
        .to(this.$refs.subhead, 0.8, {
          y: '0%',
          ease: ease
        })
        .staggerFromTo(this.$refs.head.querySelectorAll('.about__head-value'), 0.7, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.05, '-=0.8')
        .to(this.$refs.email, 0.8, {
          y: '0%',
          ease: ease
        }, '-=0.8')
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        setTimeout(() => {
          this.enterAnimation();
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
}

.about__subhead {
  position: absolute;
  left: $vertical-line-2;
  top: $horizontal-line-1;
}

.about__subhead-content {
  position: relative;
  top: -16px;
}

.about__subhead-wrapper {
  overflow: hidden;
}

.about__subhead-value {
  will-change: transform;
  transform: translateY(100%);
}

.about__head {
  position: absolute;
  left: $vertical-line-2;
  top: calc(25% + 40px);;
}

.about__head-content {
  position: relative;
  display: flex;
  flex-direction: row;
  transform: translateX(-6px);
}

.about__head-wrapper {
  overflow: hidden;
  &--descending {
    height: 110px;
  }

  &--space {
    width: 20px;
  }
}

.about__head-value {
  font-family: $title-font;
  will-change: transform;
  font-size:100px;
  transform: translateY(100%);
}

.about__email {
  position: absolute;
  left: $vertical-line-2;
  bottom: $horizontal-line-1;
}

.about__email-content {
  position: relative;
  top:1px;
}

.about__email-wrapper {
  overflow: hidden;
}

.about__email-value {
  will-change: transform;
  transform: translateY(100%);
}
</style>

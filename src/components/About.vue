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

    <div class="about__socials">
      <div class="about__socials-content" ref="socials">
        <div class="about__social-wrapper" :key="index" v-for="(social, index) in about.socials">
          <div class="about__social-value">
              <a :href="social.link" :title="social.title"><i :class="'fab ' + social.icon"></i></a>
          </div>
        </div>
      </div>
    </div>

    <div class="about__descriptions">
      <div class="about__descriptions-content" ref="descriptions">
        <div class="about__description-wrapper">
          <div class="about__description-value">
              <p>{{ about.description }}</p>
          </div>
        </div>
        <div class="about__description-wrapper">
          <div class="about__description-value">
              <p>{{ about.description2 }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="about__credit">
      <div class="about__credit-content">
        <div class="about__credit-wrapper">
          <div class="about__credit-value" ref="credit">
            <p>{{ about.credits.text }} <a class="link" :href="about.credits.evie.link" target="_blank">{{ about.credits.evie.title }}</a> {{ about.credits.text2 }} </p>
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
    },
    returnHome() {
      return this.$store.state.returnHome;
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
        .staggerFromTo(this.$refs.socials.querySelectorAll('.about__social-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.1, '-=0.8')
        .staggerFromTo(this.$refs.descriptions.querySelectorAll('.about__description-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.4, '-=0.8')
        .to(this.$refs.email, 0.8, {
          y: '0%',
          ease: ease
        }, '-=0.7')
        .to(this.$refs.credit, 1, {
          y: '0%',
          ease: ease
        }, '-=0.7');
    },

    exitAnimation() {
      const timeline = new TimelineMax({
        onComplete: () => {
          this.$router.push({ name: 'Home' })
        }
      });

      timeline
        .to(this.$refs.subhead, 0.7, {
          y: '-100%',
          ease: ease
        })
        .staggerFromTo(this.$refs.head.querySelectorAll('.about__head-value'), 0.7, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, -0.05, '-=0.8')
        .staggerFromTo(this.$refs.socials.querySelectorAll('.about__social-value'), 0.7, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, -0.1, '-=0.8')
        .staggerFromTo(this.$refs.descriptions.querySelectorAll('.about__description-value'), 0.7, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, 0.4, '-=0.8')
        .to(this.$refs.email, 0.6, {
          y: '-100%',
          ease: ease
        }, '-=0.6')
        .to(this.$refs.credit, 0.6, {
          y: '-100%',
          ease: ease
        }, '-=0.6');
    }
  },
  watch: {
    websiteReady(boolean) {
      if (boolean === true) {
        setTimeout(() => {
          this.enterAnimation();
        }, 500)
      }
    },
    returnHome(boolean) {
      if (boolean === true) {
        this.exitAnimation();
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

  a.link:hover {
    &::after{
      transform: scaleX(12);
    }
  }
}

.about__socials {
  position: absolute;
  left: $vertical-line-3;
  top: $horizontal-line-1;
}

.about__socials-content {
  position: relative;
  top: -24px;
  display: flex;
}

.about__social-wrapper {
  overflow: hidden;
}

.about__social-value {
  will-change: transform;
  transform: translateY(100%);
  color: $white;
  font-size:24px;
  margin-right: 20px;
}

.about__descriptions {
  position: absolute;
  left: $vertical-line-3;
  top: calc(25% + 40px);
  width: $size-description;
}

.about__descriptions-content {
  position: relative;
  width: 80%;
  bottom:-5px;
}

.about__description-wrapper {
  overflow: hidden;
  &:first-of-type {
    margin-bottom: 32px;
  }
}

.about__description-value {
  color:$grey;
  will-change: transform;
  transform: translateY(100%);
}

.about__credit {
  position: absolute;
  left: $vertical-line-3;
  bottom: $horizontal-line-1;
  width: $size-description;
}

.about__credit-content {
  position: relative;
  width: 80%;
  bottom:-5px;
}

.about__credit-wrapper {
  overflow: hidden;
}

.about__credit-value {
  color:$grey;
  font-size:14px;
  will-change: transform;
  transform: translateY(100%);

  a.link{
    padding-right: 13px;
    padding-left:5px;
    &::after{
      width: 10px;
      margin-left:3px;
    }
  }
  a.link:hover {
    &::after{
      transform: scaleX(9.2);
    }
  }
}
</style>

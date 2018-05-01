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
              <a :href="social.link" target="_blanck" :title="social.title"><i :class="'fab ' + social.icon"></i></a>
          </div>
        </div>
        <div class="about__social-resume-wrapper">
          <div class="about__social-value about__social-resume-value">
            <a class="link" :href="about.resume.url">{{ about.resume.text }}</a>
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

    <div class="about__skills">
      <div class="about__skills-content" ref="skills">
        <div class="about__skill-wrapper" :key="index" v-for="(skill, index) in about.skills.items">
            <div class="about__skill-value">
                {{ skill }}
            </div>
        </div>
      </div>
    </div>

    <div class="about__credit">
      <div class="about__credit-content">
        <div class="about__credit-wrapper">
          <div class="about__credit-value" ref="credit">
            <p>{{ about.credits.text }} <a class="link" :href="about.credits.evie.link" target="_blank">{{ about.credits.evie.title }}</a> {{ about.credits.text2 }} <a class="link" :href="about.credits.louis.link" target="_blank">{{ about.credits.louis.title }}</a> {{ about.credits.text3 }} </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { TimelineMax } from 'gsap';
import { ease } from '@/services/utils'
import { GO_ABOUT, RETURN_HOME, GO_PROJECT } from '@/store/types'

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
    },
    goAbout() {
      return this.$store.state.goAbout;
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
        .staggerFromTo(this.$refs.skills.querySelectorAll('.about__skill-value'), 0.8, {
          y: '100%'
        }, {
          y: '0%',
          ease: ease
        }, 0.1, '-=0.8')
        .to(this.$refs.email, 0.8, {
          y: '0%',
          ease: ease
        }, '-=0.7')
        .to(this.$refs.credit, 1, {
          y: '0%',
          ease: ease
        }, '-=0.7');
    },

    exitAnimation(next) {
      const timeline = new TimelineMax({
        onComplete: () => {
          next()
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
        .staggerFromTo(this.$refs.skills.querySelectorAll('.about__skill-value'), 0.8, {
          y: '0%'
        }, {
          y: '-100%',
          ease: ease
        }, 0.1, '-=0.8')
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
  beforeRouteLeave(to, from, next) {
    if (to.name === 'Home') {
      this.$store.commit(RETURN_HOME, true);
      this.exitAnimation(next)
    } else if (to.name === 'Project') {
      this.$store.commit(GO_PROJECT, true);
      this.exitAnimation(next)
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
  },
  mounted() {
    if (this.goAbout === true) {
      this.enterAnimation();
      this.$store.commit(GO_ABOUT, false);
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
  z-index:2;
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
  align-items: flex-end;
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

.about__skills {
  position: absolute;
  left: $vertical-line-3;
  top: calc(25% + 293px);
  height: 110px;
  display: flex;
  align-items: center;

  @include responsive($height) {
    top: calc(25% + 200px);
  }
}

.about__skills-content {
  position: relative;
  display: flex;
}

.about__skill-wrapper {
  overflow: hidden;
}

.about__skill-value {
  will-change: transform;
  transform: translateY(100%);
  color: $white;
  font-family: $title-font;
  font-size:24px;
  margin-right: 20px;
}

.about__social-resume-wrapper {
  overflow: hidden;
}

.about__social-resume-value {
  font-size:inherit;
  margin-right: 0;
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

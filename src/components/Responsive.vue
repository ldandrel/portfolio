<template>
  <div class="responsive">
    <div class="responsive__head">
      <span class="responsive__subhead">{{ about.subhead }}</span>
      <h1 class="responsive__title">{{ about.head }}</h1>
    </div>
    <div class="responsive__content">
      <div class="responsive__section">
        <p class="responsive__paragraph">{{ about.description }}</p>
      </div>

      <div class="responsive__section">
        <p class="responsive__paragraph">{{ about.description2 }}</p>
      </div>
    </div>

    <div class="responsive__section">
      <div class="responsive__infos">
          <div class="responsive__infos-title">{{ about.skills.title }}</div>
          <ul class="responsive__info-skills">
            <li class="responsive__info-item-wrapper" v-for="(skill, index) in about.skills.items" :key="index">
              <span class="responsive__info-item">{{ skill }}</span>
            </li>
          </ul>
      </div>
    </div>

    <div class="responsive__section">
      <ul class="responsive__socials">
        <li class="responsive__social-container" :key="index" v-for="(social, index) in about.socials">
          <a class="responsive__social" :href="social.link" :title="social.title"  ref="socialLink"><i :class="'fab ' + social.icon"></i></a>
        </li>
      </ul>
      <p class="responsive__contact-text" ref="headContact"><a class="responsive__contact-mail" :href="mail" target="_blank">{{ about.contact.email }}</a></p>
    </div>

    <div class="responsive__section">
      <div class="responsive__credits">
        <p class="responsive__credits-text">{{ about.credits.text }} <a class="responsive__credits-link" :href="about.credits.evie.link" target="_blank">{{ about.credits.evie.title }}</a> {{ about.credits.text2 }} </p>
        <img class="responsive__credits-gif" :src="about.credits.gif" alt="">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Responsive',
  computed: {
    about() {
      return this.$store.state.content.about;
    },
    mail() {
      return `mailto:${this.$store.state.content.about.contact.email}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.responsive {
  max-width: 560px;
  margin: 0 auto;
  padding: 100px 40px;
}
.responsive__head {
  margin-bottom: 65px;
  @include responsive($xs) {
    margin-bottom:30px;
  }
}

.responsive__subhead {
  display: inline-block;
  font-size: 18px;
  margin-bottom: 15px;
}
.responsive__title {
  color: $white;
  font-family: $title-font;
  font-size: 120px;
  line-height: 1;
  transform: translateX(-6px);
  @include responsive($xs) {
    font-size: 90px;
  }
}

.responsive__content {
  .responsive__section {
    margin-bottom: 40px;
  }
}
.responsive__paragraph {
  color: $grey;
  font-size: 22px;
  line-height: 1.4;
}

.responsive__infos{
  .responsive__infos-title{
    font-family: $title-font;
    font-size: 64px;
  }
  .responsive__info-skills li{
    margin:10px 0;
    font-size:18px;
    font-family: $title-font;
    &:first-child{
      margin-top:0;
    }
  }
}

.responsive__socials{
  display: flex;
  font-size:24px;
  margin-top: 40px;
  .responsive__social {
    margin-right: 20px;
    color:$white;
  }
}

.responsive__contact-text{
  margin-top:5px;
}

.responsive__credits{
  margin-top: 40px;
  color:$grey;
  .responsive__credits-gif{
    width: 100%;
    margin-top:15px;
  }
}
</style>

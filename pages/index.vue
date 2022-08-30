<template>
  <div class="container">
    <div class="wrap">
      <Header
        @on-click-restart="restart"
        @on-click-to-favorite="toFavorite"
      />
      <Question
        v-show="!isFavVisible"
        ref="question"
      />
      <Favorite
        v-show="isFavVisible"
        ref="favorite"
      />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Question from '~/components/Question.vue'
import Favorite from '~/components/Favorite.vue'
import { mapState } from 'vuex'


export default {
  name: 'Index',
  components: {
    Header,
    Question,
    Favorite,
  },
  computed: {
    ...mapState(['isFavVisible']),
  },
  methods: {
    onClickRestart() {
      this.$store.commit('RESTART')
      this.$emit('on-click-restart')
    },
    toFavorite() {
      this.$refs.favorite.toFavorite()
    },
    restart() {
      this.$refs.question.restart()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  background: #FFF;
  .wrap{
    max-width: 500px;
    height: 100%;
    margin: 0 auto;
    background: #FFFACD;
  }
}
</style>

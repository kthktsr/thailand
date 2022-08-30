<template>
  <div class="header">
    <div class="header-copy" @click="onClickRestart">{{ headerCopy }}</div>
    <div class="favorite"><button @click="onClickToFavorite">{{ favorite }}</button></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: {
  },
  data () {
    return {
      headerCopy: 'タイをさがそう！',
      favorite: 'お気に入り'
    }
  },
  computed: {
  },
  methods: {
    onClickToFavorite() {
      this.$store.commit('ON_FAVORITE_FLAG')
      this.$emit('on-click-to-favorite')
    },
    onClickRestart() {
      this.$store.commit('RESTART')
      this.$emit('on-click-restart')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width:500px;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: #FFFACD;
	.header-copy {
    font-size: 24px;
    font-weight: bold;
    margin-left: 32px;
  }
	.favorite {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 115px;
    height: 45px;
    background-color: #EC6D88;
    border-radius: 50px;
    margin-right: 16px;
    button {
      color: #fff;
    }
  }
}
</style>
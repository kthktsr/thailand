<template>
  <div class="picture-item" v-if="thumUrl" @click="onClickOpenModal(item)">
    <img :src="thumUrl" v-if="!isVideo" class="img">
    <video :src="thumUrl" v-if="isVideo" autoplay muted loop class="video"></video>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: '',
  components: {},
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState(['isPostModalActive']),
    thumUrl() {
      return this.item.hasOwnProperty('children')
      ? this.item.children.data[0].media_url
      : this.item.media_url
    },
    isVideo() {
      if(this.thumUrl) {
        return this.thumUrl.indexOf('video') !== -1
      }
    }
  },
  methods: {
    onClickOpenModal(postData) {
      this.$store.commit('ADD_POST_FOR_MODAL', postData)
      this.$store.commit('SET_MODAL_ACTIVE')
    },
  }
}
</script>
<style lang="scss" scoped>
.picture-item{
  display: block;
  max-width: 250px;
  max-height: 250px;
  border-radius: 5px;
  background-color: white;
  padding: 10px;
  .img, .video{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-style: none;
    object-fit: cover;
  }
}
</style>
<template>
  <div class="overlay-post-media" v-if="thumUrl">
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
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['postForModal']),
    thumUrl() {
      return this.postForModal.hasOwnProperty('children') ?
      this.postForModal.children.data[0].media_url
      :
      this.postForModal.media_url
    },
    isVideo() {
      if(this.thumUrl) {
        return this.thumUrl.indexOf('video') !== -1
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.overlay-post-media{
  width: 100%;
  height: 50%;
  .img, .video{
    width: 100%;
    height: 100%;
    border-radius: 5px 5px 0 0;
    border-style: none;
    object-fit: cover;
  }
}
</style>
<template>
  <div class="favorite">
    <div>
      <div v-if="favoriteFlag">
        <PictureList ref="pictureList" :items=favorites />
        <OverlayPost v-if="isPostModalActive"/>
      </div>
      <div v-else>
        お気に入りがありません
      </div>
    </div>
  </div>
</template>
<script>
import PictureList from '~/components/PictureList.vue'
import { mapState, mapGetters } from 'vuex'
import OverlayPost from '~/components/OverlayPost.vue'

export default {
  name: '',
  components: {
    PictureList,
    OverlayPost
  },
  props: {
  },
  data () {
    return {
      favorites: [],
      favoriteFlag: false
    }
  },
  mounted () {
    if(this.favorites == [] || null) {
      this.favoriteFlag = false
    }
    if(localStorage.favorites) {
      this.favorites = JSON.parse(localStorage.getItem("favorites"))
    }
  },
  computed: {
    ...mapState(['isPostModalActive']),
    ...mapGetters(['favReloadFlag']),
  },
  watch: {
    favorites(newVal) {
      if(newVal == null) {
        this.favoriteFlag = false
      }
    }
  },
  methods: {
    toFavorite() {
      if(localStorage.favorites) {
        this.favorites = JSON.parse(localStorage.getItem("favorites"))
      }
      if(this.favorites == null || this.favorites == []) {
        this.favoriteFlag = false
      } else {
        this.favoriteFlag = true
        this.favorites = JSON.parse(localStorage.getItem("favorites"))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .favorite {
    padding: 15px;
    margin-top: 100px;
  }
</style>
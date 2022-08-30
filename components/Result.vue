<template>
  <div class="result" v-if="postArrayLength > 4 && isResultActive && !isLoading">
    <PictureList ref="pictureList" :items=shuffledPostArray />
    <OverlayPost v-if="isPostModalActive"/>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import PictureList from '~/components/PictureList.vue'
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
    }
  },
  computed: {
    ...mapState(['isLoading','postArray','isResultActive','isPostModalActive','isFavVisible']),
    ...mapGetters(['postArrayLength']),
    favoriteId() {
      if(localStorage.favorites) {
        let favs = JSON.parse(localStorage.getItem("favorites"))
        let idArr = []
        for (let i = 0; i < favs.length; i++) {
          idArr.push(favs[i].id)
        }
        return idArr
      }
      return []
    },
    shuffledPostArray() {
      let arr = []
      for (let i = 0; i < this.postArray.length; i++) {
        const pa = this.postArray[i]
        for (let index = 0; index < pa.length; index++) {
          if(this.addFavoriteProperty(pa[index].id)) {
            pa[index].favorite = true
          } else {
            pa[index].favorite = false
          }
          arr.push(pa[index])
        }
      }
      this.shuffle(arr)
      return arr
    },
  },
  // watch: {
  //   isPostModalActive(newVal) {
  //     if(this.isFavVisible) {}
  //     if(newVal){
  //       this.makeScrollOff()
  //     } else {
  //       this.makeScrollOn()
  //     }
  //   },
  // },
  methods: {
    shuffle(arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    addFavoriteProperty(id) {
      let arr = this.favoriteId
      for (let i = 0; i < arr.length; i++) {
        if(id === arr[i]) {
          return true
        }
      }
    },
    handle(event) {
      event.preventDefault()
    },
    // makeScrollOff() {
    //   this.$refs.pictureList.$el.style.position = "fixed"
    // },
    // makeScrollOn() {
    //   this.$refs.pictureList.$el.style.position = ""
    // }
  }
}
</script>
<style lang="scss" scoped>
.result {
  width: 100%;
  padding: 15px;
}
</style>
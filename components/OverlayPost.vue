<template>
  <div class="overlay-post">
    <div class="wrap">
      <OverlayPostMedia />
      <div class="overlay-post-info">
        <p class="like">いいね！{{ postForModal.like_count }}</p>
        <p class="caption">{{ postForModal.caption }}</p>
      </div>
      <div class="btns">
        <button class="close-btn" @click="onClickCloseModal">閉じる</button>
        <button class="favorite-btn" @click="onClickToggleFavorite">{{ favoriteText }}</button>
      </div>
    </div>
  </div>
</template>
<script>
import OverlayPostMedia from '~/components/OverlayPostMedia.vue'
import { mapState } from 'vuex'


export default {
  name: '',
  components: {
    OverlayPostMedia
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['postForModal']),
    favoriteText() {
      if(this.postForModal.favorite == true) {
        return 'お気に入り済'
      } else {
        return 'お気に入りに追加'
      }
    }
  },
  methods: {
    onClickCloseModal () {
      this.$store.commit('SET_MODAL_INACTIVE')
    },
    onClickToggleFavorite() {
      if(this.postForModal.favorite) {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        this.$store.commit('REMOVE_FAVORITE')
        favorites.forEach((obj, index) => {
          if(obj.id === this.postForModal.id) {
            favorites.splice(index, 1)
          }
        })
        let setjson = JSON.stringify(favorites)
        localStorage.setItem("favorites", setjson)
      } else {
        let favorites = JSON.parse(localStorage.getItem("favorites"))
        this.$store.commit('ADD_FAVORITE')
        if(favorites == null){
          favorites = []
        }
        favorites[favorites.length] = this.postForModal
        let setjson = JSON.stringify(favorites)
        localStorage.setItem("favorites", setjson)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.overlay-post{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(100, 100, 100, .8);
  .wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    max-width: 400px;
    height: 80%;
    border-radius: 5px;
    font-weight: bold;
    background: #FFF;
    .overlay-post-info{
      width: 100%;
      height: 50%;
      padding: 15px;
      margin-bottom: 15px;
      white-space: normal;
      p{
        margin-bottom: 10px;
        overflow-y: scroll;
      }
      .like{
        border-bottom: 1px solid;
        padding-bottom: 6px;
      }
      .caption{
        height: 100%;
        padding-bottom: 15px;
      }
    }
    .btns{
      display: flex;
      justify-content: center;
      .close-btn, .favorite-btn{
        width: 50%;
        padding: 10px 10px;
      }
      .close-btn{
        border-radius: 0px 0px 0px 5px;
        background: #FFE600;
      }
      .favorite-btn{
        border-radius: 0px 0px 5px 0px;
        color: #FFF;
        background: #EC6D88;
      }
    }
  }
}
</style>
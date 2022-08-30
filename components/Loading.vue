<template>
  <div class="loading" v-show="isLoading">
    <p>読み込み中</p>
    <vue-loading
        type="bubbles"
        color="#000"
        :size="{ width: '40px', height: '40px' }"
        />
  </div>
</template>
<script>
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
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.loading{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  font-size: 32px;
  font-weight: bold;
  padding: 50px 40px;
  margin-bottom: 50px;
  background: #fff;
  border-radius: 10px;
}

.vue-loading{
  margin: 0 !important;
}
</style>
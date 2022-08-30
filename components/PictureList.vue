<template>
  <div class="picture-list">
    <PictureItem v-for="(item, i) in items" :key="i" :item=item />
  </div>
</template>
<script>
import PictureItem from '~/components/PictureItem.vue'

export default {
  name: '',
  components: {
    PictureItem,
  },
  props: {
    items: {
      type: Array,
      default() {
        return []
      },
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.picture-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  -webkit-column-gap: 3.47%;
  grid-column-gap: 3.47%;
  column-gap: 3.47%;
  overflow-y: scroll;
  .picture-item{
      margin-bottom: 15px;
    }
}
</style>
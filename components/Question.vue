<template>
    <div class="question">
      <div class="intro" v-show="isIntroVisible">
        <div class="about">
          <p>いくつかの質問に答えると、あなたにあった</p>
          <p>タイの情報を画像つきで検索できます。</p>
        </div>
        <button class="start" @click="onClickStart">
          スタート
        </button>
      </div>
      <div class="input" v-show="isInputVisible">
        <p class="sentence">{{ questionArray[questionIndex].question }}</p>
        <div class="option">
          <button
            @click="onClickAnswer(questionArray[questionIndex].option.option0Word)"
            v-show="isInputVisible"
          >
            {{ questionArray[questionIndex].option.option0 }}
          </button>
          <button
            @click="onClickAnswer(questionArray[questionIndex].option.option1Word)"
            v-show="isInputVisible"
          >
            {{ questionArray[questionIndex].option.option1 }}
          </button>
        </div>
      </div>
      <div class="show-result" v-show="isResultVisible">
        <p class="sentence">質問は以上です。結果をみるボタンを押して、あなただけのタイを探そう！</p>
        <button
          @click="onClickResult"
        >
          結果を見る
        </button>
      </div>
      <Loading />
      <Result />
    </div>
</template>

<script>
import { APP_QNA } from '~/assets/js/constants/AppQNA';
import * as MutationTypes from "@/store/mutationTypes";
import Loading from '../components/Loading.vue';
import { mapGetters } from 'vuex'
import Result from '~/components/Result.vue'


export default {
  name: '',
  props: {
  },
  components: {
    Loading,
    Result

  },
  data () {
    return {
      isIntroVisible: true,
      isInputVisible: false,
      isResultVisible: false,
      questionArray: APP_QNA,
      questionIndex: 0
    }
  },
  computed: {
    ...mapGetters(['postArrayLength'])
  },
  watch: {
    postArrayLength(newVal, oldVal) {
      if(newVal > 4) {
        this.$store.commit('SET_LOADED')
      }
    },
  },
  methods: {
    onClickStart() {
      this.isIntroVisible = false
      this.isInputVisible = true
    },
    addQuestionIndex() {
      if (this.questionIndex < 4) {
        this.questionIndex += 1
      } else {
        this.isInputVisible = false
        this.isResultVisible = true
      }
    },
    pushAnswer(answer) {
      this.$store.commit(MutationTypes.ADD_ANSWER, answer)
    },
    onClickAnswer(answer) {
      this.addQuestionIndex()
      this.pushAnswer(answer)
      this.$store.dispatch('getInstaPostDataWithHashTag', {
        hashtag: answer
      })
    },
    onClickResult() {
      this.isResultVisible = false
      this.$store.commit('SET_LOADING')
      this.$store.commit('SET_RESULT_ACTIVE')
    },
    restart() {
      this.questionIndex = 0
      this.isIntroVisible = true
      this.isInputVisible = false
      this.isResultVisible = false
    }
  },
}
</script>

<style lang="scss" scoped>
.question{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 100px 0 0;
  height: 100vh;
  background-color: #FFFACD;
  .intro{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    .about{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 500px;
      font-size: 32px;
      font-weight: bold;
      padding:  50px 40px;
      margin-bottom: 50px;
      background: #fff;
      border-radius: 10px;
    }
    .start{
      display: block;
      font-size: 32px;
      text-align: center;
      width: 300px;
      background: #FFE600;
      border-radius: 50px;
      padding: 15px 25px;
    }
  }
  .input{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 500px;
    background: #fff;
    position: relative;
    border-radius: 10px;
    padding-bottom: 50px;
    .sentence{
      width: 100%;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      padding: 50px 40px;
    }
    .option{
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 50px;
      button{
        width: 180px;
        height: 80px;
        display: block;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        background: #FFE600;
        border-radius: 50px;
        padding: 15px 25px;
        &:first-child{
          margin-right: 1vw;
        }
        &:last-child{
          margin-left: 1vw;
        }
      }
    }
  }
  .show-result{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sentence{
      display: flex;
      align-items: center;
      min-height: 500px;
      font-size: 32px;
      font-weight: bold;
      padding:  50px 40px;
      margin-bottom: 50px;
      background: #fff;
      border-radius: 10px;
      p:first-child{
        padding-bottom: 15px;
      }
    }
    button{
      display: block;
      font-size: 32px;
      text-align: center;
      width: 300px;
      background: #FFE600;
      border-radius: 50px;
      padding: 15px 25px;
    }
  }
}

</style>
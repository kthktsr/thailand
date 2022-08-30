import * as MutationTypes from '@/store/mutationTypes';
import ApiManager from '~/assets/js/ApiManager'

export const state = () => ({
  answerArray: [],
  postArray: [],
  isLoading: false,
  isResultActive: false,
  isPostModalActive: false,
  postForModal: {},
  isFavVisible: false,
  restartFlag: false
})

export const getters = {
  postArrayLength: (state) =>{
    return state.postArray.length
  },
  favReloadFlag: (state) => {
    return state.isFavVisible
  }
}

export const mutations = {
  [MutationTypes.ADD_ANSWER] (state, payload) {
    state.answerArray.push(payload)
  },
  [MutationTypes.ADD_POST] (state, payload) {
    state.postArray.push(payload)
  },
  [MutationTypes.SET_LOADING] (state) {
    if(state.postArray.length < 4) {
      state.isLoading = true
    }
  },
  [MutationTypes.SET_LOADED] (state) {
    state.isLoading = false
  },
  [MutationTypes.SET_RESULT_ACTIVE] (state) {
    state.isResultActive = true
  },
  [MutationTypes.SET_MODAL_ACTIVE] (state) {
    state.isPostModalActive = true
  },
  [MutationTypes.SET_MODAL_INACTIVE] (state) {
    state.isPostModalActive = false
  },
  [MutationTypes.ADD_POST_FOR_MODAL] (state, payload) {
    state.postForModal = payload
  },
  [MutationTypes.ON_FAVORITE_FLAG] (state) {
    state.isFavVisible = true
  },
  [MutationTypes.ADD_FAVORITE] (state) {
    state.postForModal.favorite = true
  },
  [MutationTypes.REMOVE_FAVORITE] (state) {
    state.postForModal.favorite = false
  },
  [MutationTypes.RESTART] (state) {
    state.postArray = []
    state.isLoading = false
    state.isResultActive = false
    state.isPostModalActive = false
    state.isFavVisible = false
  }
}

export const actions = {
  getInstaPostDataWithHashTag (context, payload) {
    let hashTagWord = payload.hashtag
    let post
    ApiManager.getInstaHashTagId(hashTagWord).then(hashTagId => {
      ApiManager.getInstaPost(hashTagId).then(res => {
        post = res.data.data
        context.commit(MutationTypes.ADD_POST, post)
      })
    })
  }
}
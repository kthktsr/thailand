import { API_URL } from '~/assets/js/constants/ApiUrl'

const axios = require('axios')
const hashTagApiBaseUrl = API_URL.hashTagApiBaseUrl
const getInstaPostDataBaseUrl = API_URL.getInstaPostDataBaseUrl

export default class ApiManager {
  static async getInstaHashTagId(hashTagWord) {
    let hashTagApiUrl = `${hashTagApiBaseUrl}?user_id=${process.env.USER_ID}&q=${hashTagWord}&access_token=${process.env.ACCESS_TOKEN}`
    let res = await axios.get(hashTagApiUrl)
    let hashTagId = res.data.data[0].id
    return hashTagId
  }

  static async getInstaPost(hashTagId) {
    let getInstaPostDataUrl = `${getInstaPostDataBaseUrl}${hashTagId}/top_media?user_id=${process.env.USER_ID}&fields=children{id,media_url,media_type},caption,like_count,id,media_type,permalink,media_url&access_token=${process.env.ACCESS_TOKEN}`
    let post = await axios.get(getInstaPostDataUrl)
    return post
  }
}
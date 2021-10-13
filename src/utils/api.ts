import {create} from "apisauce"
import Config from "react-native-config"

export const cryptoApi = create({
  baseURL: Config.CRYPTO_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": Config.CRYPTO_API_KEY,
  },
})

export const indexApi = create({
  baseURL: Config.INDEX_API_BASE_URL,
  headers: {"Content-Type": "application/json"},
})

export const newsApi = create({
  baseURL: Config.NEWS_API_BASE_URL,
  headers: {"Content-Type": "application/json"},
  params: {auth_token: Config.NEWS_AUTH_TOKEN, kind: "news", public: true},
})

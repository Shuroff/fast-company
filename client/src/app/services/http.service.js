import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../utils/config.json'
import authService from './auth.service'
import localStorageService from './localStorage.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint,
})

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()

    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url = containSlash
        ? config.url.slice(0, -1) + '.json'
        : config.url + '.json'

      if (isExpired) {
        const data = await authService.refresh()
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          accessToken: data.accessToken,
          expiresIn: data.expires_in,
          userId: data.userId,
        })
      }
    } else {
      // if (isExpired) {
      //   console.log('isExpired')
      //   const data = await authService.refresh()
      //   console.log('expired data', data)
      //   localStorageService.setTokens(data)
      // }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      }
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map(key => ({
        ...data[key],
      }))
    : data
}
http.interceptors.response.use(
  res => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) }
    }
    res.data = { content: res.data }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    if (!expectedErrors) {
      console.log(error)
      toast.error('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
}

export default httpService

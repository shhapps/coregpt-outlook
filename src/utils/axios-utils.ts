import axios, { AxiosError } from 'axios'

import type { IApiAuthUser, IApiUser, IUpsertMicrosoftUser } from '@/interfaces/api.interfaces'
import { API_URL, LocalStorageKeys } from '@/utils/constants'
import { reloadWithClearing } from '@/utils/global'

const axiosInstance = axios.create({ baseURL: API_URL })

/* Axios's request interceptor for adding required headers */
axiosInstance.interceptors.request.use(function (config) {
  config.headers.set(LocalStorageKeys.requestId, localStorage.getItem(LocalStorageKeys.requestId))
  return config
})

/* Axios's response interceptor for checking app-version and forbidden requests */
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error instanceof AxiosError && error.response?.status === 401) reloadWithClearing()
    return Promise.reject(error)
  }
)

/**
 * Get user data from db
 * @return {IApiUser} - User info
 */
export const getUserData = async (): Promise<IApiUser | null> => {
  try {
    const accessToken = localStorage.getItem(LocalStorageKeys.accessToken)
    const { data } = await axiosInstance.get<IApiUser>('/outlook/users', {
      headers: {
        Authorization: `Bearer ${accessToken as string}`
      }
    })
    return data
  } catch (e) {
    console.error('Error while getting user data: ', e)
    return null
  }
}

/**
 * Insert or update Microsoft user
 * @param {IUpsertMicrosoftUser} params - Required params
 * @return {IApiAuthUser} - User info
 */
export const upsertMicrosoftUser = async (params: IUpsertMicrosoftUser): Promise<IApiAuthUser> => {
  try {
    const { data } = await axiosInstance.put<IApiAuthUser>('/outlook/users', params)
    return data
  } catch (e) {
    console.error('Error while upserting Microsoft user: ', e)
    throw e
  }
}

export default axiosInstance

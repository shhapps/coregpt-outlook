export interface IAuthData {
  email: string
  firstName?: string
  lastName?: string
  authToken: string
}

export type IUserInfo = Omit<IAuthData, 'authToken'>

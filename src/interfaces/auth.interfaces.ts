export enum AuthStatus {
  success = 'success',
  failure = 'failure'
}

export interface IMSAuthResult {
  firstName?: string
  lastName?: string
  email: string
  accessToken: string
}

export interface IMSAuthErrorResult {
  errorCode: string
  errorMessage?: string
}

export interface IMsGraphUser {
  businessPhones: string[]
  displayName: string
  givenName: string
  jobTitle: string
  mail: string
  mobilePhone?: string
  officeLocation: string
  preferredLanguage: string
  surname: string
  userPrincipalName: string
  id: string
}

export interface IAuthData {
  email: string
  firstName?: string
  lastName?: string
  authToken: string
  photoUrl?: string
}

export type IUserInfo = Omit<IAuthData, 'authToken'>

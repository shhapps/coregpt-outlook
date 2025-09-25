export interface IApiUser {
  email: string
  first_name?: string
  last_name?: string
}

export interface IApiAuthUser extends IApiUser {
  access_token: string
}

export interface IUpsertMicrosoftUser {
  email: string
  first_name?: string
  last_name?: string
  request_id: string
  access_token: string
}

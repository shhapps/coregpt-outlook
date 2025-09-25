import { useAppStore } from '@/stores/app.store'
import { getUserData, upsertMicrosoftUser } from '@/utils/axios-utils'

export const useAuthData = () => {
  const { accessToken, userInfo, updateUserInfo, updateAccessToken, requestId } = useAppStore()

  const checkAuthState = async () => {
    // If token exists, it means user authenticated and enough to update user info
    if (accessToken && !userInfo) {
      const userData = await getUserData()
      if (userData?.email)
        updateUserInfo({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email
        })
      return
    }

    // If not, need to get access token by upserting user
    if (!accessToken) {
      const { emailAddress, displayName } = Office.context.mailbox.userProfile
      const [firstName, lastName] = displayName.split(' ')
      // Update that later after auth
      const officeUserData = {
        email: emailAddress,
        first_name: firstName,
        last_name: lastName
      }

      const userData = await upsertMicrosoftUser({
        email: officeUserData.email,
        first_name: officeUserData.first_name,
        last_name: officeUserData.last_name,
        request_id: requestId,
        access_token: requestId
      })
      updateAccessToken(userData.access_token)
      updateUserInfo({ email: userData.email })
    }
  }

  return { checkAuthState }
}

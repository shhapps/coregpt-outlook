import axios from 'axios'

import './loader.css'
import {
  AuthStatus,
  type IMSAuthErrorResult,
  type IMSAuthResult,
  type IMsGraphUser
} from '@/interfaces/auth.interfaces.ts'
import { getValidEmail } from '@/utils/global'
import msalInstance from '@/utils/global/auth-config'
void (async () => {
  // The initialize function must be run each time a new page is loaded
  await Office.onReady(() => {
    void msalInstance.initialize().then(async () =>
      // handleRedirectPromise should be invoked on every page load
      msalInstance
        .handleRedirectPromise()
        .then(async response => {
          // If the response is non-null, it means the page is returning from AAD with a successful response
          if (response) {
            const { data: userData } = await axios.get<IMsGraphUser>(
              `https://graph.microsoft.com/v1.0/users/${response.uniqueId}?$select=givenName,surname,userPrincipalName,mail,identities`,
              { headers: { Authorization: `Bearer ${response.accessToken}` } }
            )
            const result: IMSAuthResult = {
              firstName: userData.givenName,
              lastName: userData.surname,
              email: getValidEmail(userData.mail, userData.userPrincipalName),
              accessToken: response.accessToken
            }
            Office.context.ui.messageParent(JSON.stringify({ status: AuthStatus.success, result }))
          }
          // Otherwise, invoke login
          else await msalInstance.loginRedirect({ scopes: ['user.read'] })
        })
        .catch((error: IMSAuthErrorResult) => {
          console.error('Auth error: ', error)
          const errorResult = {
            errorCode: error.errorCode,
            errorMessage: error.errorMessage
          }
          Office.context.ui.messageParent(JSON.stringify({ status: AuthStatus.failure, result: errorResult }))
        })
    )
  })
})()

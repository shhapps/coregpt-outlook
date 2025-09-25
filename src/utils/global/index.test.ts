import { getValidEmail } from '@/utils/global/index'

describe('getValidEmail', () => {
  // Returns msUserMail when it contains '@' symbol
  it('should return msUserMail when it contains @ symbol', () => {
    const msUserMail = 'test@example.com'
    const userPrincipalName = 'test.user@domain.com'

    const result = getValidEmail(msUserMail, userPrincipalName)

    expect(result).toBe(msUserMail)
  })

  // Handles empty string for msUserMail
  it('should return userPrincipalName when msUserMail is empty', () => {
    const msUserMail = ''
    const userPrincipalName = 'test.user@domain.com'

    const result = getValidEmail(msUserMail, userPrincipalName)

    expect(result).toBe(userPrincipalName)
  })
})

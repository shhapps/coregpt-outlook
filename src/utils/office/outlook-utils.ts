export const getSelectedOutlookText = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      Office.context.mailbox.item?.getSelectedDataAsync(Office.CoercionType.Text, result => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result.value?.data || '')
        } else {
          console.error('Error getting selected data:', result.error)
          reject(result.error)
        }
      })
    } catch (err) {
      console.error('Exception in getSelectedOutlookText:', err)
      reject(err)
    }
  })
}

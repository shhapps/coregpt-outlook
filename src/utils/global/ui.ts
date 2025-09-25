export const fallbackCopyTextToClipboard = (text: string): boolean => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed' // prevent scroll jump
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = '0'
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  let successful: boolean
  try {
    successful = document.execCommand('copy')
  } catch (err) {
    console.error('Error while copying: ', err)
    successful = false
  }

  document.body.removeChild(textArea)
  return successful
}

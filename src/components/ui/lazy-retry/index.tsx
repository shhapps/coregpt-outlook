// a function to retry loading a chunk to avoid chunk load error for out of date code
import type { ComponentType } from 'react'

type LazyComponent = () => Promise<{ default: ComponentType<unknown> }>

const Index = function (componentImport: LazyComponent, name: string): Promise<{ default: ComponentType<unknown> }> {
  return new Promise((resolve, reject) => {
    const storageKey = `retry-${name}-refreshed`
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(window.localStorage.getItem(storageKey) || 'false') as boolean

    // try to import the component
    componentImport()
      .then(component => {
        window.localStorage.setItem(storageKey, 'false') // success so reset the refresh
        resolve(component)
      })
      .catch((error: Error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.localStorage.setItem(storageKey, 'true') // we are now going to refresh
          window.location.reload() // refresh the page
          return
        }
        // Default error behaviour as already tried refresh
        reject(error)
      })
  })
}

export default Index

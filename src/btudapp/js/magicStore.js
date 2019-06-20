let store = {}

const sessionStoreName = 'magicStore'
const magicStore = {}

// Set all the store
magicStore.set = (newStore) => {
  store = newStore
}

// Get a store item or all the store if not specified
magicStore.get = (itemPath) => {
  if (typeof(itemPath) === 'string')
    return getItem(itemPath)
  return store
}

// Update one or more store value
magicStore.update = (item) => {
  store = Object.assign(store, item)
}

// Delete the store
magicStore.delete = () => {
  store = {}
}

magicStore.print = () => {
  console.log(store)
}

magicStore.save = () => {
  writeToSession(store)
}

magicStore.restore = () => {
  store = readFromSession()
}

// Delete the cached store
magicStore.reset = () => {
  window.sessionStorage.removeItem(sessionStoreName)
}

export default magicStore
window.store = magicStore


// ----------------------------------------------------------
// MagicStore internal methods
// ----------------------------------------------------------

const readFromSession = () => {
  return JSON.parse(window.sessionStorage.getItem(sessionStoreName) || '{}')
}

const writeToSession = (newStore) => {
  window.sessionStorage.setItem(sessionStoreName, JSON.stringify(newStore))
}

const getItem = (path) => {
  const pathArray = path.split('.')
  let item = store
  for (let i = 0; i < pathArray.length; i++) {
    if (typeof(item[pathArray[i]]) !== 'object' && i + 1 < pathArray.length)
      return undefined
    item = item[pathArray[i]]
  }
  return item
}
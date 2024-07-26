export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key) === null ? '' : localStorage.getItem(key)
}

export function removeLocalStorage(key: string) {
  return localStorage.removeItem(key)
}
export function setLocalStorageObj(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorageObj(key: string) {
  return localStorage.getItem(key) === null ? {} : JSON.parse(localStorage.getItem(key) as string)
}

// Session
export function setSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value)
}

export function getSessionStorage(key: string) {
  const res = sessionStorage.getItem(key)
  return res === null ? '' : res
}

export function removeSessionStorage(key: string) {
  return sessionStorage.removeItem(key)
}
export function clearSessionStorage() {
  return sessionStorage.clear()
}

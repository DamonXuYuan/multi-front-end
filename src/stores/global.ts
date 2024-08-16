import { create } from 'zustand'

type State = {
  pageTitle: string
}

const globalStore = create<State>(() => ({
  pageTitle: '',
}))

export default globalStore

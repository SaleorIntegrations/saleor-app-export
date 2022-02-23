import create from 'zustand'

import { User } from '../../api/saleor/types'

interface CurrentUserStore {
  user: User
  setUser: (user: User) => void
}

export const useCurrentUserStore = create<CurrentUserStore>(set => ({
  user: { id: '', firstName: '', lastName: '', email: '' },
  setUser: user => set({ user: user }),
}))

export default useCurrentUserStore

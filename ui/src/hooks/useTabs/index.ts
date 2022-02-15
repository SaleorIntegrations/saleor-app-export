import create from 'zustand'
import { produce } from 'immer'

import { Filter } from '../../globalTypes'

export interface Tab {
  key: string
  title: string
  filter: Filter
}

type Tabs = Record<string, Tab>
type SetCurrentTab = (key: string) => void
type AddTab = (tab: Tab) => void
type RemoveTab = (key: string) => void
type UpdateCurrentTab = (tab: Tab) => void

interface TabStore {
  tabs: Tabs
  currentTab: Tab
  setCurrentTab: SetCurrentTab
  addTab: AddTab
  removeTab: RemoveTab
  updateCurrentTab: UpdateCurrentTab
}

export const useTabs = create<TabStore>(set => ({
  tabs: JSON.parse(
    window.localStorage.getItem('FILTER') ||
      JSON.stringify({
        ALL: {
          key: 'ALL',
          title: 'All Exports',
          filter: {
            query: '',
          },
        },
      })
  ),
  currentTab: {
    key: 'ALL',
    title: 'All Exports',
    filter: {
      query: '',
    },
  },
  setCurrentTab: (key: string) =>
    set(state =>
      produce(state, draft => {
        draft.currentTab = state.tabs[key]
        if (key !== 'SEARCH_CUSTOM') {
          delete draft.tabs['SEARCH_CUSTOM']
        }
      })
    ),
  addTab: (tab: Tab) =>
    set(state =>
      produce(state, draft => {
        draft.tabs[tab.key] = tab
      })
    ),
  removeTab: (key: string) =>
    set(state =>
      produce(state, draft => {
        if (key === draft.currentTab.key) {
          draft.currentTab = draft.tabs['ALL']
        }
        delete draft.tabs[key]
      })
    ),
  updateCurrentTab: (tab: Tab) =>
    set(state =>
      produce(state, draft => {
        draft.tabs[tab.key] = tab
        draft.currentTab = tab
      })
    ),
}))

export default useTabs

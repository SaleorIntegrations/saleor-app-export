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
type AddCustomTab = (filter: Filter) => void

interface TabStore {
  tabs: Tabs
  currentTab: Tab
  setCurrentTab: SetCurrentTab
  addTab: AddTab
  removeTab: RemoveTab
  updateCurrentTab: UpdateCurrentTab
  addCustomTab: AddCustomTab
}

const defaultState: Tabs = {
  ALL_EXPORTS: {
    key: 'ALL_EXPORTS',
    title: 'All Exports',
    filter: {
      query: '',
    },
  },
}

export const RESERVED_TABS = ['ALL_EXPORTS', 'CUSTOM_FILTER']

export const useTabs = create<TabStore>(set => ({
  tabs: JSON.parse(
    window.localStorage.getItem('FILTER') || JSON.stringify(defaultState)
  ),
  currentTab: defaultState['ALL_EXPORTS'],
  setCurrentTab: (key: string) =>
    set(state =>
      produce(state, draft => {
        draft.currentTab = state.tabs[key]
        if (key !== 'CUSTOM_FILTER') {
          delete draft.tabs['CUSTOM_FILTER']
        }
      })
    ),
  addTab: (tab: Tab) => {
    if (RESERVED_TABS.includes(tab.key)) {
      throw new Error('Name of tab is reserved')
    }

    set(state =>
      produce(state, draft => {
        draft.tabs[tab.key] = tab
      })
    )
  },
  removeTab: (key: string) =>
    set(state =>
      produce(state, draft => {
        if (key === draft.currentTab.key) {
          draft.currentTab = draft.tabs['ALL_EXPORTS']
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
  addCustomTab: (filter: Filter) =>
    set(state =>
      produce(state, draft => {
        draft.tabs['CUSTOM_FILTER'] = {
          key: 'CUSTOM_FILTER',
          title: 'Custom Filter',
          filter: filter,
        }
        draft.currentTab = draft.tabs['CUSTOM_FILTER']
      })
    ),
}))

export default useTabs

import create from 'zustand'
import { produce } from 'immer'

import { TabStore, Tabs } from './types'

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
  setCurrentTab: key =>
    set(state =>
      produce(state, draft => {
        draft.currentTab = state.tabs[key]
        if (key !== 'CUSTOM_FILTER') {
          delete draft.tabs['CUSTOM_FILTER']
        }
      })
    ),
  addTab: tab => {
    if (RESERVED_TABS.includes(tab.key)) {
      throw new Error('Name of tab is reserved')
    }

    set(state =>
      produce(state, draft => {
        draft.tabs[tab.key] = tab
      })
    )
  },
  removeTab: key =>
    set(state =>
      produce(state, draft => {
        if (key === draft.currentTab.key) {
          draft.currentTab = draft.tabs['ALL_EXPORTS']
        }
        delete draft.tabs[key]
      })
    ),
  updateCurrentTab: tab =>
    set(state =>
      produce(state, draft => {
        draft.tabs[tab.key] = tab
        draft.currentTab = tab
      })
    ),
  addCustomTab: filter =>
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

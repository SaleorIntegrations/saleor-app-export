import { Filter } from '../../../globalTypes'

export interface Tab {
  key: string
  title: string
  filter: Filter
}

export type Tabs = Record<string, Tab>
type SetCurrentTab = (key: string) => void
type AddTab = (tab: Tab) => void
type RemoveTab = (key: string) => void
type UpdateCurrentTab = (tab: Tab) => void
type AddCustomTab = (filter: Filter) => void

export interface TabStore {
  tabs: Tabs
  currentTab: Tab
  setCurrentTab: SetCurrentTab
  addTab: AddTab
  removeTab: RemoveTab
  updateCurrentTab: UpdateCurrentTab
  addCustomTab: AddCustomTab
}

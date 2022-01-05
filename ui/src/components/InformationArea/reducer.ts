import produce from 'immer'

export interface Informations {
  channels: string[]
  organisations: string[]
  attributes: string[]
  financials: string[]
  seo: string[]
  inventory: string[]
  warehouses: string[]
}

export interface InformationsAction extends Partial<Informations> {
  type: 'SET_CHANNELS' | 'SET_ORGANISATIONS' | 'SET_ATTRIBUTES' | 'SET_FINANCIALS' | 'SET_SEO' | 'SET_INVENTORY' | 'SET_WAREHOUSES'
}

export const initialInformations: Informations = {
  channels: [],
  organisations: [],
  attributes: [],
  financials: [],
  seo: [],
  inventory: [],
  warehouses: [],
}

export const informationsReducer = (state: Informations, action: InformationsAction) => {
  switch (action.type) {
    case 'SET_ATTRIBUTES':
      return produce(state, draft => {
        const { attributes } = action
        draft.attributes = attributes !== undefined ? attributes : state.attributes
      })
    case 'SET_CHANNELS':
      return produce(state, draft => {
        const { channels } = action
        draft.channels = channels !== undefined ? channels : state.channels
      })
    case 'SET_FINANCIALS':
      return produce(state, draft => {
        const { financials } = action
        draft.financials = financials !== undefined ? financials : state.financials
      })
    case 'SET_INVENTORY':
      return produce(state, draft => {
        const { inventory } = action
        draft.inventory = inventory !== undefined ? inventory : state.inventory
      })
    case 'SET_ORGANISATIONS':
      return produce(state, draft => {
        const { organisations } = action
        draft.organisations = organisations !== undefined ? organisations : state.organisations
      })
    case 'SET_SEO':
      return produce(state, draft => {
        const { seo } = action
        draft.seo = seo !== undefined ? seo : state.seo
      })
    case 'SET_WAREHOUSES':
      return produce(state, draft => {
        const { warehouses } = action
        draft.warehouses = warehouses !== undefined ? warehouses : state.warehouses
      })
    default:
      return state
  }
}

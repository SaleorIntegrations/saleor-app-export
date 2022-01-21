import { Filter } from './reducer'

export const settledCategoryFilter: Filter = {
  filterType: 'category',
  id: 'category-id',
  name: 'Categories',
  checked: false,
  selected: [],
}

export const settledChannelFilter: Filter = {
  filterType: 'channel',
  id: 'channel-id',
  name: 'Channel',
  checked: false,
  selected: [],
}

export const settledStockQuantityFilter: Filter = {
  filterType: 'stock',
  id: 'stock-id',
  name: 'Stock Quantity',
  checked: false,
  selected: [],
}

export const settledProductTypesFilter: Filter = {
  filterType: 'product-types',
  id: 'product-types-id',
  name: 'Product Types',
  checked: false,
  selected: [],
}

export const settledCollectionsFilter: Filter = {
  filterType: 'collection',
  id: 'collection-id',
  name: 'Collections',
  checked: false,
  selected: [],
}

export const settledPriceFilter: Filter = {
  filterType: 'price',
  id: 'price-id',
  name: 'Price',
  checked: false,
  selected: [],
}

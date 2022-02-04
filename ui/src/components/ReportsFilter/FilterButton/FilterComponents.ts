import {
  AttributeFilter,
  CategoriesFilter,
  CollectionsFilter,
  PriceFilter,
  ProductTypesFilter,
  ReleaseFilter,
  SignedFilter,
  StockFilter,
} from '../Filters'
import ChannelsFilter from '../Filters/ChannelsFilter'

export const FilterComponents: Record<string, (props: any) => JSX.Element> = {
  attribute: AttributeFilter,
  category: CategoriesFilter,
  channel: ChannelsFilter,
  release: ReleaseFilter,
  signed: SignedFilter,
  stock: StockFilter,
  'product-types': ProductTypesFilter,
  collection: CollectionsFilter,
  price: PriceFilter,
}

export default FilterComponents

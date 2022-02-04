export interface Attribute {
  id: string
  name: string
  slug: string
}

export interface Channel {
  id: string
  name: string
  isActive: boolean
  slug: string
  currencyCode: string
}

export interface Warehouse {
  id: string
  name: string
  slug: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Collection {
  id: string
  name: string
  slug: string
}

export interface ProductType {
  id: string
  name: string
  slug: string
}

export interface AttributeValue {
  id: string
  name: string
  slug: string
}

export interface Node<T> {
  node: T
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface Group {
  id: string
  name: string
}

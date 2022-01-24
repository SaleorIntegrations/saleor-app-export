import { gql } from 'urql'

export const ChannelFragment = gql`
  fragment ChannelFragment on Channel {
    id
    isActive
    name
    slug
    currencyCode
  }
`

export const WarehouseFragment = gql`
  fragment WarehouseFragment on Warehouse {
    id
    name
    slug
  }
`

export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`

export const AttributeFragment = gql`
  fragment AttributeFragment on Attribute {
    id
    name
    slug
  }
`

export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    slug
  }
`

export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    id
    name
    slug
  }
`

export const ProductTypeFragment = gql`
  fragment ProductTypeFragment on ProductType {
    id
    name
    slug
  }
`

export const AttributeValueFragment = gql`
  fragment AttributeValueFragment on AttributeValue {
    id
    name
    slug
  }
`

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
  }
`

export const GroupFragment = gql`
  fragment GroupFragment on Group {
    id
    name
  }
`

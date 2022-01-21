import { gql } from 'urql'

export const SelectedColumnsInfoFragment = gql`
  fragment SelectedColumnsInfoFragment on SelectedColumnsInfo {
    ... on ProductSelectedColumnsInfo {
      productFields: fields
      attributes
      warehouses
      channels
    }
    ... on OrderSelectedColumnsInfo {
      orderFields: fields
    }
    __typename
  }
`
export const RecipientInfoFragment = gql`
  fragment RecipientInfoFragment on RecipientInfo {
    users
    permissionGroups
  }
`

export const ReportFragment = gql`
  ${SelectedColumnsInfoFragment}
  ${RecipientInfoFragment}
  fragment ReportFragment on Report {
    id
    name
    type
    filter
    columns {
      ...SelectedColumnsInfoFragment
    }
    recipients {
      ...RecipientInfoFragment
    }
    __typename
  }
`

export const ReportErrorFragment = gql`
  fragment ReportErrorFragment on ReportError {
    code
    message
    field
    __typename
  }
`

export const JobFragment = gql`
  ${ReportFragment}
  fragment JobFragment on Job {
    id
    createdAt
    report {
      ...ReportFragment
    }
    __typename
  }
`

export const ReportEdgeFragment = gql`
  ${ReportFragment}
  fragment ReportEdgeFragment on ReportEdge {
    node {
      ...ReportFragment
    }
  }
`

export const PageInfoFragment = gql`
  fragment PageInfoFragment on PageInfo {
    hasNext
    endCursor
  }
`

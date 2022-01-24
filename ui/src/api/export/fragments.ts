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
  }
`

export const ReportErrorFragment = gql`
  fragment ReportErrorFragment on ReportError {
    code
    message
    field
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

import { Order } from '../table/components/ReportTable/utils'

export function sortTable<T>(array: T[], orderBy: string, order: Order): T[] {
  const estimateDirection = (a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getDirection =
    order === 'desc'
      ? (a: T, b: T) => estimateDirection(a, b, orderBy as any)
      : (a: T, b: T) => -estimateDirection(a, b, orderBy as any)

  const arrayCopy = [...array]
  return arrayCopy.sort((a, b) => {
    const order = getDirection(a, b)
    if (order !== 0) return order
    return array.indexOf(a) - array.indexOf(b)
  })
}

export default sortTable

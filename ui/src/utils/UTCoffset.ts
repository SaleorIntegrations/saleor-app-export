import date from './date'

const withSign = (offset: number) => (offset > 0 ? '+' + offset : offset)

export const getLocalOffset = () =>
  withSign(Math.floor(date().utc().local().utcOffset() / 60))

export const getOffset = (timezone: string) =>
  withSign(Math.floor(date().utc().tz(timezone).utcOffset() / 60))

const defaultGet = {
  getLocalOffset,
  getOffset,
}

export default defaultGet

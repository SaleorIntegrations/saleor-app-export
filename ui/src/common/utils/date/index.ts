import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'

const date = dayjs
date.extend(utc)
date.extend(timezone)
date.extend(relativeTime)
date.extend(localeData)

export default date

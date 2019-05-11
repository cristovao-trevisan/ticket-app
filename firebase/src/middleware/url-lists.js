const WHITE_LIST = [
  '/query/search',
  '/query/showcase',
  '/query/event-info',
  '/query/top-tags',
]
const BLACK_LIST = [
  '/event/reservation.on-numbered-seat-change',
  '/event/reservation.on-seat-area-amount-change',
  '/query/reserve-numbered-seat',
  '/query/reserve-seat-area',
  '/query/un-reserve-numbered-seat',
  '/query/un-reserve-seat-area',
]
export const whiteList = (rawUrl) => {
  const url = rawUrl.replace(/\?.*/, '')
  return WHITE_LIST.includes(url)
}
export const blacklist = (rawUrl) => {
  const url = rawUrl.replace(/\?.*/, '')
  return BLACK_LIST.includes(url)
}

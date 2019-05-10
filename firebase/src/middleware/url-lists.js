const WHITE_LIST = [
  '/query/search',
  '/query/showcase',
  '/query/event-info',
  '/query/top-tags',
]
const BLACK_LIST = [
  '/event/reservation.do-reserve-numbered-seat',
  '/event/reservation.do-un-reserve-numbered-seat',
  '/event/reservation.on-seat-area-amount-change',
]
export const whiteList = (rawUrl) => {
  const url = rawUrl.replace(/\?.*/, '')
  return WHITE_LIST.includes(url)
}
export const blacklist = (rawUrl) => {
  const url = rawUrl.replace(/\?.*/, '')
  return BLACK_LIST.includes(url)
}
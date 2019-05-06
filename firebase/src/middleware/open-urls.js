const OPEN_URLS = [
  '/query/search',
  '/query/showcase',
  '/query/event-info',
  '/query/top-tags',
]
export default (rawUrl) => {
  const url = rawUrl.replace(/\?.*/, '')
  return OPEN_URLS.includes(url)
}
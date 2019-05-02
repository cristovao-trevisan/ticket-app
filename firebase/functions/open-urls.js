const OPEN_URLS = [
  '/query/search',
  '/query/showcase',
  '/query/event-info',
]
module.exports = (rawUrl) => {
  const url = rawUrl.replace(/\?.*/, '')
  return OPEN_URLS.includes(url)
}
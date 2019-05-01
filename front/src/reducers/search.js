import { parse, stringify } from 'query-string'
import { COMMIT_SEARCH_VALUE, SET_SEARCH_VALUE } from '../constants/action-types'

const tagsRegex = /#[^ ]+/g
const extractStateFromValue = (value) => {
  const tags = (value.match(tagsRegex) || []) // find tags
    .map(tag => tag.slice(1)) // remove the leading #
  const parsedText = value
    .replace(tagsRegex, '') // remove tags
    .replace(/ {2,}/g, ' ') // remove extra white spaces
    .trim()
  const text = parsedText ? parsedText.split(' ') : []
  console.log({ value, parsedText, text })
  return { tags, text }
}

const buildValueFromSearchQuery = ({ tags, text }) => tags
  .map(tag => `#${tag}`)
  .join(' ')
  .concat(' ', text.join(' '))

const initialState = {
  tags: [],
  text: [],
  temp: '',
}

export default (state = null, action) => {
  const history = action.history || { location: window.location }
  if (state === null) {
    const { searchTags = '', searchText = '' } = parse(history.location.search)
    if (!searchTags && !searchText) return initialState

    const tags = searchTags ? searchTags.split(',') : []
    const text = searchText ? searchText.split(',') : []
    const temp = buildValueFromSearchQuery({ tags, text })
    return { tags, text, temp }
  }
  switch (action.type) {
    case SET_SEARCH_VALUE: {
      return {
        ...state,
        temp: action.value,
      }
    }
    case COMMIT_SEARCH_VALUE: {
      const newState = {
        ...extractStateFromValue(action.value),
        temp: action.value,
      }
      const search = parse(history.location.search)
      // eslint-disable-next-line no-param-reassign
      history.push({
        search: stringify({
          ...search,
          searchTags: newState.tags.join(',') || undefined,
          searchText: newState.text.join(',') || undefined,
        }),
      })
      return newState
    }
    default:
      return state
  }
}

import { registerNamespacedResource, registerResource } from '@async-resource/redux'

import eventSeats from './event-seats'
import eventInfo from './event-info'
import showcase from './showcase'
import topTags from './top-tags'

registerNamespacedResource('eventSeats', {
  source: async () => eventSeats,
})

registerNamespacedResource('eventInfo', {
  source: async () => eventInfo,
})

registerResource('showcase', {
  source: async () => showcase,
})

registerResource('topTags', {
  source: async () => topTags,
})

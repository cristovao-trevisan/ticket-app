import { registerNamespacedResource, registerResource } from '@async-resource/redux'
import { storage } from 'firebase/app'
import 'firebase/storage'

import eventSeats from './event-seats'
import eventInfo from './event-info'
import showcase from './showcase'
import topTags from './top-tags'
import { getRandomEvents } from './events'

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

registerNamespacedResource('search', {
  source: async () => getRandomEvents(),
})

registerNamespacedResource('images', {
  source: ({ namespace }) => storage().ref(namespace).getDownloadURL(),
})

import { registerNamespacedResource, registerResource } from '@async-resource/redux'

import eventSeats from './event-seats'
import eventSeatsPricing from './event-seats-pricing'
import showcase from './showcase'
import topTags from './top-tags'

registerNamespacedResource('eventSeats', {
  source: async () => eventSeats,
})

registerNamespacedResource('eventSeatsPricing', {
  source: async ({ namespace }) => eventSeatsPricing
    .find(({ seat }) => seat === Number(namespace)),
})

registerResource('showcase', {
  source: async () => showcase,
})

registerResource('topTags', {
  source: async () => topTags,
})

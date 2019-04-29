import { registerNamespacedResource, registerResource } from '@async-resource/redux'

import eventSeats from './event-seats'
import eventSeatsPricing from './event-seats-pricing'
import showcase from './showcase'

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

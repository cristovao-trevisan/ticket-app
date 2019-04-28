import { registerNamespacedResource } from '@async-resource/redux'

import eventSeats from './event-seats'
import eventSeatsPricing from './event-seats-pricing'

registerNamespacedResource('eventSeats', {
  source: async () => eventSeats,
})

registerNamespacedResource('eventSeatsPricing', {
  source: async ({ namespace }) => eventSeatsPricing
    .find(({ seat }) => seat === Number(namespace)),
})

import { registerNamespacedResource } from '@async-resource/redux'

// TODO: plugin real resources

registerNamespacedResource('eventSeats', {
  source: () => null,
})

registerNamespacedResource('eventSeatsPricing', {
  source: async () => null,
})

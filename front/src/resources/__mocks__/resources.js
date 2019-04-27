import { registerNamespacedResource } from '@async-resource/redux'
import eventSeats from './event-seats'

registerNamespacedResource('eventSeats', {
  source: async () => eventSeats,
})

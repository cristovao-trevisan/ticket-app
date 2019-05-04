import { registerNamespacedResource, registerResource } from '@async-resource/redux'
import request from './request'

registerNamespacedResource('eventSeats', {
  source: ({ namespace }) => request('/query/event-seats', { id: namespace }),
})

registerNamespacedResource('eventInfo', {
  source: async ({ namespace }) => request('/query/event-info', { id: namespace }),
})

registerResource('showcase', {
  source: async () => request('/query/showcase', undefined, 'GET', true),
})

registerResource('topTags', {
  source: async () => request('/query/top-tags', undefined, 'GET', true),
})

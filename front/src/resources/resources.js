import { registerNamespacedResource, registerResource } from '@async-resource/redux'
import request from './request'

registerNamespacedResource('eventSeats', {
  source: ({ namespace }) => request('/query/event-seats', { id: namespace }),
})

registerNamespacedResource('eventInfo', {
  source: ({ namespace }) => request('/query/event-info', { id: namespace }),
})

registerResource('showcase', {
  source: () => request('/query/showcase', {}, 'GET', true),
})

registerResource('topTags', {
  source: () => request('/query/top-tags', {}, 'GET', true),
})

registerNamespacedResource('search', {
  source: ({ namespace }) => request('/query/search', { query: namespace }, 'GET', true),
})

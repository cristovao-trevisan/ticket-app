import { registerNamespacedResource, registerResource } from '@async-resource/redux'
import { storage } from 'firebase/app'
import 'firebase/storage'

import request from './request'

registerNamespacedResource('eventSeats', {
  source: ({ namespace }) => request('/query/event-seats', { id: namespace }),
})

registerNamespacedResource('eventInfo', {
  source: ({ namespace }) => request('/query/event-info', { id: namespace }),
})

registerResource('showcase', {
  source: () => request('/query/showcase', {}, 'GET', { isArray: true }),
})

registerResource('topTags', {
  source: () => request('/query/top-tags', {}, 'GET', { isArray: true }),
})

registerNamespacedResource('search', {
  source: ({ namespace }) => request('/query/search', { query: namespace }, 'GET', { isArray: true }),
})

registerNamespacedResource('images', {
  source: ({ namespace }) => storage().ref(namespace).getDownloadURL(),
})

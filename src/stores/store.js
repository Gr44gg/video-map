import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    popup: {
      show: false,
      has_video: null,
      id: null
    }
  }),
})
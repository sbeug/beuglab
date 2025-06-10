import { defineStore } from 'pinia'
import { sanity } from '@/assets/js/sanity.js'

export const useAlumniStore = defineStore('alumni', {
  state: () => ({
    alumni: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAlumni() {
      this.loading = true
      this.error = null

      try {
        const query = `*[_type == "alumnus"]`

        const alumni = await sanity.fetch(query)

        this.alumni = alumni
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },
})

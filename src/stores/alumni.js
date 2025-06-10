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
        // Debug query - try this first to see all content types
        const debugQuery = `*[_type == "alumnus"]`
        console.log('Fetching alumni with query:', debugQuery)

        const alumni = await sanity.fetch(debugQuery)
        console.log('Raw alumni data:', alumni)

        this.alumni = alumni
      } catch (error) {
        this.error = error.message
        console.error('Error fetching alumni:', error)
      } finally {
        this.loading = false
      }
    },
    // Alternative method to check what content types exist
    async debugContentTypes() {
      try {
        const query = `*[]{_type}`
        const types = await sanity.fetch(query)
        const uniqueTypes = [...new Set(types.map((t) => t._type))]
        console.log('Available content types:', uniqueTypes)
      } catch (error) {
        console.error('Error fetching content types:', error)
      }
    },
  },
})

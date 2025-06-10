import { defineStore } from 'pinia'
import { sanity, urlFor } from '@/assets/js/sanity.js'

export const useTeamStore = defineStore('team', {
  state: () => ({
    members: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchTeamMembers() {
      this.loading = true
      this.error = null
      try {
        const data = await sanity.fetch(`*[_type == "teamMember"]{
          _id,
          number,
          name,
          edu,
          title,
          headshot,
          bio,
          linkedin,
          cheo
        }`)

        this.members = data.map((member) => ({
          id: member.number,
          name: member.name,
          edu: member.edu,
          title: member.title,
          headshot: urlFor(member.headshot).url(),
          bio: member.bio,
          linkedin: member.linkedin,
          cheo: member.cheo,
        }))
      } catch (error) {
        this.error = error.message
        console.error('Error fetching team members:', error)
      } finally {
        this.loading = false
      }
    },
  },
})

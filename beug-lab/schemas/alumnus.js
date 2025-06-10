export default {
  name: 'alumnus',
  title: 'Alumni',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'title', title: 'Title', type: 'string'},
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}

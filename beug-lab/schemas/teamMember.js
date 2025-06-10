export default {
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    {name: 'id', title: '#', type: 'number'},
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'edu', title: 'Education', type: 'string'},
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'headshot', title: 'Profile Picture', type: 'image'},
    {name: 'bio', title: 'Biography', type: 'text'},
    {name: 'linkedin', title: 'LinkedIn', type: 'url'},
    {name: 'cheo', title: 'Cheo RI Link', type: 'url'},
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}

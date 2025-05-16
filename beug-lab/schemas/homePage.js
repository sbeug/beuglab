export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {name: 'sectionOneTitle', title: 'Section 1 Title', type: 'string'},
    {name: 'sectionOneText', title: 'Section 1 Text', type: 'text'},
    {name: 'sectionTwoTitle', title: 'Section 2 Title', type: 'string'},
    {name: 'sectionTwoText', title: 'Section 2 Text', type: 'text'},
    {name: 'teamDescription', title: 'Team Description', type: 'text'},
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
        subtitle: 'Main page of the website',
      }
    },
  },
}

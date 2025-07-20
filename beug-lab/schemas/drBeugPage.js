export default {
  name: 'drBeugPage',
  title: 'Dr. Beug Page',
  type: 'document',
  fields: [
    {name: 'bio', title: 'Bio', type: 'text'},
    {name: 'positionOneH3', title: 'Position One Heading', type: 'string'},
    {name: 'positionOneText', title: 'Position One Text', type: 'text'},
    {name: 'positionTwoH3', title: 'Position Two Heading', type: 'string'},
    {name: 'positionTwoText', title: 'Position Two Text', type: 'text'},
    {name: 'positionThreeH3', title: 'Position Three Heading', type: 'string'},
    {name: 'positionThreeText', title: 'Position Three Text', type: 'text'},
    {name: 'researchHeading', title: 'Research Heading', type: 'string'},
    {name: 'researchText', title: 'Research Text', type: 'text'},
    {name: 'areaOne', title: 'Area of Study One', type: 'string'},
    {name: 'areaTwo', title: 'Area of Study Two', type: 'string'},
    {name: 'areaThree', title: 'Area of Study Three', type: 'string'},
    {name: 'goal', title: 'Goal', type: 'text'},
    {name: 'sectionHeadingOne', title: 'Section Heading', type: 'string'},
    {name: 'sectionTextOne', title: 'Section Text', type: 'text'},
    {name: 'sectionHeadingTwo', title: 'Section Heading', type: 'string'},
    {name: 'sectionTextTwo', title: 'Section Text', type: 'text'},
  ],
  preview: {
    prepare() {
      return {
        title: 'Dr. Beug Page',
        subtitle: 'The page dedicated to Dr. Beug',
      }
    },
  },
}

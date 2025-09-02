export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'aboutTitle',
      title: 'About Us Title',
      type: 'string',
      description: 'The main title for the about us section',
      validation: Rule => Rule.required()
    },
    {
      name: 'aboutDescription',
      title: 'About Us Description',
      type: 'text',
      description: 'Main description text about the lab and research focus',
      validation: Rule => Rule.required()
    },
    {
      name: 'teamPhoto',
      title: 'Team Photo',
      type: 'image',
      description: 'Main team photo displayed in the about section',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
          validation: Rule => Rule.required()
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
        subtitle: 'About us content and research description',
      }
    },
  },
}
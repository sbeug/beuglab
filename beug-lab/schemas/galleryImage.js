export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive title for the image'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Alternative text for accessibility'
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional description of what\'s happening in the image'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this image should appear in the gallery'
    },
    {
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Mark as featured to highlight in the gallery',
      initialValue: false
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      order: 'order'
    },
    prepare(selection) {
      const {title, media, order} = selection
      return {
        title: title,
        subtitle: `Order: ${order}`,
        media: media
      }
    }
  }
}
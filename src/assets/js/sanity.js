import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'namu0uk3',
  dataset: 'production',
  apiVersion: 'v2025-07-10',
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source) {
  return builder.image(source)
}

export default sanity

import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'namu0uk3',
  dataset: 'production',
  apiVersion: 'v2025-05-16',
  useCdn: true,
})

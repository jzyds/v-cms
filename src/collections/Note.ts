import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Note: CollectionConfig = {
  slug: 'note',
  access: {
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: anyone,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'topic',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content_json',
      type: 'json',
    },
    {
      name: 'published',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}

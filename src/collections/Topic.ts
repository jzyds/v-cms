import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Topic: CollectionConfig = {
  slug: 'topic',
  access: {
    create: anyone,
    delete: authenticated,
    read: anyone,
    update: anyone,
  },
  admin: {
    useAsTitle: 'input',
  },
  fields: [
    {
      name: 'input',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      // rewriter 不带原始链接， intruducer 带原始链接， content_generator 新创造内容
      options: ['rewriter', 'intruducer', 'content_generator'],
      required: true,
    },
    {
      name: 'published',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}

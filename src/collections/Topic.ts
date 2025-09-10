import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

async function createTopicIfNotExists(
  req: any,
  data: { input: string; type: 'rewriter' | 'intruducer' | 'content_generator' },
) {
  const { input, type } = data
  if (!input) {
    throw new Error('no input')
  }
  if (!type) {
    throw new Error('no type')
  }
  const find = await req.payload.find({
    collection: 'topic',
    where: { input: { equals: input } },
  })
  if (find.docs.length > 0) {
    return {
      data: { exists: true, data: find.docs },
    }
  }
  const created = await req.payload.create({
    collection: 'topic',
    data: {
      input,
      type,
      published: 0,
    },
  })
  return {
    data: { exists: false, data: created },
  }
}

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
  endpoints: [
    {
      path: '/find-by-input/:input',
      method: 'get',
      handler: async (req) => {
        if (!req.routeParams) {
          return Response.json({ error: 'bad request' }, { status: 400 })
        }
        const find = await req.payload.find({
          collection: 'topic',
          where: { input: { equals: req.routeParams.input as string } },
        })
        if (find.docs.length === 0) {
          return Response.json({ error: 'not found' }, { status: 404 })
        }
        return Response.json({ data: find.docs }, { status: 200 })
      },
    },
    {
      path: '/create-if-not-exists/single',
      method: 'post',
      handler: async (req) => {
        // https://payloadcms.com/docs/rest-api/overview

        // `data` is not automatically appended to the request
        // if you would like to read the body of the request
        // you can use `data = await req.json()`
        if (!req.json) {
          return Response.json({ error: 'no req body' }, { status: 400 })
        }
        const data = await req.json()
        try {
          const created = await createTopicIfNotExists(req, data)
          return Response.json(
            {
              data: created,
            },
            { status: 200 },
          )
        } catch (e) {
          return Response.json({ error: (e as Error).message }, { status: 400 })
        }
      },
    },
    {
      path: '/create-if-not-exists/batch',
      method: 'post',
      handler: async (req) => {
        if (!req.json) {
          return Response.json({ error: 'no req body' }, { status: 400 })
        }
        const data = await req.json()

        const { items } = data as {
          items?: string
        }

        try {
          const parsed = JSON.parse(items || '[]') as {
            input: string
            type: 'rewriter' | 'intruducer' | 'content_generator'
          }[]
          const results = []
          for (const item of parsed || []) {
            try {
              const createdResult = await createTopicIfNotExists(req, item)
              results.push(createdResult)
            } catch (e) {
              results.push({ item, error: (e as Error).message })
            }
          }
          return Response.json({ results }, { status: 200 })
        } catch (e) {
          return Response.json({ error: 'items is not valid json' }, { status: 400 })
        }
      },
    },
  ],
}

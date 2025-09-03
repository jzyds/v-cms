import type { TextField } from 'payload'

type Markdown = () => [TextField]

export const markdownField: Markdown = () => {
  const markdownField: TextField = {
    name: 'markdown',
    type: 'text',
    admin: {
      components: {
        Field: {
          path: '@/fields/MarkdownComponent#MarkdownComponent',
        },
      },
    },
  }

  return [markdownField]
}

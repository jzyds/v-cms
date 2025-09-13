import { getPayload } from 'payload'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import NoteContent from '@/components/NoteContent'
import ClientWrapper from '@/components/NoteContent/ClientWrapper'
import HtmlViewer from '@/components/NoteContent/HtmlViewer'
import JsonViewer from '@/components/NoteContent/JsonViewer'
import Tabs from '@/components/ui/tabs'

interface NoteContentData {
  title: string
  intro: string
  body: Array<{
    section_title: string
    content: string
  }>
  conclusion: {
    interactive_prompt: string
    save_reason: string
  }
  tags: string[]
  images: Array<{
    description: string
    caption: string
  }>
}

type Args = {
  params: Promise<{
    id?: string
  }>
}

const queryNoteBySlug = cache(async ({ id }: { id: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'note',
    limit: 1,
    pagination: false,
    where: {
      id: {
        equals: id,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function Page({ params: paramsPromise }: Args) {
  const { id = '' } = await paramsPromise
  const note = await queryNoteBySlug({ id })
  if (!note) {
    return <div>Note not found</div>
  }
  if (!note.content_json) {
    return <div>No content</div>
  }

  // Type guard to check if content_json has the expected structure
  const isValidContent = (content: any): content is NoteContentData => {
    return (
      content &&
      typeof content === 'object' &&
      typeof content.title === 'string' &&
      typeof content.intro === 'string' &&
      Array.isArray(content.body) &&
      content.conclusion &&
      Array.isArray(content.tags) &&
      Array.isArray(content.images)
    )
  }

  if (!isValidContent(note.content_json)) {
    return <div>Invalid content format</div>
  }

  const tabs = [
    {
      id: 'styled',
      label: '样式预览',
      content: (
        <ClientWrapper>
          <NoteContent content={note.content_json} />
        </ClientWrapper>
      ),
    },
    {
      id: 'html',
      label: '纯HTML',
      content: <HtmlViewer content={note.content_json} />,
    },
    {
      id: 'json',
      label: 'JSON数据',
      content: <JsonViewer content={note.content_json} />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Tabs tabs={tabs} defaultTab="styled" />
      </div>
    </div>
  )
}

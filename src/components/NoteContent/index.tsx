import React from 'react'

interface ContentSection {
  section_title: string
  content: string
}

interface ImageData {
  description: string
  caption: string
}

interface NoteContentData {
  title: string
  intro: string
  body: ContentSection[]
  conclusion: {
    interactive_prompt: string
    save_reason: string
  }
  tags: string[]
  images: ImageData[]
}

interface NoteContentProps {
  content: NoteContentData
}

const NoteContent: React.FC<NoteContentProps> = ({ content }) => {
  const renderInlineContent = (text: string) => {
    // Handle bold text (text between **) without wrapping in p tags
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, partIndex) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={partIndex}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  const renderContent = (text: string) => {
    // Split by line breaks and render each line
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />
      }

      return (
        <p key={index} className="mb-4">
          {renderInlineContent(line)}
        </p>
      )
    })
  }

  const renderTips = (text: string) => {
    const lines = text.split('\n')
    return lines.map((line, index) => {
      if (line.trim() === '') return <br key={index} />

      if (line.includes('✅') || line.includes('💡')) {
        return (
          <div
            key={index}
            className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-4"
          >
            <p className="text-green-800">{renderInlineContent(line)}</p>
          </div>
        )
      }

      return (
        <p key={index} className="mb-2">
          {renderInlineContent(line)}
        </p>
      )
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">{content.title}</h1>

      {/* Introduction */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
        <div className="text-lg text-gray-700 leading-relaxed">{renderContent(content.intro)}</div>
      </div>

      {/* Body Sections */}
      {content.body.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">
            {section.section_title}
          </h2>
          <div className="text-gray-700 leading-relaxed">{renderTips(section.content)}</div>
        </div>
      ))}

      {/* Conclusion */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
          <p className="font-semibold text-yellow-800">{content.conclusion.interactive_prompt}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-green-800">{content.conclusion.save_reason}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Images */}
      {content.images && content.images.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">配图说明</h3>
          {content.images.map((image, index) => (
            <div
              key={index}
              className="bg-gray-100 border-2 border-dashed border-gray-300 p-8 rounded-lg text-center"
            >
              <div className="text-gray-600 mb-4">[图片：{image.description}]</div>
              <div className="text-gray-700 italic">{image.caption}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteContent

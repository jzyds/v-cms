'use client'

import React from 'react'

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

interface HtmlViewerProps {
  content: NoteContentData
}

const HtmlViewer: React.FC<HtmlViewerProps> = ({ content }) => {
  const generateHtml = (data: NoteContentData): string => {
    let html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .article-container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            font-size: 2.2em;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        .intro {
            font-size: 1.1em;
            color: #555;
            margin-bottom: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            border-radius: 0 8px 8px 0;
        }
        h2 {
            color: #2c3e50;
            font-size: 1.5em;
            margin: 30px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }
        .content {
            margin-bottom: 25px;
            font-size: 1em;
        }
        .tips {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 4px solid #27ae60;
        }
        .highlight {
            background: #fff3cd;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 4px solid #ffc107;
        }
        .conclusion {
            background: #e3f2fd;
            padding: 20px;
            border-radius: 8px;
            margin: 30px 0;
            border-left: 4px solid #2196f3;
        }
        .tags {
            margin: 20px 0;
        }
        .tag {
            display: inline-block;
            background: #3498db;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            margin: 4px 4px 4px 0;
        }
        .image-placeholder {
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            padding: 40px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
            color: #6c757d;
        }
        .image-caption {
            font-style: italic;
            color: #666;
            margin-top: 10px;
            text-align: center;
        }
        .interactive-prompt {
            background: #fff3cd;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            font-weight: bold;
            color: #856404;
        }
        .save-reason {
            background: #d4edda;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            color: #155724;
        }
    </style>
</head>
<body>
    <div class="article-container">
        <h1>${data.title}</h1>
        
        <div class="intro">
            ${data.intro.replace(/\n/g, '<br><br>')}
        </div>`

    // Add body sections
    data.body.forEach((section) => {
      html += `
        <h2>${section.section_title}</h2>
        <div class="content">
            ${section.content.replace(/\n/g, '<br>')}
        </div>`
    })

    // Add conclusion
    html += `
        <div class="conclusion">
            <div class="interactive-prompt">
                ${data.conclusion.interactive_prompt}
            </div>
            <div class="save-reason">
                ${data.conclusion.save_reason}
            </div>
        </div>

        <div class="tags">
            ${data.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>`

    // Add images
    if (data.images && data.images.length > 0) {
      html += `
        <h3>配图说明</h3>`
      data.images.forEach((image) => {
        html += `
        <div class="image-placeholder">
            <div>[图片：${image.description}]</div>
            <div class="image-caption">${image.caption}</div>
        </div>`
      })
    }

    html += `
    </div>
</body>
</html>`

    return html
  }

  const htmlContent = generateHtml(content)

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">纯HTML预览</h3>
        <button
          onClick={() => {
            const blob = new Blob([htmlContent], { type: 'text/html' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${content.title}.html`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          下载HTML
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <span className="text-sm text-gray-600">HTML源码预览</span>
        </div>
        <pre className="p-4 bg-gray-50 text-sm overflow-auto max-h-96">
          <code className="text-gray-800">{htmlContent}</code>
        </pre>
      </div>
    </div>
  )
}

export default HtmlViewer

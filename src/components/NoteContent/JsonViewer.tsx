'use client'

import React, { useState } from 'react'

interface JsonViewerProps {
  content: any
}

const JsonViewer: React.FC<JsonViewerProps> = ({ content }) => {
  const [copied, setCopied] = useState(false)

  const formatJson = (obj: any): string => {
    return JSON.stringify(obj, null, 2)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatJson(content))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const downloadJson = () => {
    const blob = new Blob([formatJson(content)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'note-content.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">JSON数据</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className={`px-4 py-2 rounded-lg transition-colors ${
              copied ? 'bg-green-500 text-white' : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            {copied ? '已复制!' : '复制JSON'}
          </button>
          <button
            onClick={downloadJson}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            下载JSON
          </button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
          <span className="text-sm text-gray-600">格式化JSON数据</span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>总字段数: {Object.keys(content).length}</span>
            <span>•</span>
            <span>字符数: {formatJson(content).length}</span>
          </div>
        </div>

        <div className="relative">
          <pre className="p-4 bg-gray-50 text-sm overflow-auto max-h-96">
            <code className="text-gray-800 font-mono">{formatJson(content)}</code>
          </pre>
        </div>
      </div>

      {/* JSON结构分析 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-3">数据结构分析</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">主要字段:</h5>
            <ul className="space-y-1 text-gray-600">
              <li>• title: {typeof content.title}</li>
              <li>• intro: {typeof content.intro}</li>
              <li>• body: Array({content.body?.length || 0} 项)</li>
              <li>• conclusion: Object</li>
              <li>• tags: Array({content.tags?.length || 0} 项)</li>
              <li>• images: Array({content.images?.length || 0} 项)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">内容统计:</h5>
            <ul className="space-y-1 text-gray-600">
              <li>• 标题长度: {content.title?.length || 0} 字符</li>
              <li>• 介绍长度: {content.intro?.length || 0} 字符</li>
              <li>• 正文段落: {content.body?.length || 0} 个</li>
              <li>• 标签数量: {content.tags?.length || 0} 个</li>
              <li>• 图片数量: {content.images?.length || 0} 个</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JsonViewer

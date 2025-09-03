'use client'
import React, { useCallback } from 'react'
import { TextFieldClientProps } from 'payload'

import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from '@payloadcms/ui'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import MarkdownIt from 'markdown-it'

type MarkdownComponentProps = TextFieldClientProps

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

export const MarkdownComponent: React.FC<MarkdownComponentProps> = ({
  field,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field

  const { value, setValue } = useField<string>({ path: path || field.name })

  return (
    <div className="field-type Markdown-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
      </div>
      <MdEditor
        readOnly={Boolean(readOnlyFromProps)}
        value={value || ''}
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={function ({ html, text }: { html: string; text: string }) {
          setValue(text)
        }}
      />
    </div>
  )
}

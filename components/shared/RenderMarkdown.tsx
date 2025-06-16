import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RenderMarkdownProps {
    text: string
    className?: string
}

export default function RenderMarkdown({ text, className = '' }: RenderMarkdownProps) {
    return (
      <div className={`prose prose-invert prose-sm max-w-none ${className}`}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Custom styling for markdown elements
            h1: ({ children }) => <h1 className="text-lg font-bold text-white mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-semibold text-white mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-medium text-white mb-1">{children}</h3>,
            p: ({ children }) => <p className="text-slate-300 mb-2 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-2 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside text-slate-300 mb-2 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="text-slate-300">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
            em: ({ children }) => <em className="italic text-slate-200">{children}</em>,
            code: ({ children }) => <code className="bg-slate-700 px-1 py-0.5 rounded text-indigo-300 text-xs">{children}</code>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-slate-400 my-2">
                {children}
              </blockquote>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    )
}
'use client'

import { useState } from 'react'
import { Message } from '@/lib/types'
import CorrectionCard from './CorrectionCard'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'
  const [hovered, setHovered] = useState(false)
  const translation = message.corrections?.translation

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      {!isUser && message.corrections && (
        <CorrectionCard corrections={message.corrections} />
      )}
      <div className="relative max-w-[85%]">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed cursor-default select-text ${
            isUser
              ? 'bg-pink-500 text-white rounded-br-sm'
              : 'bg-white text-purple-900 rounded-bl-sm shadow-sm'
          }`}
        >
          {message.content}
        </div>

        {!isUser && translation && hovered && (
          <div className="absolute left-0 bottom-full mb-2 z-10 max-w-xs w-max">
            <div className="bg-purple-950 border border-purple-700 rounded-lg px-3 py-2 text-xs text-white/80 shadow-xl leading-relaxed">
              {translation}
            </div>
            <div className="w-2.5 h-2.5 bg-purple-950 border-r border-b border-purple-700 rotate-45 ml-4 -mt-1.5" />
          </div>
        )}
      </div>
    </div>
  )
}

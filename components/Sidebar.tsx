'use client'

import { Conversation } from '@/lib/types'

interface Props {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
}

export default function Sidebar({ conversations, activeId, onSelect, onNew, onDelete }: Props) {
  return (
    <div className="w-52 shrink-0 bg-purple-900 flex flex-col h-full">
      {/* Top pink accent bar */}
      <div className="h-1 bg-pink-500 w-full" />

      <div className="p-4">
        <button
          onClick={onNew}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm rounded-lg px-4 py-2.5 transition-colors"
        >
          + New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center rounded-lg ${
              activeId === conv.id ? 'bg-purple-700/50' : 'hover:bg-purple-700/30'
            }`}
          >
            <button
              onClick={() => onSelect(conv.id)}
              className="flex-1 text-left px-3 py-2 min-w-0"
            >
              <p className="text-sm text-white/80 truncate">{conv.title}</p>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
              className="opacity-0 group-hover:opacity-100 pr-2 text-white/30 hover:text-pink-400 transition-all shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

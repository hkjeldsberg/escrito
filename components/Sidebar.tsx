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
    <div className="w-60 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-3 border-b border-zinc-800">
        <button
          onClick={onNew}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 && (
          <p className="text-xs text-zinc-600 px-3 py-2">No conversations yet</p>
        )}
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group flex items-center gap-1 rounded-lg mb-0.5 ${
              activeId === conv.id ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
            }`}
          >
            <button
              onClick={() => onSelect(conv.id)}
              className="flex-1 text-left px-3 py-2 min-w-0"
            >
              <p className="text-xs font-medium text-zinc-300 truncate">{conv.title}</p>
              {conv.scenario && (
                <p className="text-xs text-zinc-600 truncate mt-0.5">{conv.scenario}</p>
              )}
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
              className="opacity-0 group-hover:opacity-100 p-2 text-zinc-600 hover:text-zinc-400 transition-all shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-zinc-800">
        <p className="text-xs text-zinc-700 font-medium tracking-widest uppercase">escrito</p>
      </div>
    </div>
  )
}

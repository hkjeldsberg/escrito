'use client'

import { Conversation } from '@/lib/types'

interface Props {
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  open?: boolean
  onClose?: () => void
}

export default function Sidebar({ conversations, activeId, onSelect, onNew, onDelete, open = false, onClose }: Props) {
  // Close the mobile drawer after an action; no-op on desktop where onClose is undefined.
  const select = (id: string) => { onSelect(id); onClose?.() }
  const create = () => { onNew(); onClose?.() }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/50 md:hidden ${open ? 'block' : 'hidden'}`}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 bg-purple-900 flex flex-col h-full transform transition-transform duration-200 ease-out
          md:static md:z-auto md:w-52 md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Top pink accent bar */}
        <div className="h-1 bg-pink-500 w-full" />

        <div className="p-4 flex items-center gap-2">
          <button
            onClick={create}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm rounded-lg px-4 py-2.5 transition-colors"
          >
            + New chat
          </button>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="md:hidden shrink-0 w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-purple-700/40 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
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
                onClick={() => select(conv.id)}
                className="flex-1 text-left px-3 py-2 min-w-0"
              >
                <p className="text-sm text-white/80 truncate">{conv.title}</p>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
                className="opacity-100 md:opacity-0 md:group-hover:opacity-100 pr-2 text-white/30 hover:text-pink-400 transition-all shrink-0"
                aria-label="Delete chat"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { Conversation, Message, Scenario } from '@/lib/types'
import Sidebar from '@/components/Sidebar'
import ChatWindow from '@/components/ChatWindow'
import MessageInput from '@/components/MessageInput'
import ScenarioSelector from '@/components/ScenarioSelector'

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  // Load conversations list
  useEffect(() => {
    fetch('/api/conversations')
      .then((r) => r.json())
      .then(setConversations)
      .catch(console.error)
  }, [])

  // Load messages when active conversation changes
  const loadMessages = useCallback(async (id: string) => {
    const res = await fetch(`/api/conversations/${id}`)
    const data = await res.json()
    setMessages(data)
  }, [])

  useEffect(() => {
    if (activeId) loadMessages(activeId)
    else setMessages([])
  }, [activeId, loadMessages])

  async function handleSelectScenario(scenario: Scenario) {
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: scenario.title, scenario: scenario.description }),
    })
    const conv: Conversation = await res.json()
    setConversations((prev) => [conv, ...prev])
    setActiveId(conv.id)
  }

  async function handleSend(text: string) {
    if (!activeId || loading) return
    setLoading(true)

    // Optimistic user message
    const tempMsg: Message = {
      id: `temp-${Date.now()}`,
      conversation_id: activeId,
      role: 'user',
      content: text,
      corrections: null,
      created_at: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, tempMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: activeId, userMessage: text }),
      })
      const assistantMsg: Message = await res.json()

      // Reload messages to get saved user msg id too
      await loadMessages(activeId)

      // Update conversation updated_at in sidebar
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId ? { ...c, updated_at: new Date().toISOString() } : c
        )
      )
    } catch (err) {
      console.error(err)
      setMessages((prev) => prev.filter((m) => m.id !== tempMsg.id))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/conversations/${id}`, { method: 'DELETE' })
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (activeId === id) setActiveId(null)
  }

  function handleNew() {
    setActiveId(null)
  }

  const activeConv = conversations.find((c) => c.id === activeId)

  return (
    <div className="flex h-full">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNew={handleNew}
        onDelete={handleDelete}
      />

      <div className="flex-1 flex flex-col min-h-0">
        {activeId ? (
          <>
            {/* Header */}
            <div className="shrink-0 border-b border-zinc-800 px-6 py-3">
              <h1 className="text-sm font-medium text-zinc-300 truncate">
                {activeConv?.title ?? 'Conversation'}
              </h1>
              {activeConv?.scenario && (
                <p className="text-xs text-zinc-600 mt-0.5 truncate">{activeConv.scenario}</p>
              )}
            </div>

            <ChatWindow messages={messages} loading={loading} />
            <MessageInput onSend={handleSend} disabled={loading} />
          </>
        ) : (
          <ScenarioSelector onSelect={handleSelectScenario} />
        )}
      </div>
    </div>
  )
}

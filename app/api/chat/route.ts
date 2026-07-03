import { NextRequest, NextResponse } from 'next/server'
import { anthropic, TUTOR_SYSTEM_PROMPT } from '@/lib/claude'
import { getSupabase } from '@/lib/supabase'
import { Message, ClaudeResponse } from '@/lib/types'

export async function POST(req: NextRequest) {
  const { conversationId, userMessage } = await req.json()

  if (!conversationId || !userMessage) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const supabase = getSupabase()

  // Save user message
  const { error: insertErr } = await supabase
    .schema('escrito')
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role: 'user',
      content: userMessage,
      corrections: null,
    })

  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 })

  // Fetch conversation history for context
  const { data: history } = await supabase
    .schema('escrito')
    .from('messages')
    .select('role, content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })

  const claudeMessages = (history as Pick<Message, 'role' | 'content'>[]).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }))

  // Call Claude
  const claudeResp = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: TUTOR_SYSTEM_PROMPT,
    messages: claudeMessages,
  })

  const rawText = claudeResp.content[0].type === 'text' ? claudeResp.content[0].text : '{}'

  let parsed: ClaudeResponse
  try {
    parsed = JSON.parse(rawText)
  } catch {
    parsed = {
      corrections: { hasErrors: false, errors: [], alternatives: [] },
      response: rawText,
    }
  }

  // Save assistant message
  const { data: savedMsg, error: saveErr } = await supabase
    .schema('escrito')
    .from('messages')
    .insert({
      conversation_id: conversationId,
      role: 'assistant',
      content: parsed.response,
      corrections: parsed.corrections,
    })
    .select()
    .single()

  if (saveErr) return NextResponse.json({ error: saveErr.message }, { status: 500 })

  // Update conversation updated_at
  await supabase
    .schema('escrito')
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId)

  return NextResponse.json(savedMsg)
}

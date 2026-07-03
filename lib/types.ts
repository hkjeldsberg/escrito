export interface Conversation {
  id: string
  title: string
  scenario: string | null
  created_at: string
  updated_at: string
}

export interface CorrectionError {
  original: string
  correction: string
  explanation: string
}

export interface Corrections {
  hasErrors: boolean
  errors: CorrectionError[]
  alternatives: string[]
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  corrections: Corrections | null
  created_at: string
}

export interface Scenario {
  title: string
  description: string
}

export interface ClaudeResponse {
  corrections: Corrections
  response: string
}

CREATE SCHEMA IF NOT EXISTS escrito;

CREATE TABLE escrito.conversations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL DEFAULT 'New Conversation',
  scenario    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE escrito.messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID NOT NULL REFERENCES escrito.conversations(id) ON DELETE CASCADE,
  role             TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content          TEXT NOT NULL,
  corrections      JSONB,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON escrito.messages(conversation_id);

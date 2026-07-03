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

-- Grant schema + table access to anon and authenticated roles
GRANT USAGE ON SCHEMA escrito TO anon, authenticated;
GRANT ALL ON escrito.conversations TO anon, authenticated;
GRANT ALL ON escrito.messages TO anon, authenticated;

-- Enable RLS (required to add policies)
ALTER TABLE escrito.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE escrito.messages ENABLE ROW LEVEL SECURITY;

-- Permissive policies — app is password-protected at the proxy layer
CREATE POLICY "allow_all_conversations" ON escrito.conversations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_messages" ON escrito.messages FOR ALL USING (true) WITH CHECK (true);

Product Requirement Document (PRD)
1. Project Overview
A simple, interactive web/mobile application that connects a user with an AI chatbot (powered by LLMs like Claude) tailored to act as a Latin American Spanish conversation partner. The app focuses on contextual learning, real-time error correction, and adaptive grammar practice.

2. Target Audience
Beginner to Intermediate Spanish learners who want to practice conversational, real-time Latin American Spanish without the pressure of a human tutor.

3. Core Features & Functional Requirements
3.1. Conversation Kick-off & Scenario Selection
The app must give the user a starting point to avoid "blank page syndrome."

AI-Suggested Scenarios: Upon opening a new chat, the AI generates 3–4 relevant Latin American context scenarios (e.g., Ordering tacos in Mexico City, Haggling at a market in Peru, Checking into a hostel).

User-Defined Scenario: A free-form text input allowing the user to type their own topic (e.g., "Let's talk about my upcoming weekend").

3.2. Adaptive Grammar & Tense Mixing
To ensure well-rounded language acquisition, the AI must not stick to just one tense.

The AI tutor will dynamically weave past, present, and future tenses into the conversation prompts to challenge the user's comprehension and conjugation skills.

3.3. Inline Correction & Feedback UI
This is the core learning mechanism. For every message the user sends, the AI provides feedback in English before continuing the conversation.

Error Detection: Highlight specific grammatical, vocabulary, or gender-agreement mistakes.

Alternative Phrasing: Suggest alternative ways to say the same thing (e.g., more natural phrasing, local Latin American slang, or more formal/traditional variants).

4. User Interface & Experience (UI/UX)
Given your focus on clean frontend design, the UI should be minimalist and highly scannable.

Proposed Chat Layout
Sidebar: History of past conversations and a "New Chat" button.

Main Chat Window: A clean timeline of bubbles.

Feedback Cards: To prevent clutter, AI corrections should be visually distinct from the AI's conversational response—ideally styled as a collapsible "Correction Card" right above or below the AI's actual Spanish reply.

Mockup Structure
+-------------------------------------------------------------+
| [New Chat]     |  Scenario: Ordering food in Medellín       |
|                |                                            |
| Past Chats...  |  [User]: Yo querer una empanada ayer.      |
|                |  ----------------------------------------  |
|                |  [AI Tutor Feedback (English)]:             |
|                |  • Error: Use past tense "quise" or        |
|                |    "quería" instead of the infinitive.     |
|                |  • Natural Alternative: "Me gustaría una..."|
|                |  ----------------------------------------  |
|                |  [AI Tutor]: ¡Claro! ¿De qué la quieres?    |
|                |  Mañana tendremos de carne y de pollo.     |
+-------------------------------------------------------------+
| [ Type your Spanish response here...                      ] |
+-------------------------------------------------------------+
5. Technical Architecture & Prompt Engineering (High-Level)
5.1. Tech Stack (Recommendation)
Frontend: React or Next.js (clean, component-based structure perfect for interactive UI elements).

Backend: A simple Node.js/Python server or serverless functions to handle API calls.

LLM API: Anthropic Claude API (highly capable of nuanced roleplay and strict system prompt adherence).

5.2. System Prompt Outline
To make this work seamlessly, the underlying LLM requires a tight system prompt.

System Prompt Paradigm:
"You are an expert Latin American Spanish tutor. Your goal is to hold a natural conversation while helping the user learn. For every user message:

Analyze it for grammatical errors. If errors exist, output a concise explanation in English.

Provide 1-2 alternative or more traditional ways to phrase what the user intended to say.

Respond to the user's statement in Spanish to keep the conversation going.

Actively mix past, present, and future tenses in your responses.

Keep your Spanish responses concise and appropriate for a learner."

6. Success Metrics (MVP)
Engagement: Average number of messages exchanged per session (> 10 turns).

User Retention: Daily or weekly active use for conversational practice.

Latency: API response time under 2.5 seconds to maintain conversational flow.
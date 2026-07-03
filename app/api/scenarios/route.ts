import { NextResponse } from 'next/server'
import { anthropic, SCENARIO_SYSTEM_PROMPT } from '@/lib/claude'

export async function GET() {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      system: SCENARIO_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: 'Generate 4 Latin American Spanish conversation scenarios for a language learner.',
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : '[]'
    const scenarios = JSON.parse(text)
    return NextResponse.json(scenarios)
  } catch (err) {
    console.error('Scenarios error:', err)
    return NextResponse.json(
      [
        { title: 'Ordering tacos in Mexico City', description: 'You\'re at a taqueria in the Condesa neighborhood, choosing from pastor, carnitas, and suadero.' },
        { title: 'Haggling at a market in Peru', description: 'Browse handmade textiles at Mercado de San Pedro in Cusco and negotiate a price.' },
        { title: 'Checking into a hostel in Colombia', description: 'Arrive at a hostal in Medellín\'s El Poblado and sort out your reservation.' },
        { title: 'Taking a taxi in Buenos Aires', description: 'Hail a remis and give directions to your destination in Palermo.' },
      ]
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = contactSchema.parse(body)

    // Get Flask backend URL from environment
    const flaskUrl = process.env.FLASK_API_URL

    if (!flaskUrl) {
      return NextResponse.json({ error: 'Flask backend URL not configured' }, { status: 500 })
    }

    // Forward request to Flask backend
    const response = await fetch(`${flaskUrl}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    const data = await response.json()

    return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

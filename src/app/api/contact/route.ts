import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  handleApiError,
  checkEnvVariable,
  parseJsonBody,
  ApiError,
  ErrorCode,
} from '@/lib/api/errorHandler'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export async function POST(request: NextRequest) {
  try {
    // Validate request
    const body = await parseJsonBody(request)

    // Validate and parse input
    const validatedData = contactSchema.parse(body)

    // Get Flask backend URL from environment
    const flaskUrl = checkEnvVariable('FLASK_API_URL')

    // Forward request to Flask backend with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch(`${flaskUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new ApiError(
          response.status,
          ErrorCode.SERVICE_UNAVAILABLE,
          'Failed to process email request'
        )
      }

      const data = await response.json()

      return NextResponse.json({ message: 'Email sent successfully', data }, { status: 200 })
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        503,
        ErrorCode.SERVICE_UNAVAILABLE,
        'Email service temporarily unavailable'
      )
    }
  } catch (error) {
    return handleApiError(error, '/api/contact')
  }
}

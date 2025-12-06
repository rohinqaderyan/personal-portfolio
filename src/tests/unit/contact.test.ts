import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from '@/app/api/contact/route'

// Mock the error handler module
vi.mock('@/lib/api/errorHandler', async () => {
  const actual = await vi.importActual('@/lib/api/errorHandler')
  return {
    ...actual,
  }
})

describe('POST /api/contact', () => {
  let originalEnv: string | undefined

  beforeEach(() => {
    originalEnv = process.env.FLASK_API_URL
    process.env.FLASK_API_URL = 'http://localhost:5000'
    vi.clearAllMocks()
  })

  afterEach(() => {
    if (originalEnv) {
      process.env.FLASK_API_URL = originalEnv
    } else {
      delete process.env.FLASK_API_URL
    }
  })

  describe('Valid requests', () => {
    it('accepts valid contact form submission', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, messageId: '123' }),
      })

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a test message for contact form',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(200)
      const body = await response.json()
      expect(body.message).toBe('Email sent successfully')
    })

    it('forwards contact data to Flask backend', async () => {
      const fetchMock = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      global.fetch = fetchMock

      const contactData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Another test message that is long enough',
      }

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      })

      await POST(request as any)

      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:5000/send-email',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contactData),
        })
      )
    })
  })

  describe('Validation errors', () => {
    it('rejects form with missing name', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'john@example.com',
          message: 'This is a test message for validation',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toBe('Validation failed')
    })

    it('rejects form with name too short', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'J',
          email: 'john@example.com',
          message: 'This is a test message for validation',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toBe('Validation failed')
    })

    it('rejects form with invalid email', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'not-an-email',
          message: 'This is a test message for validation',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toBe('Validation failed')
    })

    it('rejects form with message too short', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'short',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toBe('Validation failed')
    })

    it('includes validation error details', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'J',
          email: 'invalid',
          message: 'short',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.details).toBeDefined()
      expect(Array.isArray(body.details)).toBe(true)
    })
  })

  describe('Invalid request format', () => {
    it('rejects invalid JSON', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{invalid json}',
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toMatch(/Failed to parse|Invalid/)
    })

    it('rejects non-JSON content type', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'name=John&email=john@example.com',
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
      const body = await response.json()
      expect(body.error).toMatch(/Content-Type|application\/json/)
    })

    it('rejects empty request body', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '',
      })

      const response = await POST(request as any)

      expect(response.status).toBe(400)
    })
  })

  describe('Backend errors', () => {
    it('handles Flask backend service unavailable', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
      })

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message for backend error',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(503)
      const body = await response.json()
      expect(body.error).toBeDefined()
    })

    it('handles Flask backend timeout', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('AbortError'))

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message for timeout',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(503)
    })

    it('handles Flask backend network error', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'))

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message for network error',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(503)
    })
  })

  describe('Environment configuration', () => {
    it('requires FLASK_API_URL to be configured', async () => {
      delete process.env.FLASK_API_URL

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        }),
      })

      const response = await POST(request as any)

      expect(response.status).toBe(500)
      const body = await response.json()
      expect(body.error).toContain('environment')
    })

    it('uses custom FLASK_API_URL', async () => {
      process.env.FLASK_API_URL = 'http://custom-flask.example.com'

      const fetchMock = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })
      global.fetch = fetchMock

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        }),
      })

      await POST(request as any)

      expect(fetchMock).toHaveBeenCalledWith(
        'http://custom-flask.example.com/send-email',
        expect.any(Object)
      )
    })
  })
})

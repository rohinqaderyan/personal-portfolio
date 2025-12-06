import { describe, it, expect, vi } from 'vitest'
import {
  handleApiError,
  createErrorResponse,
  ApiError,
  ErrorCode,
  validateRequiredFields,
  checkEnvVariable,
} from '@/lib/api/errorHandler'
import { z } from 'zod'

describe('API Error Handler', () => {
  describe('createErrorResponse', () => {
    it('creates error response with all fields', () => {
      const response = createErrorResponse(400, 'Test error', { field: 'value' }, '/api/test')

      expect(response.error).toBe('Test error')
      expect(response.details).toEqual({ field: 'value' })
      expect(response.path).toBe('/api/test')
      expect(response.timestamp).toBeDefined()
    })

    it('creates error response without optional fields', () => {
      const response = createErrorResponse(400, 'Test error')

      expect(response.error).toBe('Test error')
      expect(response.details).toBeUndefined()
      expect(response.path).toBeUndefined()
      expect(response.timestamp).toBeDefined()
    })

    it('creates error response with array details', () => {
      const details = ['error1', 'error2']
      const response = createErrorResponse(400, 'Multiple errors', details)

      expect(response.details).toEqual(details)
    })
  })

  describe('ApiError class', () => {
    it('creates API error with status code and message', () => {
      const error = new ApiError(400, ErrorCode.BAD_REQUEST, 'Bad request')

      expect(error.statusCode).toBe(400)
      expect(error.code).toBe(ErrorCode.BAD_REQUEST)
      expect(error.message).toBe('Bad request')
      expect(error.name).toBe('ApiError')
    })

    it('creates API error with details', () => {
      const details = { field: 'email', reason: 'invalid' }
      const error = new ApiError(400, ErrorCode.VALIDATION_ERROR, 'Validation failed', details)

      expect(error.details).toEqual(details)
    })

    it('handles all error codes', () => {
      const codes = Object.values(ErrorCode)

      codes.forEach((code) => {
        const error = new ApiError(400, code, 'Test')
        expect(error.code).toBe(code)
      })
    })
  })

  describe('handleApiError - Zod validation errors', () => {
    it('handles ZodError and returns 400 status', () => {
      const schema = z.object({ email: z.string().email() })
      const result = schema.safeParse({ email: 'invalid' })

      if (!result.success) {
        const response = handleApiError(result.error, '/api/test')
        expect(response.status).toBe(400)
      }
    })

    it('extracts field names from validation errors', async () => {
      const schema = z.object({ email: z.string().email() })
      const result = schema.safeParse({ email: 'invalid' })

      if (!result.success) {
        const response = handleApiError(result.error)
        const body = await response.json()

        expect(body.error).toBe('Validation failed')
        expect(Array.isArray(body.details)).toBe(true)
        expect(body.details[0]).toHaveProperty('field')
        expect(body.details[0]).toHaveProperty('message')
      }
    })
  })

  describe('handleApiError - ApiError instances', () => {
    it('handles ApiError and returns correct status code', async () => {
      const error = new ApiError(404, ErrorCode.NOT_FOUND, 'Resource not found')
      const response = handleApiError(error)

      expect(response.status).toBe(404)

      const body = await response.json()
      expect(body.error).toBe('Resource not found')
    })

    it('includes error details in response', async () => {
      const details = { resourceId: '123' }
      const error = new ApiError(404, ErrorCode.NOT_FOUND, 'User not found', details)
      const response = handleApiError(error)

      const body = await response.json()
      expect(body.details).toEqual(details)
    })
  })

  describe('handleApiError - Standard Error objects', () => {
    it('handles JSON parsing errors', async () => {
      const error = new Error('JSON.parse error: unexpected token')
      const response = handleApiError(error)

      expect(response.status).toBe(400)

      const body = await response.json()
      expect(body.error).toBe('Invalid JSON in request body')
    })

    it('handles fetch errors', async () => {
      const error = new Error('fetch failed: network error')
      const response = handleApiError(error)

      expect(response.status).toBe(503)

      const body = await response.json()
      expect(body.error).toBe('External service unavailable')
    })

    it('returns generic error for development', async () => {
      const testEnv = vi.spyOn(process, 'env', 'get').mockReturnValue({
        NODE_ENV: 'development',
      } as any)

      const error = new Error('Something went wrong')
      const response = handleApiError(error)

      expect(response.status).toBe(500)

      const body = await response.json()
      expect(body.error).toBe('Something went wrong')

      testEnv.mockRestore()
    })

    it('masks error for production', async () => {
      const testEnv = vi.spyOn(process, 'env', 'get').mockReturnValue({
        NODE_ENV: 'production',
      } as any)

      const error = new Error('Database connection failed')
      const response = handleApiError(error)

      expect(response.status).toBe(500)

      const body = await response.json()
      expect(body.error).toBe('Internal server error')

      testEnv.mockRestore()
    })
  })

  describe('handleApiError - Unknown errors', () => {
    it('handles unknown error types', async () => {
      const error = null
      const response = handleApiError(error)

      expect(response.status).toBe(500)

      const body = await response.json()
      expect(body.error).toBe('An unexpected error occurred')
    })

    it('includes error type in details for unknown errors', async () => {
      const error = undefined
      const response = handleApiError(error)

      const body = await response.json()
      expect(body.details).toHaveProperty('errorType')
    })
  })

  describe('handleApiError - Path tracking', () => {
    it('includes path in error response when provided', async () => {
      const error = new ApiError(400, ErrorCode.BAD_REQUEST, 'Bad request')
      const response = handleApiError(error, '/api/contact')

      const body = await response.json()
      expect(body.path).toBe('/api/contact')
    })

    it('omits path when not provided', async () => {
      const error = new ApiError(400, ErrorCode.BAD_REQUEST, 'Bad request')
      const response = handleApiError(error)

      const body = await response.json()
      expect(body.path).toBeUndefined()
    })
  })

  describe('validateRequiredFields', () => {
    it('throws error when required field is missing', () => {
      const data = { name: 'John' }
      const required = ['name', 'email']

      expect(() => validateRequiredFields(data, required)).toThrow(ApiError)
    })

    it('does not throw when all required fields present', () => {
      const data = { name: 'John', email: 'john@example.com' }
      const required = ['name', 'email']

      expect(() => validateRequiredFields(data, required)).not.toThrow()
    })

    it('throws error with missing field names', () => {
      const data = { name: 'John' }
      const required = ['name', 'email', 'message']

      try {
        validateRequiredFields(data, required)
      } catch (error) {
        if (error instanceof ApiError) {
          expect(error.details).toHaveProperty('missing')
          expect((error.details as any).missing).toContain('email')
          expect((error.details as any).missing).toContain('message')
        }
      }
    })
  })

  describe('checkEnvVariable', () => {
    it('returns environment variable when set', () => {
      process.env.TEST_VAR = 'test-value'
      const value = checkEnvVariable('TEST_VAR')
      expect(value).toBe('test-value')
      delete process.env.TEST_VAR
    })

    it('returns default value when env var not set', () => {
      const value = checkEnvVariable('NONEXISTENT_VAR', 'default-value')
      expect(value).toBe('default-value')
    })

    it('throws error when variable not set and no default', () => {
      expect(() => checkEnvVariable('NONEXISTENT_VAR_NO_DEFAULT')).toThrow(ApiError)
    })

    it('throws error with variable name in message', () => {
      try {
        checkEnvVariable('MISSING_VAR')
      } catch (error) {
        if (error instanceof ApiError) {
          expect(error.message).toContain('MISSING_VAR')
        }
      }
    })
  })
})

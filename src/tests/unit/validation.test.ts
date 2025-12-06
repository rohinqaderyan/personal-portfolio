import { describe, it, expect } from 'vitest'
import { validateEmail, validateName, validateMessage, validateUrl } from '@/lib/validation'

describe('Email Validation', () => {
  it('validates correct email format', () => {
    const result = validateEmail('test@example.com')
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('rejects invalid email format', () => {
    const result = validateEmail('invalid-email')
    expect(result.isValid).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('rejects empty email', () => {
    const result = validateEmail('')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('required')
  })

  it('accepts emails with subdomains', () => {
    const result = validateEmail('test@mail.example.com')
    expect(result.isValid).toBe(true)
  })

  it('accepts emails with special characters', () => {
    const result = validateEmail('test.user+tag@example.com')
    expect(result.isValid).toBe(true)
  })

  it('rejects email without @', () => {
    const result = validateEmail('testexample.com')
    expect(result.isValid).toBe(false)
  })

  it('rejects email with spaces', () => {
    const result = validateEmail('test @example.com')
    expect(result.isValid).toBe(false)
  })
})

describe('Name Validation', () => {
  it('validates correct name', () => {
    const result = validateName('John Doe')
    expect(result.isValid).toBe(true)
  })

  it('rejects empty name', () => {
    const result = validateName('')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('required')
  })

  it('rejects whitespace-only name', () => {
    const result = validateName('   ')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('required')
  })

  it('rejects name that is too long', () => {
    const longName = 'a'.repeat(256)
    const result = validateName(longName)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('not exceed')
  })

  it('accepts name with numbers', () => {
    const result = validateName('John Doe 123')
    expect(result.isValid).toBe(true)
  })

  it('accepts name with special characters', () => {
    const result = validateName("John O'Brien-Smith")
    expect(result.isValid).toBe(true)
  })
})

describe('Message Validation', () => {
  it('validates correct message', () => {
    const result = validateMessage('This is a test message')
    expect(result.isValid).toBe(true)
  })

  it('rejects empty message', () => {
    const result = validateMessage('')
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('required')
  })

  it('rejects whitespace-only message', () => {
    const result = validateMessage('   \n  ')
    expect(result.isValid).toBe(false)
  })

  it('rejects message that is too long', () => {
    const longMessage = 'a'.repeat(5001)
    const result = validateMessage(longMessage)
    expect(result.isValid).toBe(false)
    expect(result.error).toContain('not exceed')
  })

  it('accepts message with newlines', () => {
    const result = validateMessage('Line 1\nLine 2\nLine 3 with content')
    expect(result.isValid).toBe(true)
  })

  it('accepts message with special characters', () => {
    const result = validateMessage('Hello! How are you? @user #hashtag')
    expect(result.isValid).toBe(true)
  })
})

describe('URL Validation', () => {
  it('validates correct URL', () => {
    const result = validateUrl('https://example.com')
    expect(result.isValid).toBe(true)
  })

  it('accepts URL without protocol when not required', () => {
    const result = validateUrl('', false)
    expect(result.isValid).toBe(true)
  })

  it('rejects empty URL when required', () => {
    const result = validateUrl('', true)
    expect(result.isValid).toBe(false)
  })

  it('rejects invalid URL format', () => {
    const result = validateUrl('not-a-url', true)
    expect(result.isValid).toBe(false)
  })

  it('accepts https URLs', () => {
    const result = validateUrl('https://github.com/user/repo')
    expect(result.isValid).toBe(true)
  })

  it('accepts http URLs', () => {
    const result = validateUrl('http://example.com')
    expect(result.isValid).toBe(true)
  })

  it('accepts URLs with query parameters', () => {
    const result = validateUrl('https://example.com?param=value&other=123')
    expect(result.isValid).toBe(true)
  })
})

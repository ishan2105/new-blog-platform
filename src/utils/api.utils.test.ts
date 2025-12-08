import { validateEmail, validateUserData } from '@/utils/api.utils'

describe('API Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email format', () => {
      expect(validateEmail('invalid.email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('sanitizeString', () => {
    it('should trim whitespace', () => {
      const { sanitizeString } = require('@/utils/api.utils')
      expect(sanitizeString('  hello  ')).toBe('hello')
    })

    it('should remove angle brackets', () => {
      const { sanitizeString } = require('@/utils/api.utils')
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script')
    })
  })
})

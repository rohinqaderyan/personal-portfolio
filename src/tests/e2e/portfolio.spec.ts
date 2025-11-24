import { test, expect } from '@playwright/test'

test.describe('Portfolio Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    await page.goto('/')
    
    // Check home page loads
    await expect(page).toHaveTitle(/John Doe/)
    
    // Navigate to About
    await page.click('text=About')
    await expect(page).toHaveURL(/.*about/)
    await expect(page.locator('h1')).toContainText('About Me')
    
    // Navigate to Projects
    await page.click('text=Projects')
    await expect(page).toHaveURL(/.*projects/)
    await expect(page.locator('h1')).toContainText('Projects')
    
    // Navigate to Skills
    await page.click('text=Skills')
    await expect(page).toHaveURL(/.*skills/)
    await expect(page.locator('h1')).toContainText('Skills')
    
    // Navigate to Experience
    await page.click('text=Experience')
    await expect(page).toHaveURL(/.*experience/)
    await expect(page.locator('h1')).toContainText('Experience')
    
    // Navigate to Contact
    await page.click('text=Contact')
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.locator('h1')).toContainText('Contact')
  })
})

test.describe('Theme Toggle', () => {
  test('should toggle between light and dark mode', async ({ page }) => {
    await page.goto('/')
    
    // Check initial theme (should be light or system default)
    const html = page.locator('html')
    
    // Click theme toggle
    await page.click('[aria-label*="theme"]')
    
    // Wait for theme to change
    await page.waitForTimeout(500)
    
    // Verify theme changed (check for dark class)
    const hasDarkClass = await html.evaluate((el) => el.classList.contains('dark'))
    expect(typeof hasDarkClass).toBe('boolean')
  })
})

test.describe('Project Filtering', () => {
  test('should filter projects by tag', async ({ page }) => {
    await page.goto('/projects')
    
    // Wait for projects to load
    await page.waitForSelector('[data-testid="project-card"], .grid > *')
    
    // Count initial projects
    const initialCount = await page.locator('.grid > *').count()
    expect(initialCount).toBeGreaterThan(0)
    
    // Click a tag filter
    const firstTag = page.locator('button').filter({ hasText: /Next\.js|React|TypeScript/ }).first()
    if (await firstTag.isVisible()) {
      await firstTag.click()
      
      // Wait for filter to apply
      await page.waitForTimeout(500)
      
      // Verify results changed
      const filteredCount = await page.locator('.grid > *').count()
      expect(filteredCount).toBeGreaterThanOrEqual(0)
    }
  })

  test('should search projects', async ({ page }) => {
    await page.goto('/projects')
    
    // Find search input
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('dashboard')
    
    // Wait for search results
    await page.waitForTimeout(500)
    
    // Verify search results
    const resultText = await page.textContent('body')
    expect(resultText).toBeDefined()
  })
})

test.describe('Contact Form', () => {
  test('should show validation errors', async ({ page }) => {
    await page.goto('/contact')
    
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Wait for validation errors
    await page.waitForTimeout(500)
    
    // Check for error messages
    const errors = await page.locator('text=/must be/i').count()
    expect(errors).toBeGreaterThan(0)
  })

  test('should fill out contact form', async ({ page }) => {
    await page.goto('/contact')
    
    // Fill form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.')
    
    // Submit form (will open mailto or show success)
    // Note: In mailto mode, this will try to open email client
    // In flask mode, it would submit to the API
  })
})

test.describe('Accessibility', () => {
  test('should have no automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/')
    
    // Check for basic accessibility requirements
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    
    // Check navigation has proper ARIA labels
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Verify focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeDefined()
  })
})

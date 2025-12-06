import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/Card'

describe('Card Component', () => {
  it('renders card with children', () => {
    render(<Card>Test content</Card>)
    expect(screen.getByText('Test content')).toBeTruthy()
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    const cardElement = container.querySelector('.custom-class')
    expect(cardElement).toBeTruthy()
  })

  it('applies hover class by default', () => {
    const { container } = render(<Card>Content</Card>)
    const cardDiv = container.firstChild as HTMLElement | null
    expect(cardDiv?.className).toContain('card-hover')
  })

  it('does not apply hover class when hover is false', () => {
    const { container } = render(<Card hover={false}>Content</Card>)
    const cardDiv = container.firstChild as HTMLElement | null
    expect(cardDiv?.className).not.toContain('card-hover')
  })

  it('applies cursor-pointer class when hover is true', () => {
    const { container } = render(<Card>Content</Card>)
    const cardDiv = container.firstChild as HTMLElement | null
    expect(cardDiv?.className).toContain('cursor-pointer')
  })

  it('does not apply cursor-pointer when hover is false', () => {
    const { container } = render(<Card hover={false}>Content</Card>)
    const cardDiv = container.firstChild as HTMLElement | null
    expect(cardDiv?.className).not.toContain('cursor-pointer')
  })
})

describe('CardHeader Component', () => {
  it('renders card header with children', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeTruthy()
  })

  it('applies custom className', () => {
    const { container } = render(<CardHeader className="custom-header">Content</CardHeader>)
    const header = container.querySelector('.custom-header')
    expect(header).toBeTruthy()
  })

  it('applies default styles', () => {
    const { container } = render(<CardHeader>Content</CardHeader>)
    const header = container.firstChild as HTMLElement | null
    expect(header?.className).toContain('mb-4')
  })
})

describe('CardTitle Component', () => {
  it('renders card title with children', () => {
    render(<CardTitle>Title text</CardTitle>)
    expect(screen.getByText('Title text')).toBeTruthy()
  })

  it('renders as h3 element', () => {
    render(<CardTitle>My Title</CardTitle>)
    const heading = screen.getByText('My Title').tagName
    expect(heading).toBe('H3')
  })

  it('applies custom className', () => {
    const { container } = render(<CardTitle className="custom-title">Title</CardTitle>)
    const title = container.querySelector('.custom-title')
    expect(title).toBeTruthy()
  })

  it('applies default styles', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    const title = container.querySelector('h3')
    expect(title?.className).toContain('text-xl')
    expect(title?.className).toContain('font-semibold')
  })
})

describe('CardDescription Component', () => {
  it('renders card description with children', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeTruthy()
  })

  it('applies custom className', () => {
    const { container } = render(<CardDescription className="custom-desc">Text</CardDescription>)
    const desc = container.querySelector('.custom-desc')
    expect(desc).toBeTruthy()
  })

  it('applies default text muted styles', () => {
    const { container } = render(<CardDescription>Description</CardDescription>)
    const desc = container.firstChild as HTMLElement | null
    expect(desc?.className).toContain('text-muted-foreground')
  })
})

describe('CardContent Component', () => {
  it('renders card content with children', () => {
    render(<CardContent>Content text</CardContent>)
    expect(screen.getByText('Content text')).toBeTruthy()
  })

  it('applies custom className', () => {
    const { container } = render(<CardContent className="custom-content">Text</CardContent>)
    const content = container.querySelector('.custom-content')
    expect(content).toBeTruthy()
  })
})

describe('CardFooter Component', () => {
  it('renders card footer with children', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeTruthy()
  })

  it('applies custom className', () => {
    const { container } = render(<CardFooter className="custom-footer">Content</CardFooter>)
    const footer = container.querySelector('.custom-footer')
    expect(footer).toBeTruthy()
  })

  it('applies flex layout styles', () => {
    const { container } = render(<CardFooter>Content</CardFooter>)
    const footer = container.firstChild as HTMLElement | null
    expect(footer?.className).toContain('flex')
  })
})

describe('Card Composition', () => {
  it('works well composed together', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Composed Card</CardTitle>
          <CardDescription>With all components</CardDescription>
        </CardHeader>
        <CardContent>Main content goes here</CardContent>
        <CardFooter>Footer actions</CardFooter>
      </Card>
    )

    expect(screen.getByText('Composed Card')).toBeTruthy()
    expect(screen.getByText('With all components')).toBeTruthy()
    expect(screen.getByText('Main content goes here')).toBeTruthy()
    expect(screen.getByText('Footer actions')).toBeTruthy()
  })
})

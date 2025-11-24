export {}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void
    gtag?: (...args: any[]) => void
  }
}

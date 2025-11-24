'use client'

import { useEffect } from 'react'
import { getConfig, isProduction } from './config'

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void
    gtag?: (...args: any[]) => void
  }
}

export function initAnalytics() {
  const config = getConfig()

  if (!isProduction()) {
    console.log('Analytics disabled in development')
    return
  }

  // Initialize Plausible
  if (config.plausibleDomain) {
    const script = document.createElement('script')
    script.defer = true
    script.setAttribute('data-domain', config.plausibleDomain)
    script.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(script)
  }

  // Initialize Google Analytics
  if (config.gaMeasurementId) {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaMeasurementId}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${config.gaMeasurementId}');
    `
    document.head.appendChild(script2)
  }
}

export function trackEvent(eventName: string, properties?: Record<string, string | number>) {
  if (!isProduction()) {
    console.log('Track event:', eventName, properties)
    return
  }

  // Track with Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties })
  }

  // Track with Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

export function trackPageView(url: string) {
  if (!isProduction()) {
    console.log('Track page view:', url)
    return
  }

  // Plausible automatically tracks page views
  
  // Track with Google Analytics
  if (window.gtag) {
    window.gtag('config', getConfig().gaMeasurementId, {
      page_path: url,
    })
  }
}

export function useAnalytics() {
  useEffect(() => {
    initAnalytics()
  }, [])
}

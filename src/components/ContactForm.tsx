'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { m as motion, AnimatePresence } from 'framer-motion'
import { getConfig } from '@/lib/config'
import { trackEvent } from '@/lib/analytics'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactFormProps {
  email: string
}

export function ContactForm({ email }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const config = getConfig()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      if (config.contactMode === 'flask') {
        // Send to Flask backend
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          throw new Error('Failed to send message')
        }

        setStatus('success')
        trackEvent('contact_form_submit', { method: 'flask' })
        reset()
      } else {
        // Client-only mode: use mailto
        const subject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`)
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
        )
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
        setStatus('success')
        trackEvent('contact_form_submit', { method: 'mailto' })
        reset()
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      )
      trackEvent('contact_form_error', { error: String(error) })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="focus-ring w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary disabled:opacity-50"
          placeholder="Your Name"
          disabled={status === 'loading'}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="focus-ring w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary disabled:opacity-50"
          placeholder="john@example.com"
          disabled={status === 'loading'}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className="focus-ring w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary disabled:opacity-50"
          placeholder="Tell me about your project or inquiry..."
          disabled={status === 'loading'}
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
      >
        {status === 'loading' ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </motion.button>

      {/* Status Messages */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400"
          >
            <CheckCircle className="h-5 w-5" />
            <span>
              {config.contactMode === 'flask'
                ? "Message sent successfully! I'll get back to you soon."
                : 'Email client opened. Please complete sending the message from your email app.'}
            </span>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400"
          >
            <AlertCircle className="h-5 w-5" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

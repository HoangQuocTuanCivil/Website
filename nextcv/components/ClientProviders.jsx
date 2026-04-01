'use client'

import { I18nProvider } from '../lib/i18n'
import locales from '../lib/locales'

export default function ClientProviders({ children }) {
  return (
    <I18nProvider translations={locales}>
      {children}
    </I18nProvider>
  )
}

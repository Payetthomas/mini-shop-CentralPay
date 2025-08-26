// App layout with language toggle and aria-live region
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from './i18n'

export default function App({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation()
  const [message, setMessage] = useState('')

  const changeLang = (lng: 'fr' | 'en') => {
    setLanguage(lng)
    setMessage(`Lang set to ${lng.toUpperCase()}`)
    setTimeout(() => setMessage(''), 1000)
  }

  return (
    <div className="p-4">
      <header className="flex items-center gap-2">
        <h1 className="mr-auto text-2xl font-semibold">{t('appTitle')}</h1>

        <label htmlFor="lang" className="label">{t('language')}</label>
        <select
          id="lang"
          aria-label={t('language')}
          className="select w-auto"
          value={i18n.language}
          onChange={(e) => changeLang(e.target.value as 'fr' | 'en')}
        >
          <option value="fr">{t('french')}</option>
          <option value="en">{t('english')}</option>
        </select>
      </header>

      {/* Polite live region, visually hidden */}
      <div aria-live="polite" className="sr-only">{message}</div>

      <main className="mt-4">
        {children}
      </main>
    </div>
  )
}

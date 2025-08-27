import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { setLanguage } from './i18n';

import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import EditProduct from './pages/EditProduct';

export default function App() {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState('');

  const onLangChange = (lng: 'fr' | 'eng') => {
    setLanguage(lng);
    setStatus(`Language set to ${lng.toUpperCase()}`);
    setTimeout(() => setStatus(''), 900);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <header className="flex items-center gap-2">
        <h1 className="mr-auto text-2xl font-semibold">{t('appTitle')}</h1>

        <label htmlFor="lang" className="label">{t('language')}</label>
        <select
          id="lang"
          className="select w-auto"
          aria-label={t('language')}
          value={i18n.language}
          onChange={(e) => onLangChange(e.target.value as 'fr' | 'eng')}
        >
          <option value="fr">{t('french')}</option>
          <option value="eng">{t('english')}</option>
        </select>
      </header>

      <div aria-live="polite" className="sr-only">{status}</div>

      <main className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="*" element={<p className="text-gray-600">{t('notFound')}</p>} />
        </Routes>
      </main>
    </div>
  );
}
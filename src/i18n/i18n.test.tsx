import i18n, { setLanguage } from './index';

test('language setting persists in localStorage', () => {
  setLanguage('eng')
  expect(i18n.language).toBe('eng')
  expect(localStorage.getItem('lang')).toBe('eng')
});

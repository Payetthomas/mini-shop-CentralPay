import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './Home'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

beforeEach(() => {
  localStorage.clear()
})

test('en tapant note la liste ne montre que “Notebook A5”', async () => {
  render(<I18nextProvider i18n={i18n}><Home /></I18nextProvider>)
  const input = screen.getByLabelText(/search|rechercher/i)
  await userEvent.type(input, 'note')
  const items = await screen.findAllByRole('article')
  expect(items.length).toBe(1)
  expect(screen.getByText(/Notebook A5/i)).toBeInTheDocument()
})

test('en triant desc, “Desk Lamp (29.9)” apparaît avant “Notebook A5 (5.2)”', async () => {
  render(<I18nextProvider i18n={i18n}><Home /></I18nextProvider>)
  const sort = screen.getByLabelText(/sort by price|tri par prix/i)
  await userEvent.selectOptions(sort, 'desc')
  const cards = await screen.findAllByRole('article')
  expect(cards[0]).toHaveTextContent(/Desk Lamp/i)
})

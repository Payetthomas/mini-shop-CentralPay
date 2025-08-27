# Mini Shop (React + TS)

Petit catalogue de produits (JSON local) avec **recherche / filtre / tri**, **détail**, **édition (price/stock)**, **i18n fr/en**, et **persistance `localStorage`**. Pas de backend.
Travail réalisé pendant 4 jours : du vendredi 22 au mercredi 27 août 2025.

## Stack
Vite + React + TS · React Router · react-i18next · Tailwind CSS

## Démarrer

npm install
npm run dev

## Scripts utiles

npm run build

npm run preview

npm run test

## Fonctionnalités

Liste : recherche nom, filtre catégorie, tri prix asc/desc, “Rupture de stock”

Détail : /product/:id

Édition : validations (price ≥ 0, stock entier ≥ 0)

i18n : FR/EN avec choix persistant

## Structure 

src/{components, pages, hooks, i18n, data, types} — routes dans App.tsx

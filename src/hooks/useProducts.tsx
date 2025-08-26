import { useState, useEffect } from 'react'
import baseData from '../data/products.json'
import type { TProduct } from '../@types/productTypes';

const STORAGE_KEY = 'mini-shop-products'


function loadProducts(): TProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as TProduct[]
  } catch { }
  return baseData as TProduct[]
}

function saveProducts(list: TProduct[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {}
}

export function useProducts() {
 
  const [all, setAll] = useState<TProduct[]>([])
 
  const [search, setSearch] = useState('')      
  const [category, setCategory] = useState('') 
  const [sortAsc, setSortAsc] = useState(true)  

 
  useEffect(() => {
    setAll(loadProducts())
  }, [])

 
  const categories = Array
    .from(new Set(all.map(p => p.category)))
    .sort()

 
  let products = [...all] 
  if (search) {
    const q = search.toLowerCase()
    products = products.filter(p => p.name.toLowerCase().includes(q))
  }
  if (category) {
    products = products.filter(p => p.category === category)
  }
  products.sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price)


  function getById(id: string) {
    return all.find(p => p.id === id)
  }

  
  function updateProduct(id: string, patch: Partial<Pick<TProduct, 'price' | 'stock'>>) {
    setAll(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...patch } : p))
      saveProducts(next)
      return next
    })
  }


  return {
    products,     
    categories,   
    search, setSearch,
    category, setCategory,
    sortAsc, setSortAsc,
    getById, updateProduct,
  }
}

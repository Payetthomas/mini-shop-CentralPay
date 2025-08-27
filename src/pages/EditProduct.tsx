import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Errors = Partial<{ price: string; stock: string }>

export default function EditProduct() {
  const { id } = useParams();
  const { getById, updateProduct } = useProducts();
  const product = id ? getById(id) : undefined;
  const nav = useNavigate();
  const { t } = useTranslation();

  const [price, setPrice] = useState<number>(product?.price ?? 0);
  const [stock, setStock] = useState<number>(product?.stock ?? 0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState('');

  if (!product) return <p className="text-gray-600">{t('notFound')}</p>;

  const validate = (): boolean => {
    const e: Errors = {}
    if (isNaN(price) || price < 0) e.price = 'validation.priceMin'
    if (!Number.isInteger(stock)) e.stock = 'validation.stockInt'
    if (stock < 0) e.stock = 'validation.stockMin'
    setErrors(e)
    return Object.keys(e).length === 0
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    updateProduct(product.id, { price, stock })
    setStatus(t('editSuccess'))
    setTimeout(() => nav(`/product/${product.id}`), 400)
  };

  return (
    <form onSubmit={onSubmit} aria-labelledby="edit-title" className="space-y-4 max-w-md">
      <h2 id="edit-title" className="text-xl font-semibold">
        {t('edit')} — {product.name}
      </h2>

      <div className="field">
        <label htmlFor="price" className="label">{t('price')}</label>
        <input
          id="price"
          type="number"
          step="0.01"
          className="input"
          aria-invalid={!!errors.price}
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        {errors.price && <div role="alert" className="text-red-600">{t(errors.price)}</div>}
      </div>

      <div className="field">
        <label htmlFor="stock" className="label">{t('stock')}</label>
        <input
          id="stock"
          type="number"
          className="input"
          aria-invalid={!!errors.stock}
          value={stock}
          onChange={(e) => setStock(parseFloat(e.target.value))}
        />
        {errors.stock && <div role="alert" className="text-red-600">{t(errors.stock)}</div>}
      </div>

      <div className="flex gap-2 pt-2">
        <button type="submit" className="btn">{t('save')}</button>
        <button type="button" className="btn-secondary" onClick={() => nav(-1)}>{t('cancel')}</button>
      </div>

      <div aria-live="polite" className="sr-only">{status}</div>
    </form>
  )
}
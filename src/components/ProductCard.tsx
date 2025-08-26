import { Link } from 'react-router-dom';
import type { TProduct } from '../@types/productTypes'; 
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }: { product: TProduct }) {

  const { t } = useTranslation();
  const out = product.stock === 0;

  return (
    <article role="article" aria-labelledby={`title-${product.id}`} className="card">
      <h3 id={`title-${product.id}`} className="text-lg font-semibold">{product.name}</h3>

      <p className="mt-1"><strong>{t('price')}:</strong> {product.price.toFixed(2)}</p>
      <p className="mt-1">
        <strong>{t('stock')}:</strong> {product.stock}{' '}
        {out && <em className="text-red-600 font-medium">({t('outOfStock')})</em>}
      </p>

      <div className="mt-3 flex gap-2">
        <Link to={`/product/${product.id}`} className="btn-secondary" aria-label={`${t('details')} ${product.name}`}>
          {t('details')}
        </Link>
        <Link to={`/edit/${product.id}`} className="btn" aria-label={`${t('edit')} ${product.name}`}>
          {t('edit')}
        </Link>
      </div>
    </article>
  )
}

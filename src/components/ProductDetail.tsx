import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useTranslation } from 'react-i18next'

export default function ProductDetail() {
  const { id } = useParams()
  const { getById } = useProducts()
  const { t } = useTranslation()

  const product = id ? getById(id) : undefined
  if (!product) return <p className="text-gray-600">{t('notFound')}</p>

  return (
    <section aria-labelledby="detail-title" className="space-y-2">
      <h2 id="detail-title" className="text-xl font-semibold">{product.name}</h2>
      <p><strong>{t('price')}:</strong> {product.price}</p>
      <p>
        <strong>{t('stock')}:</strong> {product.stock}{' '}
        {product.stock === 0 && <em className="text-red-600 font-medium">({t('outOfStock')})</em>}
      </p>
    </section>
  )
}
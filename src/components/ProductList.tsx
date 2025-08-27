import { useTranslation } from 'react-i18next';
import type { TProduct } from '../@types/productTypes'; 
import ProductCard from './ProductCard';

type Props = {
  products: TProduct[]
}

export default function ProductList({ products }: Props) {
  const { t } = useTranslation();

  if (products.length === 0) {
    return <p className="text-gray-600">{t('noResults')}</p>;
  }

  return (
    <div
      className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]"
      aria-label="product list"
    >
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
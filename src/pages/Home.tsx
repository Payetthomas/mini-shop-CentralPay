import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const {
    products, categories,
    search, setSearch,
    category, setCategory,
    sortAsc, setSortAsc,
  } = useProducts();

  return (
    <section>
      <form
        aria-label="filters"
        className="flex flex-wrap items-end gap-4 mb-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="field">
          <label htmlFor="search" className="label">{t('search')}</label>
          <input
            id="search"
            type="search"
            className="input w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="category" className="label">{t('category')}</label>
          <select
            id="category"
            className="select w-56"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t('allCategories')}</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="sort" className="label">{t('sortPrice')}</label>
          <select
            id="sort"
            className="select w-48"
            aria-label={t('sortPrice')}
            value={sortAsc ? 'asc' : 'desc'}
            onChange={(e) => setSortAsc(e.target.value === 'asc')}
          >
            <option value="asc">{t('asc')}</option>
            <option value="desc">{t('desc')}</option>
          </select>
        </div>
      </form>

      <ProductList products={products} />
    </section>
  );
}

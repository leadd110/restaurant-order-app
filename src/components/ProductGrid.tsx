import type { Category, Product } from '../types'

interface Props {
  category: Category
  onSelect: (product: Product) => void
}

export default function ProductGrid({ category, onSelect }: Props) {
  return (
    <div className="h-full p-4 grid grid-cols-3 gap-3 content-start overflow-y-auto">
      {category.products.map(product => (
        <button
          key={product.name}
          className="btn btn-outline btn-lg h-32 flex flex-col gap-1 hover:btn-success active:scale-95 transition-transform"
          onClick={() => onSelect(product)}
        >
          <span className="text-xl font-bold leading-tight text-center whitespace-normal">
            {product.name}
          </span>
          <span className="text-lg font-semibold text-success">
            {product.price.toFixed(2)} €
          </span>
          {product.extras.length > 0 && (
            <span className="badge badge-ghost badge-sm">+ Extras</span>
          )}
        </button>
      ))}
    </div>
  )
}

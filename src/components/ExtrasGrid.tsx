import type { Product, Extra } from '../types'

interface Props {
  product: Product
  selectedExtras: Extra[]
  onToggle: (extra: Extra) => void
  onConfirm: () => void
  onSkip: () => void
}

export default function ExtrasGrid({ product, selectedExtras, onToggle, onConfirm, onSkip }: Props) {
  const isSelected = (extra: Extra) =>
    selectedExtras.some(e => e.name === extra.name)

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex-1 grid grid-cols-3 gap-3 content-start overflow-y-auto">
        {product.extras.map(extra => (
          <button
            key={extra.name}
            className={`btn btn-lg h-28 flex flex-col gap-1 active:scale-95 transition-transform ${
              isSelected(extra) ? 'btn-success' : 'btn-outline'
            }`}
            onClick={() => onToggle(extra)}
          >
            <span className="text-lg font-bold leading-tight text-center whitespace-normal">
              {extra.name}
            </span>
            <span className="text-base">
              {extra.price > 0 ? `+${extra.price.toFixed(2)} €` : 'kostenlos'}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-4 flex-none">
        <button
          className="btn btn-ghost btn-lg flex-1 h-20 text-xl"
          onClick={onSkip}
        >
          Ohne Extras
        </button>
        <button
          className="btn btn-success btn-lg flex-1 h-20 text-xl font-bold"
          onClick={onConfirm}
        >
          ✓ In den Warenkorb
          {selectedExtras.length > 0 && (
            <span className="badge badge-warning ml-2 text-base">{selectedExtras.length}</span>
          )}
        </button>
      </div>
    </div>
  )
}

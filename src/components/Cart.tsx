import { Fragment } from 'react'
import type { CartItem } from '../types'

interface Props {
  items: CartItem[]
  onRemove: (id: string) => void
  onClear: () => void
  onBack: () => void
}

export default function Cart({ items, onRemove, onClear, onBack }: Props) {
  const total = items.reduce((sum, item) => {
    const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0)
    return sum + (item.product.price + extrasTotal) * item.quantity
  }, 0)

  return (
    <div className="h-full flex flex-col p-4 gap-4">

      {/* Nur beim Drucken sichtbar */}
      <div id="print-area">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Bestellung
        </h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {items.map(item => {
              const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0)
              return (
                <Fragment key={item.id}>
                  <tr>
                    <td style={{ padding: '6px 0', fontSize: '16px' }}>
                      {item.quantity}× {item.product.name}
                    </td>
                    <td style={{ textAlign: 'right', padding: '6px 0', fontSize: '16px' }}>
                      {((item.product.price + extrasTotal) * item.quantity).toFixed(2)} €
                    </td>
                  </tr>
                  {item.extras.length > 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        style={{ paddingLeft: '16px', paddingBottom: '4px', fontSize: '13px', color: '#555' }}
                      >
                        + {item.extras.map(e => e.name).join(', ')}
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td style={{ fontWeight: 'bold', fontSize: '20px', paddingTop: '12px', borderTop: '2px solid #000' }}>
                Gesamt
              </td>
              <td style={{ fontWeight: 'bold', fontSize: '20px', paddingTop: '12px', borderTop: '2px solid #000', textAlign: 'right' }}>
                {total.toFixed(2)} €
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Bildschirm-Inhalt */}
      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-3xl opacity-40">Warenkorb ist leer</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2">
          {items.map(item => {
            const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0)
            const lineTotal = (item.product.price + extrasTotal) * item.quantity
            return (
              <div key={item.id} className="card bg-base-200">
                <div className="card-body p-4 flex-row items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-bold">
                      {item.quantity}× {item.product.name}
                    </p>
                    {item.extras.length > 0 && (
                      <p className="text-sm opacity-60 truncate">
                        + {item.extras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    <p className="text-lg text-success font-semibold mt-1">
                      {lineTotal.toFixed(2)} €
                    </p>
                  </div>
                  <button
                    className="btn btn-error btn-square btn-lg text-xl flex-none"
                    onClick={() => onRemove(item.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Gesamtbetrag */}
      {items.length > 0 && (
        <div className="bg-base-200 rounded-box p-4 text-right flex-none">
          <span className="text-2xl font-bold">
            Gesamt: {total.toFixed(2)} €
          </span>
        </div>
      )}

      {/* Aktions-Buttons */}
      <div className="flex gap-3 flex-none">
        <button
          className="btn btn-outline btn-lg h-20 text-xl"
          onClick={onBack}
        >
          ← Zurück
        </button>
        {items.length > 0 && (
          <>
            <button
              className="btn btn-error btn-lg h-20 text-xl flex-1"
              onClick={onClear}
            >
              🗑 Alles löschen
            </button>
            <button
              className="btn btn-primary btn-lg h-20 text-xl flex-1"
              onClick={() => window.print()}
            >
              🖨 Drucken
            </button>
          </>
        )}
      </div>
    </div>
  )
}

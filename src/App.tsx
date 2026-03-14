import { useState } from 'react'
import menuData from './data/menu.json'
import CategoryGrid from './components/CategoryGrid'
import ProductGrid from './components/ProductGrid'
import ExtrasGrid from './components/ExtrasGrid'
import Cart from './components/Cart'
import type { Category, Product, Extra, CartItem, View } from './types'

export default function App() {
  const [view, setView] = useState<View>('categories')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([])
  const [cart, setCart] = useState<CartItem[]>([])

  const categories = menuData as Category[]

  const addToCart = (product: Product, extras: Extra[]) => {
    const extrasKey = extras.map(e => e.name).sort().join('|')
    const id = `${product.name}::${extrasKey}`
    setCart(prev => {
      const existing = prev.find(item => item.id === id)
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id, product, extras, quantity: 1 }]
    })
    setView('categories')
    setSelectedCategory(null)
    setSelectedProduct(null)
    setSelectedExtras([])
  }

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setView('products')
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    if (product.extras.length > 0) {
      setSelectedExtras([])
      setView('extras')
    } else {
      addToCart(product, [])
    }
  }

  const handleBack = () => {
    if (view === 'products') setView('categories')
    else if (view === 'extras') setView('products')
    else if (view === 'cart') setView('categories')
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-base-100">

      {/* Navigationsleiste */}
      <div className="navbar bg-primary text-primary-content px-4 min-h-16 flex-none">
        <div className="flex-none">
          {view !== 'categories' && (
            <button
              className="btn btn-ghost btn-lg text-2xl"
              onClick={handleBack}
            >
              ←
            </button>
          )}
        </div>
        <div className="flex-1">
          <span className="text-2xl font-bold ml-2">
            {view === 'categories' && '🍽 Bestellung'}
            {view === 'products' && selectedCategory?.name}
            {view === 'extras' && `Extras – ${selectedProduct?.name}`}
            {view === 'cart' && '🛒 Warenkorb'}
          </span>
        </div>
        <div className="flex-none">
          {view !== 'cart' && (
            <button
              className="btn btn-secondary btn-lg relative"
              onClick={() => setView('cart')}
            >
              🛒
              {totalItems > 0 && (
                <span className="badge badge-error absolute -top-1 -right-1 min-w-6 h-6 text-sm">
                  {totalItems}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Hauptinhalt */}
      <div className="flex-1 overflow-hidden">
        {view === 'categories' && (
          <CategoryGrid
            categories={categories}
            onSelect={handleCategorySelect}
          />
        )}
        {view === 'products' && selectedCategory && (
          <ProductGrid
            category={selectedCategory}
            onSelect={handleProductSelect}
          />
        )}
        {view === 'extras' && selectedProduct && (
          <ExtrasGrid
            product={selectedProduct}
            selectedExtras={selectedExtras}
            onToggle={extra =>
              setSelectedExtras(prev =>
                prev.some(e => e.name === extra.name)
                  ? prev.filter(e => e.name !== extra.name)
                  : [...prev, extra]
              )
            }
            onConfirm={() => selectedProduct && addToCart(selectedProduct, selectedExtras)}
            onSkip={() => selectedProduct && addToCart(selectedProduct, [])}
          />
        )}
        {view === 'cart' && (
          <Cart
            items={cart}
            onRemove={id => setCart(prev => prev.filter(item => item.id !== id))}
            onClear={() => setCart([])}
            onBack={() => setView('categories')}
          />
        )}
      </div>
    </div>
  )
}

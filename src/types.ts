export interface Extra {
  name: string
  price: number
}

export interface Product {
  name: string
  price: number
  extras: Extra[]
}

export interface Category {
  name: string
  icon: string
  products: Product[]
}

export interface CartItem {
  id: string
  product: Product
  extras: Extra[]
  quantity: number
}

export type View = 'categories' | 'products' | 'extras' | 'cart'

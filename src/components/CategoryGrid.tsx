import type { Category } from '../types'

interface Props {
  categories: Category[]
  onSelect: (category: Category) => void
}

export default function CategoryGrid({ categories, onSelect }: Props) {
  return (
    <div className="h-full p-4 grid grid-cols-3 gap-4 content-start overflow-y-auto">
      {categories.map(category => (
        <button
          key={category.name}
          className="btn btn-outline btn-lg h-32 flex flex-col gap-2 hover:btn-success active:scale-95 transition-transform"
          onClick={() => onSelect(category)}
        >
          <span className="text-4xl">{category.icon}</span>
          <span className="text-xl">{category.name}</span>
        </button>
      ))}
    </div>
  )
}

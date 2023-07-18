import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

interface PlaceValues {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]

export const Places: PlacesType = [
  {
    position: [12.841922, 80.155343],
    category: Category.LOCATE,
  },
  {
    position: [12.85, 80.1554],
    category: Category.CAT1,
  },
  {
    position: [52.022468698328275, 8.50583167463131],
    category: Category.CAT1,
  },
  {
    position:[12.831922, 80.15343],
    category: Category.CAT2
  }
]

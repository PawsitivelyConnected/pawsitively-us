import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'

interface PlaceValues {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]

export const Places: PlacesType = [
  { position: [12.9399857, 80.2071528], category: Category.CAT1 },
  { position: [12.9399857, 80.2071519], category: Category.CAT1 },
  { position: [12.9399857, 80.207152], category: Category.CAT1 },
  { position: [12.88, 80.1569446], category: Category.CAT1 },
  {
    position: [12.87325, 80.205308],
    category: Category.CAT2,
  },
  {
    position: [12.57, 79.0],
    category: Category.CAT1,
  },
  { position: [12.8426153, 80.1564661], category: Category.CAT1 },
  { position: [13.02528, 80.2062336], category: Category.CAT2 },
  { position: [12.8426537, 80.1564035], category: Category.LOCATE },
  { position: [12.8425932, 80.1565141], category: Category.LOCATE },
]

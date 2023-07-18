import { LucideProps } from 'lucide-react'
import { FunctionComponent } from 'react'
import { BiSolidDog } from 'react-icons/bi'
import { GoPerson } from 'react-icons/go'
import { TiLocationArrow } from 'react-icons/ti'
import colors from 'tailwindcss/colors'

export enum Category {
  LOCATE = 0,
  CAT1 = 1,
  CAT2 = 2,
}

export interface MarkerCategoriesValues {
  name: string
  icon: FunctionComponent<LucideProps>
  color: string
}

type MarkerCategorieType = {
  [key in Category]: MarkerCategoriesValues
}

const MarkerCategories: MarkerCategorieType = {
  [Category.LOCATE]: {
    name: 'User Location',
    icon: TiLocationArrow,
    color: colors.orange[400],
  },
  [Category.CAT1]: {
    name: 'Category 1',
    icon: BiSolidDog,
    color: colors.sky[700],
  },
  [Category.CAT2]: {
    name: 'Category 2',
    icon: GoPerson,
    color: colors.purple[500],
  },
}

export default MarkerCategories

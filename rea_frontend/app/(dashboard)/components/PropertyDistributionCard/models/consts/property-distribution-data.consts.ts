import { Home, Building, LandPlotIcon as Land, Store } from 'lucide-react'
import { PropertyTypeData } from '../types'

export const propertyTypeData: PropertyTypeData[] = [
  { name: 'Mieszkania', value: 60, color: 'blue', icon: Home },
  { name: 'Domy',       value: 25, color: 'green', icon: Building },
  { name: 'Działki',    value: 10, color: 'yellow', icon: Land },
  { name: 'Komercyjne', value: 5,  color: 'red', icon: Store },
]
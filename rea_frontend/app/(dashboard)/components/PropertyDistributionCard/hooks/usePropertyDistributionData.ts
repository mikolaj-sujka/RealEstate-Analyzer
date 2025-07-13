import { useMemo } from 'react'
import { propertyTypeData } from '../models'

export const usePropertyDistributionData = () => {
    const totalValue = useMemo(
        () => propertyTypeData.reduce((sum, item) => sum + item.value, 0),
        []
    )
    return { data: propertyTypeData, totalValue }
}
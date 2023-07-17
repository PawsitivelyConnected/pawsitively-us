import { LatLngExpression, Map } from 'leaflet'
import { chain } from 'lodash'
import { useMemo, useState } from 'react'

import useLeafletWindow from '@components/Map/useLeafletWindow'

import { Category } from '@lib/MarkerCategories'
import { PlacesType } from '@lib/Places'

interface useMapDataValues {
  locations?: PlacesType
  map?: Map
  viewportWidth?: number
  viewportHeight?: number
}

interface allMarkerPosValues {
  minZoom: number
  centerPos: LatLngExpression
}

const useMarker = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues) => {
  const leafletWindow = useLeafletWindow()
  const [currentLocation, setLocation] = useState<LatLngExpression>()

  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: 15,
    centerPos: [12.841922, 80.155343],
  })

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!leafletWindow || !locations) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })
    return leafletWindow.latLngBounds(coordsSum)
  }, [leafletWindow, locations])

  const clustersByCategory = useMemo(
    () =>
      chain(locations)
        .groupBy('category')
        .map((value, key: Category | string) => ({ category: key, markers: value }))
        .value(),
    [locations],
  )

  return { clustersByCategory, allMarkersBoundCenter }
}

export default useMarker

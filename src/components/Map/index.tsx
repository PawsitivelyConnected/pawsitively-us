import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiSolidDog } from 'react-icons/bi'
import { GoPerson } from 'react-icons/go'
import { TiLocationArrow } from 'react-icons/ti'
import { useResizeDetector } from 'react-resize-detector'

import client from '@src/supabase/client'

import { AppConfig } from '@lib/AppConfig'
import MarkerCategories, { Category } from '@lib/MarkerCategories'
import { Places } from '@lib/Places'

import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarker from './useMarker'

const Cluster = dynamic(async () => (await import('./Marker/ClusterGroup')).MarkerClusterGroup(), {
  ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./Marker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const { clustersByCategory, allMarkersBoundCenter } = useMarker({
    locations: Places,
    map,
    viewportWidth,
    viewportHeight,
  })

  const isLoading = !map || !leafletWindow || !viewportWidth || !viewportHeight

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.setMinZoom(allMarkersBoundCenter.minZoom - 1)
      map.off('moveend', moveEnd)
    }

    map.setMinZoom(0)
    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter])

  return (
    <section className="container grid grid-cols-2">
      <section
        className="col-start-1 col-span-1 h-full w-1/2 absolute overflow-hidden mr-12"
        ref={viewportRef}
      >
        <section className="h-full">
          <LeafletMap
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
          >
            {!isLoading ? (
              <>
                <CenterToMarkerButton
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom}
                />
                <LocateButton />
                {Object.values(clustersByCategory).map(item => (
                  <Cluster
                    key={item.category}
                    icon={MarkerCategories[item.category as Category].icon}
                    color={MarkerCategories[item.category as Category].color}
                    chunkedLoading
                  >
                    {item.markers.map(marker => (
                      <CustomMarker
                        icon={MarkerCategories[marker.category].icon}
                        color={MarkerCategories[marker.category].color}
                        key={(marker.position as number[]).join('')}
                        position={marker.position}
                      />
                    ))}
                  </Cluster>
                ))}
              </>
            ) : (
              <></>
            )}
          </LeafletMap>
        </section>
      </section>
      <section className="mx-8 col-start-2 col-span-1 flex flex-col flex-1 w-full px-8 py-4">
        <section className="text-primary font-bold text-3xl">What does this map indicate ?</section>
        <section className="text-black font-regular text-xl">
          There are various icons used in this map which needs to be interpreted as the following:
        </section>
        <ul className="list-inside">
          <li>
            <section className="flex font-regular text-2xl items-center bg-slate-200 w-full rounded-md px-2 py-4 gap-4 my-4">
              <TiLocationArrow className="text-4xl" />
              Last Scanned Location
            </section>
          </li>
          <li>
            <section className="flex font-regular text-2xl items-center bg-slate-200 w-full rounded-md px-2 py-4 gap-4 my-4">
              <GoPerson className="text-4xl  rounded-full" />
              Owner's target location
            </section>
          </li>
          <li>
            <section className="flex font-regular text-2xl items-center bg-slate-200 w-full rounded-md px-2 py-4 gap-4 my-4">
              <BiSolidDog className="text-4xl" />
              Dog's last detected location
            </section>
          </li>
        </ul>
      </section>
    </section>
  )
}

// pass through to get context in <MapInner>
const Map = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    client.auth.getSession().then(session => {
      if (session.data.session?.user.aud != 'authenticated') {
        router.push('/login')
        setLoading(true)
      }
    })
  })
  if (!loading) return <>Loading...</>
  return (
    <MapContextProvider>
      <MapInner />
    </MapContextProvider>
  )
}

export default Map

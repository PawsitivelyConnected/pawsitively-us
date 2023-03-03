import { NavMenuVariant } from '@lib/AppConfig'

import LatLngLogo from '@components/TopBar/LatLngLogo'

import NavMenu from '../common/NavMenu'

const MapTopBar = () => (
  <div className="h-20 absolute w-full left-0 top-0 p-3 shadow bg-dark" style={{ zIndex: 1000 }}>
    <div className="flex justify-between">
      <LatLngLogo />
      <div className="flex flex-col justify-center">
        <NavMenu variant={NavMenuVariant.TOPNAV} />
      </div>
    </div>
  </div>
)

export default MapTopBar

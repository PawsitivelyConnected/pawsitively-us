import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import client from '@src/supabase/client'

const LandingPage = (): JSX.Element => {
  const router = useRouter()
  const [auth, setAuth] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)
  const [notLogged, setLogged] = useState<boolean>(false)
  useEffect(() => {
    client.auth.getSession().then(session => {
      if (session.data.session?.user.aud == 'authenticated') {
        setAuth(session.data.session)
        setLoading(true)
      } else {
        router.push('/maps')
        setLogged(true)
      }
    })
  })

  if (notLogged) {
    return (
      <section>
        <nav className="absolute top-0 w-full h-16 bg-[#060d37] flex justify-between items-center text-white px-8">
          <section className="font-extrabold font-inter">Pawisitively me</section>
          <button className="font-regular hover:p-1 rounded-md hover:border hover:border-white">Login</button>
        </nav>
        <section>
          <section className="flex flex-col h-screen items-start justify-start bg-gray-100 p-4 my-16 font-semibold text-3xl border-b-secondary">
            <a href="/maps" className="text-blue-600 hover:text-blue-800 hover:underline capitalize">
              View our maps
            </a>
            <p>
              <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline capitalize">
                login
              </a>
            </p>
            <p>
              <a href="/about" className="text-blue-600 hover:text-blue-800 hover:underline capitalize">
                about
              </a>
            </p>
          </section>
        </section>
      </section>
    )
  }
  if (loading) {
    return <section>Loading...</section>
  }
  return <section>Loading...</section>
}

export default LandingPage

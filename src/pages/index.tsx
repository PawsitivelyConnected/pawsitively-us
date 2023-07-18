import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import client from '@src/supabase/client'

const NonLanding = () => {
  return (
    <section className="container mx-auto max-w-2xl max-md:max-w-none">
      <header className="mt-10 items-top gap-4 md:flex">
        <section>
          <h2 className="text-4xl font-bold">Pawsitively me</h2>
          <h3 className="text-3xl mb-16">Connect with your dog</h3>
        </section>
      </header>
      <section>
        <p className="mb-2">
          An amazing simple app, that allows you to add{' '}
          <Link className="text-primary" href="/maps">
            map-related ID features
          </Link>{' '}
          for non-conscious things starting with your dog🐶
          <span>. ✨</span>
        </p>
      </section>
      <section className="flex flex-col">
        <section className="text-4xl text-primary font-bold">Features</section>
        <section className="text-xl py-2">
          <ul className="list-inside">
            <li>
              <Link href="/maps" className="hover:text-primary hover:underline">
                {'>'} Interactive maps
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-primary hover:underline">
                {'>'} Add any taggable item
              </Link>
            </li>
            <li>
              <Link href="/last-seen" className="hover:text-primary hover:underline" id="lastSeenButton">
                {'>'} Last seen data
              </Link>
            </li>
          </ul>
        </section>
      </section>
      <footer className="mt-16 flex justify-between p-3 rounded bg-light text-sm">
        <section>
          2023 - Abhijith Ganesh, Hamsini R, Sivaranjini C, Sukanth K
          <br />
          <Link href="github.com/pawsitivelyConnected/" className="text-primary">
            Team Pawsitively me
          </Link>
        </section>
      </footer>
    </section>
  )
}

const LandingPage = (): JSX.Element => {
  return <NonLanding />
}

export default LandingPage

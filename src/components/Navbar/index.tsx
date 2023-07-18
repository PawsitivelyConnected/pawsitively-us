import Link from 'next/link'

const NavBar = (): JSX.Element => {
  return (
    <header className="mt-10 items-top gap-4 md:flex">
      <section className="flex justify-between items-center w-full border-b-primary border-b-2">
        <section className="text-3xl font-semibold text-primary">
          <Link href="/">Pawsitively Me</Link>
        </section>
        <section className="flex gap-4 font-regular text-xl">
          <section>
            <Link href="/add-items">Add item</Link>
          </section>
          <section>
            <Link href="/last-seen">Last seen</Link>
          </section>
          <section>
            <Link href={'/maps'}>Map</Link>
          </section>
        </section>
      </section>
    </header>
  )
}

export default NavBar

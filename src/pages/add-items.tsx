import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import NavBar from '@components/Navbar'

import client from '@src/supabase/client'

const addItem = (): JSX.Element => {
  const [itemName, setItemName] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    client.auth.getSession().then(session => {
      if (session.data.session?.user.aud != 'authenticated') {
        router.push('/login')
        setLoading(false)
      }
    })
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const { data, error } = await client.from('items').insert([
        {
          name: itemName,
          description: itemDescription,
        },
      ])

      if (error) {
        console.log(error)
        alert(`Error adding item: Code ${error.code}`)
      } else {
        alert('Item added successfully')
        setItemName('')
        setItemDescription('')
      }
    } catch (error) {
      console.error('Error connecting to Supabase:', error)
    }
  }
  if (!loading) {
    return <section>Loading...</section>
  } else {
    return (
      <section className="container mx-auto max-w-2xl max-md:max-w-none">
        <NavBar />
        <section>
          <form className="my-10 py-2 w-full" onSubmit={handleSubmit}>
            <section className="flex items-center gap-8">
              Item Name:
              <input
                type="text"
                placeholder="I am a dog"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
              />
            </section>
            <section className="flex items-center gap-8">
              Item Description:
              <input
                type="text"
                placeholder="Description"
                value={itemDescription}
                onChange={e => setItemDescription(e.target.value)}
              />
            </section>
            <button type="submit">Add Item</button>
          </form>
        </section>
      </section>
    )
  }
}

export default addItem

import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'

const supabaseUrl = 'https://ywnwijqxsujnqsaclcqt.supabase.co/'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bndpanF4c3VqbnFzYWNsY3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NTQyNjMsImV4cCI6MjAwNDEzMDI2M30.Aq88brQwByj2teCP8vZVwErCITyaYoGm0uB3gA2qSRM'

const supabase = createClient(supabaseUrl, supabaseKey)

const LastLocation = () => {
  const [smoothies, setSmoothies] = useState([])

  useEffect(() => {
    const fetchSmoothies = async () => {
      try {
        let obj_set = []
        const { data, error } = await supabase
          .from('smoothies')
          .select('*')
          .order('created_at', { ascending: false })

        data.forEach(item => {
          obj_set.push({ position: [item.latitude, item.longitude] })
        })
        console.log(JSON.stringify(obj_set))
        if (error) {
          console.error(error)
        } else {
          setSmoothies(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchSmoothies()
  }, [])

  const openLocationInMap = (latitude, longitude) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    window.open(mapUrl)
  }

  const convertToIST = timestamp => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }
    return new Date(timestamp).toLocaleString('en-IN', options)
  }

  return (
    <div className="page last-location font-extra text-xl gap-4 table">
      <h2 className="font-bold text-3xl">Last Location</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Details</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Created At</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {smoothies.map(smoothie => (
            <tr key={smoothie.id}>
              <td>{smoothie.id}</td>
              <td>{smoothie.details}</td>
              <td>{smoothie.latitude}</td>
              <td>{smoothie.longitude}</td>
              <td>{convertToIST(smoothie.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LastLocation

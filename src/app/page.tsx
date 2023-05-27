import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <>
      <Link href='/getcar'><h1 className='text-white'>Select Car</h1></Link>
    </> 
  )
}

export const metadata = {
  title: 'Home Page',
  description: 'Main Page of the website'
}
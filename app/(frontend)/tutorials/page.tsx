import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <div className='h-screen flex justify-center items-center'>
        Coming soon...
      </div>
      <Footer/>
    </div>
  )
}

export default page;
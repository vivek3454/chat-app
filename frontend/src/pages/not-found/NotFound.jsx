import React from 'react'
import { MdError } from 'react-icons/md'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col items-center'>
        <MdError className='text-5xl' />
        <h2 className='text-xl font-semibold'>Page not found.</h2>
        <Link to="/" className='text-blue-700 hover:underline'>Go back to home</Link>
      </div>
    </div>
  )
}

export default NotFound
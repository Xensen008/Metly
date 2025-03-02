import CallList from '@/components/CallList'
import React from 'react'

const PreviousPage = () => {
  return (
    <section  className='flex size-full flex-col gap-10 text-white'>
    <h1 className='text-2xl mt-7 font-bold'>
      Previous meetings
    </h1>

    <CallList 
      type='ended'
    />
  </section>
  )
}

export default PreviousPage
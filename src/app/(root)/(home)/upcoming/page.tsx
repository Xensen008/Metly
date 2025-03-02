import React from 'react'
import CallList from '@/components/CallList'
const upcomingsPage = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-2xl mt-7 font-bold'>
        Upcomming meetings
      </h1>

      <CallList 
        type='upcoming'
      />
    </section>
  )
}

export default upcomingsPage
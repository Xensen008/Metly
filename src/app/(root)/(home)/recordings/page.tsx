import CallList from '@/components/CallList'
import React from 'react'

const RecordingPage = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-2xl mt-7 font-bold'>
        Recorded meetings
      </h1>

      <CallList 
        type='recordings'
      />
    </section>
  )
}

export default RecordingPage
'use client'
import CallList from '@/components/CallList'
import MeetingTypeList from '@/components/MeetingTypeList'
import UpcomingMeetingBanner from '@/components/UpcomingMeetingBanner'
import React, { useState, useEffect } from 'react'
import Background from '@/components/Background'
import ActivityWidget from '@/components/ActivityWidget'
import NotePadWidget from '@/components/NotePadWidget'

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, [])

  const time = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentTime)

  return (
    <>
      <Background />
      <div className="flex gap-8 max-w-[1920px] mx-auto pr-1">
        <div className="flex-1 min-w-0"> 
          <section className='relative flex flex-col gap-5 pb-8 pt-4'>
            <div className="relative h-[260px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/10 to-gray-800/5">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/hero-background.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Adjusted padding in wrapper */}
              <div className='relative h-full flex flex-col justify-between p-5 bg-gradient-to-t from-black/40 via-black/20 to-transparent'>
                <div className="relative z-10">
                  <UpcomingMeetingBanner />
                </div>
                
                <div className='relative z-10 space-y-2'>
                  <h1 className='text-4xl font-bold tracking-tight text-white lg:text-6xl drop-shadow-sm'>
                    {time}
                  </h1>
                  <p className='text-lg font-medium text-white/90 lg:text-xl drop-shadow-sm'>
                    {date}
                  </p>
                </div>
                
                {/* Subtle decorative elements */}
                <div className="absolute right-0 top-0 h-80 w-80 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-[80px]" />
                <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[80px]" />
              </div>
            </div>

            <div className="space-y-5">
              <h2 className="text-2xl font-semibold text-white/90">Quick Actions</h2>
              <MeetingTypeList />
            </div>

            <CallList
              type='upcoming'
              limit={2}
            />
          </section>
        </div>

        {/* Widgets Column - Updated positioning */}
        <div className="hidden xl:block mt-4 w-[289px] flex-shrink-0">
          <div className="fixed w-[320px] space-y-4">
            <ActivityWidget />
            <NotePadWidget />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
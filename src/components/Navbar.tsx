'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'

const Navbar = () => {
  return (
    <nav className='fixed z-50 w-full backdrop-blur-md'>
      {/* Gradient line at bottom */}
      <div className="absolute bottom-0 h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-md" />

      <div className='relative flex-between mx-auto w-full max-w-screen-2xl px-5 py-3 lg:px-8'>
        <Link href='/' className='flex items-center gap-3 group'>
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm group-hover:blur-md transition-all" />
            <Image
              src='/icons/logo.svg'
              alt='logo'
              width={38}
              height={38}
              className='relative max-sm:size-9'
            />
          </div>
          <p className='text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent max-sm:hidden'>
            Metly
          </p>
        </Link>

        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
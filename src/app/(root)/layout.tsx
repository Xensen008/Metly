import React, { ReactNode } from 'react'
import StreamVideoProvider from '../../../providers/streamClientProvider'
import { Toaster } from "@/components/ui/sonner"

const RootLayout = ({children}: {children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
        <Toaster/>
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout
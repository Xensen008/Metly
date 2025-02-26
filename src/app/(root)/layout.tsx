import React, { ReactNode } from 'react'
import StreamVideoProvider from '../../../providers/streamClientProvider'
import { Toaster } from "@/components/ui/sonner"
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Metly",
  description: "Metly is a video conferencing app built with Next.js and Stream Chat.",
  icons:{
    icon:"/icons/logo.svg",
  }
};
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
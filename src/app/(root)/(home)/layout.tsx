import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import React, { ReactNode } from 'react'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="relative">
            <div className="fixed right-4 top-4 z-50 sm:hidden">
                <MobileNav />
            </div>
            
            <div className='flex'>
                <Sidebar/>
                {/* Reduced padding-top from pt-16 to pt-4 */}
                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-4 max-md:pb-14 sm:px-14'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section> 
            </div> 
        </main>
    )
}

export default HomeLayout
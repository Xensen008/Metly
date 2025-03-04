'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { SidebarLinks } from '../../constant';
import { cn } from '@/lib/utils';
import { UserButton, SignOutButton, useClerk } from '@clerk/nextjs';

const MobileNav = () => {
  const pathname = usePathname();
  const { openUserProfile } = useClerk();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center size-11 rounded-xl bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10">
          <Image
            src="/icons/hamburger.svg"
            width={24}
            height={24}
            alt="menu"
            className="opacity-90"
          />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[300px] border-r border-white/5 bg-gradient-to-b from-[#0D0D0D]/90 to-[#141414]/90 backdrop-blur-md p-0"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex h-full flex-col">
          {/* Logo Section - Matching Sidebar */}
          <div className="flex items-center gap-3 p-6 border-b border-white/5">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm" />
              <Image src="/icons/logo.svg" width={32} height={32} alt="logo" className="relative" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Metly
            </h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-2 p-4 overflow-y-auto scrollbar-hide">
            {/* Navigation Section */}
            <div className="pb-4">
              <h2 className="px-4 mb-3 text-xs font-semibold uppercase text-gray-400/80">
                Main Menu
              </h2>
              <div className="space-y-1">
                {SidebarLinks.map((item) => {
                  const isActive = pathname === item.route;
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-4 py-3',
                          'transition-all duration-200 ease-out',
                          'hover:bg-white/5',
                          {
                            'bg-blue-500/10 text-blue-400': isActive,
                            'text-gray-300 hover:text-blue-300': !isActive,
                          }
                        )}
                      >
                        <div className={cn(
                          'flex-center size-9 rounded-lg transition-colors',
                          isActive ? 'bg-blue-500/10' : 'bg-white/5'
                        )}>
                          <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn('opacity-80', { 'opacity-100': isActive })}
                          />
                        </div>
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </div>

            {/* Direct Links for User Profile */}
            <div className="pb-4">
              <h2 className="px-4 mb-3 text-xs font-semibold uppercase text-gray-400/80">
                Your Account
              </h2>
              <div className="space-y-1">
                <SheetClose asChild>
                  <button
                    onClick={() => openUserProfile()}
                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 
                            text-gray-300 hover:text-blue-300 hover:bg-white/5
                            transition-all duration-200 ease-out"
                  >
                    <div className="flex-center size-9 rounded-lg bg-white/5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Manage Account</span>
                  </button>
                </SheetClose>

                <SignOutButton>
                  <SheetClose asChild>
                    <button
                      className="w-full flex items-center gap-3 rounded-xl px-4 py-3 
                              text-gray-300 hover:text-red-400 hover:bg-white/5
                              transition-all duration-200 ease-out"
                    >
                      <div className="flex-center size-9 rounded-lg bg-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </SheetClose>
                </SignOutButton>
              </div>
            </div>
          </div>

          {/* User Profile Section - Now just shows avatar */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 rounded-xl p-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-10",
                    // Disable popovers as we're using direct links instead
                    userButtonPopoverCard: "hidden",
                    userButtonPopover: "hidden"
                  }
                }}
              />
              <div>
                <p className="text-sm font-medium text-gray-200">Your Profile</p>
                <p className="text-xs text-gray-400">Manage settings</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet';
import { SidebarLinks } from '../../constant';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';

const MobileNav = () => {
  const pathname = usePathname();

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
          </div>

          {/* User Profile Section - Matching Sidebar */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5 transition-colors">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "size-10"
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
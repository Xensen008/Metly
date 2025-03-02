'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarLinks } from '../../constant/index';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col bg-gradient-to-b from-[#111827]/95 to-[#1f2937]/95 backdrop-blur-md max-sm:hidden lg:w-[280px]">
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-6 border-b border-white/5">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm" />
          <Image src="/icons/logo.svg" alt="logo" width={32} height={32} className="relative" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent max-lg:hidden">
          Metly
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-2 p-4 overflow-y-auto scrollbar-hide">
        <div className="pb-4">
          <h2 className="px-4 text-xs font-semibold uppercase text-gray-400/80 max-lg:hidden">
            Main Menu
          </h2>
          <div className="mt-3 space-y-1">
            {SidebarLinks.map((item) => {
              const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
              return (
                <Link
                  href={item.route}
                  key={item.label}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3',
                    'transition-all duration-200 ease-out',
                    'hover:bg-white/5',
                    {
                      'bg-blue-500/10 text-blue-400': isActive,
                      'text-gray-300 hover:text-blue-300': !isActive
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
                  <span className="text-sm font-medium max-lg:hidden">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5 transition-colors">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "size-10"
              }
            }}
          />
          <div className="flex-1 max-lg:hidden">
            <p className="text-sm font-medium text-gray-200">Your Profile</p>
            <p className="text-xs text-gray-400">Manage settings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
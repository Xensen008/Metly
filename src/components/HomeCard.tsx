import { cn } from '@/lib/utils';
import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
    className?: string;
    img: string;
    title: string;
    description: string;
    handleClick?: () => void;
}

const HomeCard = ({ img, title, description, className, handleClick }: HomeCardProps) => {
    return (
        <section
            onClick={handleClick}
            className={cn(
                'group relative overflow-hidden',
                'rounded-xl p-6 sm:p-7',
                'transition-all duration-300 ease-out',
                'hover:scale-[1.02] hover:-translate-y-1',
                'bg-gradient-to-br from-dark-2/80 via-dark-1/90 to-dark-2/80',
                'cursor-pointer w-full min-h-[160px] sm:min-h-[180px]', // Increased height
                'border border-white/[0.08]',
                'hover:shadow-lg hover:border-white/[0.15]',
                'flex flex-col gap-5', // Changed to flex-col
                className
            )}
        >
            {/* Icon Container */}
            <div className="flex-shrink-0 flex-center size-12 rounded-xl 
                        bg-dark-3/50 border border-dark-3/30
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]
                        transition-all duration-300 group-hover:scale-105
                        group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Image 
                    src={img} 
                    alt={title} 
                    width={24} 
                    height={24} 
                    className="opacity-80 transition-all duration-300 
                             group-hover:opacity-100 group-hover:scale-110" 
                />
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold 
                           bg-gradient-to-r from-white to-white/80 
                           bg-clip-text text-transparent">
                    {title}
                </h2>
                <p className="text-sm font-medium text-white/60 
                          leading-relaxed max-w-[90%]">
                    {description}
                </p>
            </div>

            {/* Hover Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br 
                             from-blue-1/[0.02] to-purple-1/[0.02] 
                             opacity-0 transition-opacity duration-300 
                             group-hover:opacity-100" />
            </div>
        </section>
    );
};

export default HomeCard
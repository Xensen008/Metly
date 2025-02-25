'use client';

import { useCallback, useMemo } from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';

interface UpcomingMeetingBannerProps {
  className?: string;
}

const UpcomingMeetingBanner = ({ className }: UpcomingMeetingBannerProps) => {
  const { upcomingCalls, isLoading } = useGetCalls();

  // Memoize the next meeting calculation
  const nextMeeting = useMemo(() => {
    if (!upcomingCalls?.length) return null;

    try {
      const sorted = [...upcomingCalls].sort((a, b) => {
        const dateA = a.state?.startsAt ? new Date(a.state.startsAt) : new Date(Date.now() + 999999999);
        const dateB = b.state?.startsAt ? new Date(b.state.startsAt) : new Date(Date.now() + 999999999);
        return dateA.getTime() - dateB.getTime();
      });

      const earliest = sorted[0];
      if (!earliest?.state?.startsAt) return null;

      return {
        date: new Date(earliest.state.startsAt),
        title: earliest.state?.custom?.description || 'Meeting'
      };
    } catch (error) {
      console.error("Error processing upcoming calls:", error);
      return null;
    }
  }, [upcomingCalls]);

  const formatMeetingTime = useCallback((date: Date) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
                  
    const isTomorrow = date.getDate() === tomorrow.getDate() && 
                     date.getMonth() === tomorrow.getMonth() && 
                     date.getFullYear() === tomorrow.getFullYear();

    const time = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });

    if (isToday) {
      return `Today: ${time}`;
    } else if (isTomorrow) {
      return `Tomorrow: ${time}`;
    } else {
      return `${date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })}: ${time}`;
    }
  }, []);

  if (isLoading) {
    return (
      <h2 className={`glassmorphism max-w-[350px] rounded py-2 text-base text-center font-normal ${className}`}>
        Loading upcoming meetings...
      </h2>
    );
  }

  if (!nextMeeting) {
    return (
      <h2 className={`glassmorphism max-w-[350px] rounded py-2 text-base text-center font-normal ${className}`}>
        No upcoming meetings
      </h2>
    );
  }

  return (
    <h2 className={`glassmorphism max-w-[350px] rounded py-2 text-base text-center font-normal ${className}`}>
      Upcoming meeting at {formatMeetingTime(nextMeeting.date)}
    </h2>
  );
};

export default UpcomingMeetingBanner;
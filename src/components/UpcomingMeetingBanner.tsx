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
      <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-4 w-fit">
        <p className="text-white font-medium">Loading upcoming meetings...</p>
      </div>
    );
  }

  if (!nextMeeting) {
    return (
      <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-4 w-fit">
        <p className="text-white font-medium">No upcoming meetings</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-black/30 backdrop-blur-md border border-white/10 p-4 w-fit">
      <p className="text-white font-medium">Upcoming meeting at {formatMeetingTime(nextMeeting.date)}</p>
    </div>
  );
};

export default UpcomingMeetingBanner;
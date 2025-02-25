'use client';

import { useCallback, useEffect, useState } from 'react';
import { useGetCalls } from '@/hooks/useGetCalls';

interface UpcomingMeetingBannerProps {
  className?: string;
}

const UpcomingMeetingBanner = ({ className }: UpcomingMeetingBannerProps) => {
  const { upcomingCalls, isLoading } = useGetCalls();
  const [nextMeeting, setNextMeeting] = useState<{ date: Date; title: string } | null>(null);
  
  // Use useEffect with stable dependencies
  useEffect(() => {
    // Only update if we have calls and they've changed
    if (upcomingCalls && upcomingCalls.length > 0) {
      try {
        // Create a safe copy to work with
        const callsCopy = [...upcomingCalls];
        
        // Sort meetings by start time and get the earliest one
        const sortedMeetings = callsCopy.sort((a, b) => {
          // Safely handle missing data
          const dateA = a.state?.startsAt ? new Date(a.state.startsAt) : new Date(Date.now() + 999999999);
          const dateB = b.state?.startsAt ? new Date(b.state.startsAt) : new Date(Date.now() + 999999999);
          return dateA.getTime() - dateB.getTime();
        });
        
        const earliest = sortedMeetings[0];
        
        // Only update state if we have a valid meeting
        if (earliest && earliest.state?.startsAt) {
          setNextMeeting({
            date: new Date(earliest.state.startsAt),
            title: earliest.state?.custom?.description || 'Meeting'
          });
        } else {
          setNextMeeting(null);
        }
      } catch (error) {
        console.error("Error processing upcoming calls:", error);
        setNextMeeting(null);
      }
    } else {
      setNextMeeting(null);
    }
    
    // Important: This effect should only run when upcomingCalls actually changes
    // Using JSON.stringify to do a deep comparison
  }, [JSON.stringify(upcomingCalls?.map(call => call.id))]);
  
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
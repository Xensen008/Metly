'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ActivityWidget = () => {
  const { upcomingCalls, endedCalls } = useGetCalls();
  const [currentMeetingIndex, setCurrentMeetingIndex] = useState(0);

  // Auto-rotate through meetings
  useEffect(() => {
    if (!upcomingCalls || upcomingCalls.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMeetingIndex(prev => 
        prev === upcomingCalls.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change meeting every 3 seconds

    return () => clearInterval(interval);
  }, [upcomingCalls]);

  const stats = {
    totalParticipants: endedCalls?.reduce((sum, call) => 
      sum + (call.state.participants?.length || 0), 0) || 0,
    totalMeetings: (endedCalls?.length || 0) + (upcomingCalls?.length || 0),
    upcomingCount: upcomingCalls?.length || 0
  };

  // Helper function to get meeting counter text
  const getMeetingCounterText = () => {
    if (!upcomingCalls || upcomingCalls.length <= 1) return '';
    return `(${currentMeetingIndex + 1}/${upcomingCalls.length})`;
  };

  return (
    <div className="flex flex-col gap-4 p-5 rounded-xl border border-white/[0.08] 
                  bg-gradient-to-br from-dark-2/80 via-dark-1/90 to-dark-2/80 
                  backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white/90">Activity Overview</h3>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="p-3 rounded-lg bg-white/[0.03] space-y-1">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar size={14} />
            <span className="text-sm">Meetings</span>
          </div>
          <p className="text-xl font-semibold text-white">{stats.totalMeetings}</p>
        </div>
      </div>

      {/* Upcoming Meeting Carousel */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white/70">
          Next Meeting {getMeetingCounterText()}
        </h4>
        
        <div className="relative h-[70px]"> {/* Fixed height container */}
          <AnimatePresence mode="wait">
            {upcomingCalls && upcomingCalls.length > 0 ? (
              <motion.div
                key={upcomingCalls[currentMeetingIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="flex items-center gap-3 p-3 rounded-lg 
                             bg-white/[0.03] hover:bg-white/[0.05] 
                             transition-colors duration-200">
                  <div className="flex-center size-9 rounded-full bg-blue-500/10">
                    <Clock size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/90 truncate">
                      {upcomingCalls[currentMeetingIndex].state?.custom?.description || 'Untitled Meeting'}
                    </p>
                    <p className="text-xs text-white/60">
                      {formatDistanceToNow(
                        new Date(upcomingCalls[currentMeetingIndex].state.startsAt || ''), 
                        { addSuffix: true }
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-white/50 text-center py-5"
              >
                No upcoming meetings
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ActivityWidget;

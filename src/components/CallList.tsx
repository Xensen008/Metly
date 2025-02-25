'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Loader from './Loader';
import { useGetCalls } from '@/hooks/useGetCalls';
import MeetingCard from './MeetingCard';

interface QueryRecordingsResponse {
    recordings: CallRecording[];
}

const CallList = ({ type, limit }: { type: 'ended' | 'upcoming' | 'recordings'; limit?: number }) => {
    const router = useRouter();
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Format date to be human readable
    const formatDate = useCallback((date: Date | null | undefined) => {
        if (!date) return 'No date available';

        // Format: "Feb 25, 2025, 2:30 PM"
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    }, []);

    // Safely query recordings with error handling
    const safeQueryRecordings = useCallback(async (meeting: Call): Promise<QueryRecordingsResponse> => {
        try {
            return await meeting.queryRecordings();
        } catch (err) {
            console.error(`Error querying recordings for meeting ${meeting.id}:`, err);
            return { recordings: [] };
        }
    }, []);

    // Add a refresh function that can be called manually
    const refreshRecordings = useCallback(async () => {
        if (type !== 'recordings' || !callRecordings || callRecordings.length === 0) return;

        setIsRefreshing(true);
        try {
            const results = await Promise.allSettled(
                callRecordings.map(meeting => safeQueryRecordings(meeting))
            );

            const callData = results
                .filter((result): result is PromiseFulfilledResult<QueryRecordingsResponse> => 
                    result.status === 'fulfilled'
                )
                .map(result => result.value);

            const newRecordings = callData
                .filter(call => call && call.recordings && call.recordings.length > 0)
                .flatMap(call => call.recordings);

            setRecordings(newRecordings);
        } catch (err) {
            console.error("Error fetching recordings:", err);
            setError("Failed to fetch recordings");
        } finally {
            setIsRefreshing(false);
        }
    }, [type, callRecordings, safeQueryRecordings]);

    useEffect(() => {
        if (type === 'recordings') {
            refreshRecordings();
        }
    }, [type, refreshRecordings]);

    useEffect(() => {
        if (type === 'recordings') {
            const intervalId = setInterval(() => {
                refreshRecordings();
            }, 120000); //2 hours

            return () => clearInterval(intervalId);
        }
    }, [type, refreshRecordings]);

    // Helper function to generate unique keys for each item
    const getItemKey = useCallback((meeting: Call | CallRecording, index: number) => {
        if (type === 'recordings') {
            const rec = meeting as CallRecording;
            return `recording-${rec.filename || rec.url || ''}-${index}`;
        } else {
            const call = meeting as Call;
            return `call-${call.id || index}`;
        }
    }, [type]);

    const getCalls = useCallback(() => {
        const allCalls = {
          'ended': endedCalls || [],
          'recordings': recordings,
          'upcoming': upcomingCalls || [],
        }[type] || [];
        
        // Apply limit if provided
        return limit ? allCalls.slice(0, limit) : allCalls;
      }, [type, endedCalls, upcomingCalls, recordings, limit]);

    const getNoCallsMessage = useCallback(() => {
        switch (type) {
            case 'ended':
                return 'No Previous Calls';
            case 'upcoming':
                return 'No Upcoming Calls';
            case 'recordings':
                return 'No Recordings';
            default:
                return '';
        }
    }, [type]);

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

    if (isLoading) return <Loader />;
    if (error) return <h1 className="text-2xl font-bold text-white">{error}</h1>;

    return (
        <div className="flex flex-col gap-6">
            {type === 'recordings' && (
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-white">Your Recordings</h2>
                    <button
                        onClick={() => refreshRecordings()}
                        className="bg-blue-1 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center gap-2 transition-all duration-200 shadow-md disabled:opacity-60 disabled:shadow-none disabled:cursor-not-allowed"
                        disabled={isRefreshing}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className={`transition-transform ${isRefreshing ? "animate-spin" : ""}`}
                        >
                            <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                        {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
            )}

            {/* Main content */}
            <div
                className={`grid grid-cols-1 gap-5 xl:grid-cols-2 relative ${isRefreshing && type === 'recordings' ? 'overflow-hidden' : ''
                    }`}
            >
                {isRefreshing && type === 'recordings' && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg z-10">
                        <Loader />
                    </div>
                )}

                {calls && calls.length > 0 ? (
                    calls.map((meeting: Call | CallRecording, index: number) => {
                        // Type guard functions for better type safety
                        const isRecording = (m: Call | CallRecording): m is CallRecording =>
                            type === 'recordings' && 'filename' in m;

                        const isCall = (m: Call | CallRecording): m is Call =>
                            (type === 'ended' || type === 'upcoming') && 'id' in m;

                        const title = isRecording(meeting)
                            ? (meeting.filename?.substring(0, 20) || 'No Description')
                            : isCall(meeting)
                                ? (meeting.state?.custom?.description || 'No Description')
                                : 'No Description';

                        const dateValue = isRecording(meeting)
                            ? (typeof meeting.start_time === 'string' ? new Date(meeting.start_time) : meeting.start_time)
                            : isCall(meeting)
                                ? (typeof meeting.state?.startsAt === 'string' ? new Date(meeting.state.startsAt) : meeting.state?.startsAt)
                                : null;

                        const date = formatDate(dateValue);

                        const link = isRecording(meeting)
                            ? meeting.url
                            : isCall(meeting)
                                ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
                                : '#';

                        return (
                            <MeetingCard
                                key={getItemKey(meeting, index)}
                                icon={
                                    type === 'ended'
                                        ? '/icons/previous.svg'
                                        : type === 'upcoming'
                                            ? '/icons/upcoming.svg'
                                            : '/icons/recordings.svg'
                                }
                                title={title}
                                date={date}
                                isPreviousMeeting={type === 'ended'}
                                link={link}
                                buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                                buttonText={type === 'recordings' ? 'Play' : 'Start'}
                                handleClick={
                                    type === 'recordings'
                                        ? () => window.open((meeting as CallRecording).url, '_blank')
                                        : () => router.push(`/meeting/${(meeting as Call).id}`)
                                }
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full flex items-center justify-center py-12">
                        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CallList;
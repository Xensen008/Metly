import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCalls = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      try {
        setIsLoading(true);
        // Fetch calls from the Stream API
        const response = await client.queryCalls({
          filter_conditions: {
            created_by_user_id: user.id,
          },
          sort: [{ field: "created_at", direction: -1 }],
          limit: 10,
        });

        setCalls(response.calls);
      } catch (error) {
        console.error("Error fetching calls:", error);
        // You could add toast notification here to inform user
      } finally {
        setIsLoading(false);
      }
    };

    if (client && user?.id) {
      loadCalls();
    }
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }) => {
    if (!startsAt) return false;
    return endedAt || startsAt < now;
  });

  const upcomingCalls = calls?.filter(({ state: { startsAt } }) => {
    if (!startsAt) return false;
    return startsAt > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading
  };
};
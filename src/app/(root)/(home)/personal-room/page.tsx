"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Copy, Video, Users, LinkIcon } from "lucide-react";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const InfoCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-dark-4/60 bg-gradient-to-br from-dark-3 to-dark-4/50 p-6 backdrop-blur-sm transition-all hover:border-dark-4 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full bg-blue-1/20 p-2 text-blue-1">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-gray-300 lg:text-lg">{title}</h2>
      </div>
      <p className="truncate text-base font-medium text-white max-sm:max-w-[260px]">
        {description}
      </p>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-1 to-blue-500">
            <Video className="size-6" />
          </div>
          <h1 className="text-2xl font-bold lg:text-3xl">Personal Meeting Room</h1>
        </div>
        <p className="text-gray-400">Your dedicated space for hosting instant meetings</p>
      </div>
      
      <div className="grid w-full gap-4 md:grid-cols-3 xl:max-w-[1000px]">
        <InfoCard 
          title="Topic" 
          description={`${user?.username}'s Meeting Room`} 
          icon={<Users className="size-5" />}
        />
        <InfoCard 
          title="Meeting ID" 
          description={meetingId || ""} 
          icon={<Video className="size-5" />}
        />
        <InfoCard 
          title="Invite Link" 
          description={meetingLink} 
          icon={<LinkIcon className="size-5" />}
        />
      </div>
      
      <div className="mt-4 flex flex-col gap-5 sm:flex-row">
        <Button 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-1 to-blue-600 px-8 py-6 text-base font-medium transition-transform hover:scale-105 hover:shadow-lg" 
          onClick={startRoom}
        >
          <Video className="size-5" />
          Start Meeting
        </Button>
        <Button
          className="flex items-center gap-2 bg-dark-3 px-8 py-6 text-base font-medium hover:bg-dark-2"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast("Invitation Link Copied!");
          }}
        >
          <Copy className="size-5" />
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
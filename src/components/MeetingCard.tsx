"use client";

import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "../../constant";
import { Download } from "lucide-react";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
  className?: string; 
  isRecording?: boolean;
  recordingUrl?: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
  className,
  isRecording,
  recordingUrl,
}: MeetingCardProps) => {
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `recording-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.success("Download started!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download recording");
    }
  };

  return (
    <section
      className={cn(
        "group relative overflow-hidden",
        "rounded-xl border border-white/[0.08]",
        "bg-gradient-to-br from-dark-2/80 via-dark-1/90 to-dark-2/80",
        "p-6 transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "backdrop-blur-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex-center size-12 rounded-xl 
                       bg-dark-3/50 border border-dark-3/30
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]
                       transition-all duration-300 group-hover:scale-105
                       group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Image
              src={icon}
              alt={title}
              width={24}
              height={24}
              className="opacity-80 transition-all duration-300 
                       group-hover:opacity-100 group-hover:scale-110"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold truncate 
                        bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="mt-1.5 text-sm text-white/60">{date}</p>
          </div>
        </div>

        {/* Attendees */}
        <div className="flex items-center -space-x-2">
          {avatarImages.slice(0, 4).map((img, i) => (
            <div key={i} className="relative size-10 first:ml-0 
                                transition-transform duration-300 
                                hover:scale-110 hover:z-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br 
                          from-white/20 to-white/5 blur-sm opacity-0 
                          transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src={img}
                alt={`attendee-${i + 1}`}
                width={40}
                height={40}
                className="relative rounded-full border-2 border-dark-3/50 
                        transition-all duration-300 hover:border-blue-1/50"
              />
            </div>
          ))}
          <div className="flex-center size-10 rounded-full 
                       bg-dark-4/80 border-2 border-dark-3/50
                       text-xs font-medium text-white/70
                       hover:bg-blue-1/20 hover:border-blue-1/50 
                       transition-all duration-300">
            +5
          </div>
        </div>

        {/* Actions */}
        {!isPreviousMeeting && (
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <button
              onClick={handleClick}
              className="flex-1 sm:flex-initial flex-center gap-2 
                     rounded-full bg-blue-1 px-5 py-2.5
                     text-sm font-medium text-white
                     transition-all duration-300 hover:bg-blue-600
                     shadow-lg shadow-blue-1/20"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="" width={18} height={18} 
                       className="transition-transform duration-300" />
              )}
              {buttonText}
            </button>

            {isRecording && recordingUrl && (
              <button
                onClick={() => handleDownload(recordingUrl)}
                className="flex-1 sm:flex-initial flex-center gap-2 
                       rounded-full bg-dark-4/80 px-5 py-2.5
                       text-sm font-medium text-white/80
                       transition-all duration-300 hover:bg-dark-3"
              >
                <Download className="size-4" />
                Download
              </button>
            )}

            <button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast("Link copied!", {
                  description: "Share this link to invite others",
                  className: "rounded-xl bg-dark-2 border border-dark-3/20"
                });
              }}
              className="flex-1 sm:flex-initial flex-center gap-2 
                     rounded-full bg-dark-4/80 px-5 py-2.5
                     text-sm font-medium text-white/80
                     transition-all duration-300 hover:bg-dark-3
                     backdrop-blur-sm"
            >
              <Image src="/icons/copy.svg" alt="copy" width={16} height={16} />
              Copy Link
            </button>
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br 
                     from-blue-1/[0.03] to-purple-1/[0.03]" />
      </div>
    </section>
  );
};

export default MeetingCard;
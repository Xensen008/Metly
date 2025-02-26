"use client";

import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "../../constant";

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
}: MeetingCardProps) => {
  return (
    <section
      className={cn(
        "group flex min-h-[258px] w-full flex-col justify-between",
        "rounded-[20px] bg-gradient-to-br from-dark-1 to-dark-2",
        "px-7 py-8 transition-all duration-300",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:translate-y-[-2px]",
        "border border-dark-3/20",
        "xl:max-w-[568px]",
        className
      )}
    >
      <article className="flex flex-col gap-7">
        <div className="flex items-center gap-5">
          <div className="p-2 rounded-full bg-dark-3/30">
            <Image 
              src={icon} 
              alt="meeting-type" 
              width={28} 
              height={28} 
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-bold line-clamp-1 hover:line-clamp-none text-gradient">
              {title}
            </h1>
            <p className="text-base font-normal text-gray-400/90">{date}</p>
          </div>
        </div>

        <div className="relative flex items-center">
          <div className="flex -space-x-4">
            {avatarImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`attendee-${index + 1}`}
                width={48}
                height={48}
                className="rounded-full border-2 border-dark-3/50 transition-all 
                         hover:scale-110 hover:z-10 hover:border-blue-1/50
                         shadow-sm"
              />
            ))}
            <div className="flex-center size-12 rounded-full 
                          border-2 border-dark-3/50 bg-dark-4 
                          hover:bg-blue-1 hover:border-blue-1/50 
                          transition-all duration-300 shadow-sm">
              <span className="text-sm font-medium">+5</span>
            </div>
          </div>
        </div>
      </article>

      <article className="flex justify-end gap-4 mt-7">
        {!isPreviousMeeting && (
          <>
            <Button
              onClick={handleClick}
              className="rounded-full bg-gradient-to-r from-blue-1 to-blue-2 
                       px-7 py-2.5 hover:opacity-90 transition-all duration-300 
                       flex items-center gap-3 shadow-md"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              <span className="font-medium">{buttonText}</span>
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast("Link copied to clipboard!", {
                  description: "You can now share this meeting link",
                  className: "rounded-xl bg-dark-2 border border-dark-3/20"
                });
              }}
              className="rounded-full bg-dark-4/80 px-7 py-2.5 
                       hover:bg-dark-3 transition-all duration-300 
                       flex items-center gap-3 backdrop-blur-sm"
            >
              <Image
                src="/icons/copy.svg"
                alt="copy"
                width={20}
                height={20}
              />
              <span className="font-medium">Copy Link</span>
            </Button>
          </>
        )}
      </article>
    </section>
  );
};

// Add this to your global CSS file
const styles = `
.text-gradient {
  background: linear-gradient(to right, #fff, #a1a1aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
`;

export default MeetingCard;
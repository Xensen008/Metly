import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
// import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
    title: string;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
}

const MeetingModal = ({
    isOpen,
    onClose,
    className,
    image,
    children,
    handleClick,
    buttonIcon,
    title,
    buttonText,
}: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn(
                "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
                "w-full max-w-[480px] rounded-2xl",
                "border border-white/[0.08] bg-dark-2/95 backdrop-blur-xl",
                "p-6 sm:p-8 text-white",
                "z-50"
            )}>
                <DialogHeader>
                    <DialogTitle className="sr-only">{title}</DialogTitle>
                </DialogHeader>

                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Icon */}
                    {image && (
                        <div className="group relative">
                            <div className="absolute -inset-0.5 rounded-xl 
                                        bg-gradient-to-br from-blue-1/20 to-purple-1/20 
                                        opacity-0 blur transition-opacity duration-300 
                                        group-hover:opacity-100" />
                            <div className="relative flex-center size-16 rounded-xl 
                                        bg-dark-3/50 border border-white/[0.08]
                                        transition-all duration-300 group-hover:scale-105">
                                <Image 
                                    src={image} 
                                    alt={title}
                                    width={32}
                                    height={32}
                                    className="opacity-90 transition-all duration-300 
                                             group-hover:opacity-100" 
                                />
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <div className="text-center space-y-1.5">
                        <h2 className="text-2xl font-bold bg-gradient-to-r 
                                   from-white to-white/80 bg-clip-text text-transparent">
                            {title}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="w-full space-y-4">
                        {children}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4 w-full pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 flex-center rounded-xl 
                                   bg-white/[0.05] px-5 py-3
                                   text-sm font-medium text-white/70
                                   transition-all duration-300 hover:bg-white/[0.08]"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleClick}
                            className="flex-1 flex-center gap-2 rounded-xl 
                                   bg-blue-1 px-5 py-3
                                   text-sm font-medium text-white
                                   transition-all duration-300 hover:bg-blue-600"
                        >
                            {buttonIcon && (
                                <Image 
                                    src={buttonIcon} 
                                    alt=""
                                    width={18}
                                    height={18}
                                />
                            )}
                            {buttonText || "Confirm"}
                        </button>
                    </div>
                </motion.div>

                {/* Background Effects */}
                <div className="absolute inset-0 rounded-2xl -z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-1/5 to-purple-1/5" />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;

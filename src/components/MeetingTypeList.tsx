'use client'

import HomeCard from './HomeCard'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'


const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const router = useRouter()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        datetime: new Date(),
        Description: '',
        link: '',

    })

    const [callDetails, setCallDetails] = useState<Call>()


    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.datetime) {
                toast("Please select a date and time")
                return
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id)

            if (!call) {
                throw new Error('faild to create a call')
            }

            const startsAt = values.datetime.toISOString() || new Date().toISOString()
            const description = values.Description || 'Instant Meeting'

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call)

            if (!values.Description) {
                router.push(`/meeting/${id}`)
            }
            toast("Meeting created successfully")
        } catch (error) {
            console.log(error)
            toast("An error accured while creating the meeting")
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Create and start an instant meeting. Perfect for quick collaborations and impromptu discussions."
                className="bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-400/5
                         hover:from-blue-600/30 hover:via-blue-500/20 hover:to-blue-400/10"
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Enter a meeting link to join an existing session. Connect with your team instantly."
                className="bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-emerald-400/5
                         hover:from-emerald-600/30 hover:via-emerald-500/20 hover:to-emerald-400/10"
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Schedule a meeting"
                className="bg-gradient-to-br from-amber-600/20 via-amber-500/10 to-amber-400/5
                         hover:from-amber-600/30 hover:via-amber-500/20 hover:to-amber-400/10"
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="Recordings"
                description="Manage recordings"
                className="bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-purple-400/5
                         hover:from-purple-600/30 hover:via-purple-500/20 hover:to-purple-400/10"
                handleClick={() => router.push('/recordings')}
            />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                    className="bg-[#1a1a1a]"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">
                                Description
                            </label>
                            <Textarea
                                className="bg-gray-800/30 border-0 focus-visible:ring-1 focus-visible:ring-gray-600"
                                onChange={(e) =>
                                    setValues({ ...values, Description: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">
                                Date and Time
                            </label>
                            <ReactDatePicker
                                selected={values.datetime}
                                onChange={(date) => setValues({ ...values, datetime: date! })}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                className="w-full rounded-lg bg-gray-800/30 p-2.5 text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-600"
                            />
                        </div>
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast( 'Link Copied' );
                    }}
                    image={'/icons/checked.svg'}
                    buttonIcon="/icons/copy.svg"
                    className="text-center"
                    buttonText="Copy Meeting Link"
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center bg-[#1a1a1a]"
                buttonText="Join Meeting"
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder="Paste meeting link"
                    onChange={(e) => setValues({ ...values, link: e.target.value })}
                    className="bg-gray-800/30 border-0 focus-visible:ring-1 focus-visible:ring-gray-600"
                />
            </MeetingModal>

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center bg-[#1a1a1a]"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

        </div>
    )
}

export default MeetingTypeList
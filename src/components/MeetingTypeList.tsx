'use client'

import HomeCard from './HomeCard'
import React, {useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from "sonner"



const MeetingTypeList = () => {
    const [meetingState, setMeetingState] = useState<
        'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
    >(undefined);
    const router = useRouter()
    const {user} = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
        datetime: new Date(),
        Description: '',
        link: '',
       
    })

    const [callDetails, setCallDetails] = useState<Call>()


    const createMeeting = async () => {
        if(!client|| !user) return;
        try {
            if(!values.datetime){
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
                data:{
                    starts_at: startsAt,
                    custom:{
                        description
                    }
                }
            })

            setCallDetails(call)

            if(!values.Description){
                router.push(`/meeting/${id}`)
            }
            toast("Meeting created successfully")
        } catch (error) {
            console.log(error)
            toast("An error accured while creating the meeting")
        }
    } 

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState('isJoiningMeeting')}
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                className="bg-yellow-1"
                handleClick={() => setMeetingState('isScheduleMeeting')}
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Meeting Recordings"
                className="bg-purple-1"
                handleClick={() => router.push('/recordings')}
            />

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an instant meeting"
                classname="text-center"
                buttonText="Start Meeting"
                // children="Instant Meeting"
                handleClick={createMeeting}
            
            />

        </section>
    )
}

export default MeetingTypeList
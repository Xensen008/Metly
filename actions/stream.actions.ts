'use server'

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECREAT_KEY

export const tokenProvider = async () => {
    const user = await currentUser()

    if(!user){
        throw new Error("User not found")
    }
    if(!apikey){
        throw new Error("Api key not found")
    }
    if(!apiSecret){
        throw new Error("Api secret not found")
    }

    const client = new StreamClient(apikey, apiSecret)
    
    // validity is optional (by default the token is valid for an hour)
    const validity = 3600 // 1 hour in seconds

    const token = client.generateUserToken({ 
        user_id: user.id, 
        validity_in_seconds: validity 
    })

    return token
}
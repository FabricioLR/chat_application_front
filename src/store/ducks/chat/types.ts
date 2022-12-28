export enum ChatTypes{
    "LOAD_REQUEST" = "@Chat/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@Chat/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@Chat/LOAD_FAILURE",
}

export type GetMessagePayload = {
    contactId: string
}

export type Chat = {
    myMessages: {
        id: string
        fromId: string
        toId: string
        message: string
        to: {
            id: string
            name: string
            profile_image: string
        }
        from: {
            id: string
            name: string
            profile_image: string
        }
    }[]
    messagesForMe: {
        id: string
        fromId: string
        toId: string
        message: string
        to: {
            id: string
            name: string
            profile_image: string
        }
        from: {
            id: string
            name: string
            profile_image: string
        }
    }[]
}

export interface ChatState{
    readonly data: Chat | null
    readonly loading: boolean
    readonly error: boolean
}
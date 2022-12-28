export enum MessagesTypes{
    "LOAD_REQUEST" = "@Messages/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@Messages/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@Messages/LOAD_FAILURE",

    "ADD_REQUEST" = "@Messages/ADD_REQUEST",
    "ADD_SUCCESS" = "@Messages/ADD_SUCCESS",
    "ADD_FAILURE" = "@Messages/ADD_FAILURE",
}

export type AddContactPayload = {
    contactId: string
}

export type Message = {
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

export interface MessagesState{
    readonly data: Message | null
    readonly loading: boolean
    readonly error: boolean
}
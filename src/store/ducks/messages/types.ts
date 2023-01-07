export enum MessagesTypes{
    "LOAD_REQUEST" = "@Messages/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@Messages/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@Messages/LOAD_FAILURE",

    "ADD_REQUEST" = "@Messages/ADD_REQUEST",
    "ADD_SUCCESS" = "@Messages/ADD_SUCCESS",
    "ADD_FAILURE" = "@Messages/ADD_FAILURE",

    "FILTER_REQUEST" = "@Messages/FILTER_REQUEST",

    "MESSAGE_REQUEST" = "@Messages/MESSAGE_REQUEST",

    "UPDATE_MESSAGE" = "@Messages/UPDATE_MESSAGE",

    "UPDATE_MESSAGE_FRONT" = "@Messages/UPDATE_MESSAGE_FRONT",
}

export type Payload = {
    contactId: string
    message: Pick<Message, "fromId"|"message"|"contactId"|"viewed"|"createdAt"> | string
    already: boolean
}

export type Message = {
    id: string
    fromId: string
    toId: string
    message: string
    contactId: string
    viewed: boolean
    createdAt: Date
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
}

export interface MessagesState{
    readonly data: Message[]
    readonly chat: Pick<Message, "fromId"|"message"|"contactId"|"viewed"|"createdAt">[]
    readonly loading: boolean
    readonly error: boolean
}
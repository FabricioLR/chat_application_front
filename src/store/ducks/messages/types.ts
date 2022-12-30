export enum MessagesTypes{
    "LOAD_REQUEST" = "@Messages/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@Messages/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@Messages/LOAD_FAILURE",

    "ADD_REQUEST" = "@Messages/ADD_REQUEST",
    "ADD_SUCCESS" = "@Messages/ADD_SUCCESS",
    "ADD_FAILURE" = "@Messages/ADD_FAILURE",

    "FILTER_REQUEST" = "@Messages/FILTER_REQUEST",

    "MESSAGE_REQUEST" = "@Messages/MESSAGE_REQUEST",
}

export type Payload = {
    contactId: string
    message: Omit<Message, "id"|"toId"|"to"|"from"> | string
    already: boolean
}

export type AddMessagePayload = {
    contactId: string
    message: string
}

export type MessagePayload = {
    message: Omit<Message, "id"|"toId"|"to"|"from">
    already: boolean
}

export type Message = {
    id: string
    fromId: string
    toId: string
    message: string
    contactId: string
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
    readonly chat: Omit<Message, "id"|"toId"|"contactId"|"to"|"from">[]
    readonly loading: boolean
    readonly error: boolean
}
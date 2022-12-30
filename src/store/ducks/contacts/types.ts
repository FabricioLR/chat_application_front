export enum ContactsTypes{
    "LOAD_REQUEST" = "@Contacts/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@Contacts/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@Contacts/LOAD_FAILURE",

    "ADD_REQUEST" = "@Contacts/ADD_REQUEST",
    "ADD_SUCCESS" = "@Contacts/ADD_SUCCESS",
    "ADD_FAILURE" = "@Contacts/ADD_FAILURE",

    "FILTER_REQUEST" = "@Contacts/FILTER_REQUEST",
}

export type Payload = {
    name: string
    setLoad: Function
    userId: string
}

export type Contact = {
    id: string
    user1Id: string
    user2Id: string
    user1: {
        id: string
        name: string
        profile_image: string
    }
    user2: {
        id: string
        name: string
        profile_image: string
    }
}

export interface ContactsState{
    readonly data: Contact[]
    readonly search: Contact[]
    readonly loading: boolean
    readonly error: boolean
}
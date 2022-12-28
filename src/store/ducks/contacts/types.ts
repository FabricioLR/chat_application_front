export enum ContactsTypes{
    "LOAD_REQUEST" = "@Contacts/LOAD_REQUEST",
    "LOAD_SUCCESS" = "@Contacts/LOAD_SUCCESS",
    "LOAD_FAILURE" = "@Contacts/LOAD_FAILURE",

    "ADD_REQUEST" = "@Contacts/ADD_REQUEST",
    "ADD_SUCCESS" = "@Contacts/ADD_SUCCESS",
    "ADD_FAILURE" = "@Contacts/ADD_FAILURE",
}

export type AddContactPayload = {
    name: string
    setLoad: Function
}

export type Contact = {
    id: string
    userId: string
    contactId: string
    user: {
        id: string
        name: string
        profile_image: string
    }
    contact: {
        id: string
        name: string
        profile_image: string
    }
}

export interface ContactsState{
    readonly data: Contact[]
    readonly loading: boolean
    readonly error: boolean
}
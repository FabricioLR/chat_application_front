import { action } from "typesafe-actions";
import { Contact, ContactsTypes, Payload } from "./types"

export const loadRequest = () => action(ContactsTypes.LOAD_REQUEST)
export const loadSuccess = (data: Contact[]) => action(ContactsTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(ContactsTypes.LOAD_FAILURE)

export const addRequest = (payload: Pick<Payload, "setLoad"|"name">) => action(ContactsTypes.ADD_REQUEST, { payload })
export const addSuccess = (data: Contact) => action(ContactsTypes.ADD_SUCCESS, { data })
export const addFailure = () => action(ContactsTypes.ADD_FAILURE)

export const filterRequest = (payload: Pick<Payload, "name"|"userId">) => action(ContactsTypes.FILTER_REQUEST, { payload })

export const setCurrentContact = (payload: Pick<Payload, "name"|"profile_image"|"contactId"|"online">) => action(ContactsTypes.SET_CURRENTCONTACT, { payload })

export const setCurrentContactStatus = (payload: Pick<Payload, "online">) => action(ContactsTypes.SET_CURRENTCONTACT_STATUS, { payload })

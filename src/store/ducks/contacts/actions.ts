import { action } from "typesafe-actions";
import { AddContactPayload, Contact, ContactsTypes } from "./types"

export const loadRequest = () => action(ContactsTypes.LOAD_REQUEST)
export const loadSuccess = (data: Contact[]) => action(ContactsTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(ContactsTypes.LOAD_FAILURE)

export const addRequest = (payload: AddContactPayload) => action(ContactsTypes.ADD_REQUEST, { payload })
export const addSuccess = (data: Contact) => action(ContactsTypes.ADD_SUCCESS, { data })
export const addFailure = () => action(ContactsTypes.ADD_FAILURE)

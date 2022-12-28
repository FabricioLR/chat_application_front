import { action } from "typesafe-actions";
import { AddContactPayload, Message, MessagesTypes } from "./types"

export const loadRequest = () => action(MessagesTypes.LOAD_REQUEST)
export const loadSuccess = (data: Message) => action(MessagesTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(MessagesTypes.LOAD_FAILURE)

export const addRequest = (payload: AddContactPayload) => action(MessagesTypes.ADD_REQUEST, { payload })
export const addSuccess = (data: Message) => action(MessagesTypes.ADD_SUCCESS, { data })
export const addFailure = () => action(MessagesTypes.ADD_FAILURE)

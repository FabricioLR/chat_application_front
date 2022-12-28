import { action } from "typesafe-actions";
import { Chat, ChatTypes } from "./types"

export const loadRequest = () => action(ChatTypes.LOAD_REQUEST)
export const loadSuccess = (data: Chat) => action(ChatTypes.LOAD_SUCCESS, { data })
export const loadFailure = () => action(ChatTypes.LOAD_FAILURE)

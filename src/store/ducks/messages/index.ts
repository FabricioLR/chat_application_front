import { Reducer } from "redux"
import { MessagesTypes, MessagesState} from "./types"

const INITIAL_STATE: MessagesState = {
    data: [],
    chat: [],
    loading: false,
    error: false
}

const reducer: Reducer<MessagesState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MessagesTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case MessagesTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case MessagesTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        case MessagesTypes.ADD_REQUEST:
            return { ...state, loading: true }
        case MessagesTypes.ADD_SUCCESS:
            return { ...state, loading: false, error: false, data: [...state.data, action.payload.data] }
        case MessagesTypes.ADD_FAILURE:
            return { ...state, loading: false, error: true }
        case MessagesTypes.FILTER_REQUEST:
            const filtred = state.data.filter(message => message.contactId == action.payload.contactId)
            return { ...state, chat: filtred }
        case MessagesTypes.MESSAGE_REQUEST:
            if (action.payload.message.already){
                return { ...state, chat: [...state.chat, { ...action.payload.message, viewed: false }] }
            } else {
                return { ...state, chat: [...state.chat, { ...action.payload.message, viewed: false }], data: [...state.data, { ...action.payload.message, viewed: false }] }
            }
        case MessagesTypes.UPDATE_MESSAGE_FRONT:
            if (action.payload.contactId == action.payload.currentContactId){
                const chatMessages = state.chat.map(message => {
                    return { ...message, viewed: true }
                })

                const dataMessages = state.data.map(message => {
                    if (message.contactId == action.payload.contactId){
                        return { ...message, viewed: true }
                    } else {
                        return { ...message }
                    }
                })

                return { ...state, chat: chatMessages, data: dataMessages }
            } else {
                const dataMessages = state.data.map(message => {
                    if (message.contactId == action.payload.contactId){
                        return { ...message, viewed: true }
                    } else {
                        return { ...message }
                    }
                })

                return { ...state, data: dataMessages }
            }
        default:
            return state
    }
}

export default reducer
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
        default:
            return state
    }
}

export default reducer
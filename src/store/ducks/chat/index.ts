import { Reducer } from "redux"
import { ChatTypes, ChatState} from "./types"

const INITIAL_STATE: ChatState = {
    data: null,
    loading: false,
    error: false
}

const reducer: Reducer<ChatState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ChatTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case ChatTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case ChatTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: null }
        default:
            return state
    }
}

export default reducer
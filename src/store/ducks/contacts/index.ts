import { Reducer } from "redux"
import { ContactsTypes, ContactsState} from "./types"

const INITIAL_STATE: ContactsState = {
    data: [],
    loading: false,
    error: false
}

const reducer: Reducer<ContactsState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactsTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case ContactsTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data }
        case ContactsTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        case ContactsTypes.ADD_REQUEST:
            return { ...state, loading: true }
        case ContactsTypes.ADD_SUCCESS:
            return { ...state, loading: false, error: false, data: [...state.data, action.payload.data] }
        case ContactsTypes.ADD_FAILURE:
            return { ...state, loading: false, error: true }
        default:
            return state
    }
}

export default reducer
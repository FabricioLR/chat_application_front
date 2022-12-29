import { Reducer } from "redux"
import { ContactsTypes, ContactsState, Contact} from "./types"

const INITIAL_STATE: ContactsState = {
    data: [],
    search: [],
    loading: false,
    error: false,
}

const reducer: Reducer<ContactsState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ContactsTypes.LOAD_REQUEST:
            return { ...state, loading: true }
        case ContactsTypes.LOAD_SUCCESS:
            return { ...state, loading: false, error: false, data: action.payload.data, search: action.payload.data}
        case ContactsTypes.LOAD_FAILURE:
            return { ...state, loading: false, error: true, data: [] }
        case ContactsTypes.ADD_REQUEST:
            return { ...state, loading: true }
        case ContactsTypes.ADD_SUCCESS:
            return { ...state, loading: false, error: false, data: [...state.data, action.payload.data], search: [...state.data, action.payload.data] }
        case ContactsTypes.ADD_FAILURE:
            return { ...state, loading: false, error: true }
        case ContactsTypes.FILTER_REQUEST:
            const filterContacts = state.data.map(contact => {
                if (contact.user1Id != action.payload.userId){
                    if (contact.user1.name.includes(action.payload.name)){
                        return contact
                    }
                } else {
                    if (contact.user2.name.includes(action.payload.name)){
                        return contact
                    }
                }
            }) as Contact[]

            const contacts = Object.values(filterContacts).filter(value => value != undefined)

            if (contacts[0]){
                return { ...state, loading: false, error: false, search: contacts }
            } else {
                return { ...state, loading: false, error: false, search: [] }
            }
            
        default:
            return state
    }
}

export default reducer
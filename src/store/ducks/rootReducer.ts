import { combineReducers } from "redux"

import contacts from "./contacts/index"
import messages from "./messages/index"

export default combineReducers({
    contacts, messages
})
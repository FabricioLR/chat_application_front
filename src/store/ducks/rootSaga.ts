import { all, takeLatest } from "redux-saga/effects"
import { AddContact, GetContacts } from "./contacts/saga"
import { ContactsTypes } from "./contacts/types"
import { AddMessage, GetMessages } from "./messages/saga"
import { MessagesTypes } from "./messages/types"

export default function* rootSaga(){
    yield all([
        takeLatest(ContactsTypes.LOAD_REQUEST, GetContacts),
        takeLatest(ContactsTypes.ADD_REQUEST, AddContact),
        takeLatest(MessagesTypes.LOAD_REQUEST, GetMessages),
        takeLatest(MessagesTypes.ADD_REQUEST, AddMessage),
    ])
}
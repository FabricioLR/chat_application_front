import { configureStore, Store } from "@reduxjs/toolkit"
import createMiddleware from "redux-saga"
import { ContactsState } from "./ducks/contacts/types"
import { MessagesState } from "./ducks/messages/types"

import rootReducer from "./ducks/rootReducer"
import rootSaga from "./ducks/rootSaga"

const sagaMiddleware = createMiddleware()

export type ApplicationState = {
    contacts: ContactsState
    messages: MessagesState
}

const store: Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    }
})

sagaMiddleware.run(rootSaga)

export default store
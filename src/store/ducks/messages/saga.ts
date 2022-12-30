import { call, put } from "@redux-saga/core/effects";
import api from "../../../context/api";
import { loadFailure, loadSuccess, addRequest, addSuccess, addFailure} from "./actions";
import { AddMessagePayload, Message } from "./types"

type ResponseData = {
    data: {
        messages: Message[]
        message: Message
    }
    
}

async function getMessages(){
    return await api.get("/GetMessages", {
        headers: {
            token: sessionStorage.getItem("token")
        }
    })
}

async function addMessage(payload: AddMessagePayload){
    return await api.post("/SaveMessage", {
        contactId: payload.contactId,
        message: payload.message,
    }, {
        headers: {
            token: sessionStorage.getItem("token")
        }
    })
}

export function* GetMessages(){
    try {
        const response: ResponseData = yield call(getMessages)

        yield put(loadSuccess(response.data.messages))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(loadFailure())
    }
}

export function* AddMessage({ payload }: ReturnType<typeof addRequest>){
    const { contactId, message } = payload as any

    try {
        const response: ResponseData = yield call(addMessage, { contactId, message })

        yield put(addSuccess(response.data.message))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(addFailure())
    }
}
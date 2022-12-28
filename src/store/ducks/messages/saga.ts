import { call, put } from "@redux-saga/core/effects";
import api from "../../../context/api";
import { loadFailure, loadSuccess, addRequest, addSuccess, addFailure} from "./actions";
import { AddContactPayload, Message } from "./types"

type ResponseData = {
    data:  Message
    
}

type ResponseDataAdd = {
    data: Message
}

async function getMessages(){
    return await api.get("/GetMessages", {
        headers: {
            token: sessionStorage.getItem("token")
        }
    })
}

async function addMessage(payload: AddContactPayload){
    return await api.post("/AddContact", {
        contactId: payload.contactId,
    }, {
        headers: {
            token: sessionStorage.getItem("token")
        }
    })
}

export function* GetMessages(){
    try {
        const response: ResponseData = yield call(getMessages)

        yield put(loadSuccess(response.data))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(loadFailure())
    }
}

export function* AddMessage({ payload }: ReturnType<typeof addRequest>){
    const { contactId } = payload as any

    try {
        const response: ResponseDataAdd = yield call(addMessage, { contactId })

        yield put(addSuccess(response.data))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(addFailure())
    }
}
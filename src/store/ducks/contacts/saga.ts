import { call, put } from "@redux-saga/core/effects";
import api from "../../../context/api";
import { loadFailure, loadSuccess, addRequest, addSuccess, addFailure} from "./actions";
import { Contact, Payload } from "./types"

type ResponseData = {
    data: {
        contacts: Contact[],
        contact: Contact
    }
}

async function getContacts(){
    return await api.get("/GetContacts", {
        headers: {
            token: sessionStorage.getItem("token")
        }
    })
}

async function addContact(payload: Omit<Payload, "setLoad"|"userId">){
    return await api.post("/AddContact", {
        name: payload.name,
    }, {
        headers: {
            token: sessionStorage.getItem("token")
        }
    })
}

export function* GetContacts(){
    try {
        const response: ResponseData = yield call(getContacts)

        yield put(loadSuccess(response.data.contacts))
    } catch (error: any) {
        alert(error.response.data.error)
        yield put(loadFailure())
    }
}

export function* AddContact({ payload }: ReturnType<typeof addRequest>){
    const { name, setLoad } = payload as any

    try {
        const response: Omit<ResponseData, ""> = yield call(addContact, { name })

        setLoad("Add")

        yield put(addSuccess(response.data.contact))
    } catch (error: any) {
        setLoad("Add")
        alert(error.response.data.error)
        yield put(addFailure())
    }
}
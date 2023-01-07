import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/Header"
import { AuthContex } from "../../context/userContext"
import { useDispatch, useSelector } from "react-redux"
import { ContactsTypes } from "../../store/ducks/contacts/types"
import { ApplicationState } from "../../store"
import style from "./home.module.css"
import AddContact from "../../components/addContact/AddContact"
import { MessagesTypes } from "../../store/ducks/messages/types"
import socket from "../../components/socket/socket"
import Chat from "../../components/chat/Chat"
import Contacts from "../../components/contacts/Contacts"

function Home(){
    const { user, VerifyToken } = useContext(AuthContex)
    const State = useSelector(state => state) as ApplicationState
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const response = await VerifyToken()
            if (response.status != 200){
                navigate("/signin")
            } else {
                dispatch({ type: ContactsTypes.LOAD_REQUEST })
                dispatch({ type: MessagesTypes.LOAD_REQUEST})
                socket.emit("whoami", response.name)
            }
        })()
    }, [])

    useEffect(() => {
        socket.on("server message", (message) => {
            const contactMessages = State.messages.data.filter(msg => msg.contactId == message.contactId)
            const latestMessage = contactMessages[contactMessages.length - 1]
            if (latestMessage.message != message.message && latestMessage.createdAt != message.createdAt){
                dispatch({ type: MessagesTypes.MESSAGE_REQUEST, payload: { message, already: false }})
            }
            if (message.contactId == State.contacts.currentContact?.contactId){
                dispatch({ type: MessagesTypes.UPDATE_MESSAGE, payload: { contactId: message.contactId }})
                dispatch({ type: MessagesTypes.UPDATE_MESSAGE_FRONT, payload: { contactId:  message.contactId }})
                socket.emit("updateMessageStatus", { contactId: message.contactId, to: State.contacts.currentContact?.name })
            }
        })
        socket.on("server onlines", (onlines) => {
            dispatch({ type: ContactsTypes.SET_ONLINES, payload: onlines})
        })
        socket.on("server updateMessageStatus", (data) => {
            dispatch({ type: MessagesTypes.UPDATE_MESSAGE_FRONT, payload: { contactId: data.contactId, currentContactId: State.contacts.currentContact?.contactId }})
        })

        return () => {
            socket.off("server message")
            socket.off("server onlines")
            socket.off("server updateMessageStatus")
        }
    }, [socket, State.contacts.currentContact, State.messages.data])

    //console.log(State)

    return(
        <>
            {
                user ?
                    <div id={style.content}>
                        <div id={style.left}>
                            <Header/>
                            <Contacts/>
                        </div>
                        <AddContact/>
                        <main id={style.main}>
                            {
                                State.contacts.currentContact ?
                                    <Chat/>
                                :
                                null
                            }
                        </main>
                    </div>
                :
                    null
            }
        </>
    )
}

export default Home
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../store"
import Message from "../message/Message"
import style from "./chat.module.css"
import ProfileImage from "../../../images/profile.png"
import socket from "../socket/socket"
import { MessagesTypes } from "../../store/ducks/messages/types"
import { AuthContex } from "../../context/userContext"

function Chat(){
    const [message, setMessage] = useState("")
    const { user } = useContext(AuthContex)
    const dispatch = useDispatch()
    const State = useSelector(state => state) as ApplicationState

    useEffect(() => {
        document.getElementById(style.messages)?.scrollTo(0, document.getElementById(style.messages)!.scrollHeight)
    }, [State.messages.chat])

    function sendMessage(){
        if (message != "" ){
            const date = new Date()
            dispatch({ type: MessagesTypes.MESSAGE_REQUEST, payload: { message: { message, fromId: user?.id, contactId: State.contacts.currentContact?.contactId, already: true, createdAt: date.toString() } }})
            socket.emit("message", { message, to: State.contacts.currentContact?.name, fromId: user?.id, contactId: State.contacts.currentContact?.contactId, createdAt: date.toString() })
            dispatch({ type: MessagesTypes.ADD_REQUEST, payload: { message, contactId: State.contacts.currentContact?.contactId } })
            setMessage("")
        }
    }

    return(
        <div id={style.chat}>
            <div id={style.contactHeader}>
                <div id={style.contactLocal}>
                    <div id={style.div}>
                        <p>{State.contacts.currentContact?.name}</p>
                        {
                            State.contacts.currentContact && State.contacts.onlines ?
                                <p>{State.contacts.currentContact.name in State.contacts.onlines ? "online" : ""}</p>
                            :
                            null
                        }
                    </div>
                    <div id={style.contactImage}>
                        <img src={State.contacts.currentContact?.profile_image} onError={(e) => e.currentTarget.src = ProfileImage}/>
                    </div>
                </div>
            </div>
            <div id={style.messages}>
                {
                    State.messages.chat.map(message => <Message message={message}></Message>)
                }
            </div>
            <div id={style.sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={(key) => {
                    if (key.key == "Enter"){
                        sendMessage()
                    }
                }}/>
                <button onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default Chat
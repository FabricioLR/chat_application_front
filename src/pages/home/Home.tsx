import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/Header"
import { AuthContex } from "../../context/userContext"
import { useDispatch, useSelector } from "react-redux"
import { ContactsTypes } from "../../store/ducks/contacts/types"
import { ApplicationState } from "../../store"
import Contact from "../../components/contact/Contact"
import style from "./home.module.css"
import { AiOutlineUserAdd } from "react-icons/ai"
import AddContact from "../../components/addContact/AddContact"
import styleMenu from "../../components/addContact/addContact.module.css"
import { MessagesTypes } from "../../store/ducks/messages/types"
import Message from "../../components/message/Message"
import ProfileImage from "../../../images/profile.png"
import socket from "../../components/socket/socket"

type ContactData = {
    contactId: string
    name: string
    profile_image: string
    online: boolean
}

function Home(){
    const { user, VerifyToken } = useContext(AuthContex)
    const [currentContact, setCurrentContact] = useState<Partial<ContactData>>({})
    const [message, setMessage] = useState("")
    const [onlines, setOnlines] = useState<Object>({})
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
        socket.on("contact message", (message) => {
            dispatch({ type: MessagesTypes.MESSAGE_REQUEST, payload: { message, already: false }})
        })
        socket.on("onlines", (contacts) => {
            setOnlines(contacts)
        })
    }, [socket])

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentContact.name){
                if (currentContact.name in onlines){
                    setCurrentContact({...currentContact, online: true})
                } else {
                    setCurrentContact({...currentContact, online: false})
                }
            }
        }, 3000)

        return () => {
            clearInterval(interval)
        }
    }, [onlines, currentContact])
    
    function open(){
        document.getElementById(styleMenu.local)?.classList.toggle(styleMenu.activeMenu)
    }

    function sendMessage(){
        if (message != "" && currentContact?.contactId != ""){
            document.getElementById(style.messages)?.scrollTo(0, document.getElementById(style.messages)!.scrollHeight + 1000)
            dispatch({ type: MessagesTypes.MESSAGE_REQUEST, payload: { message: { message, fromId: user?.id, contactId: currentContact?.contactId, already: true } }})
            socket.emit("message", { message, to: currentContact?.name, fromId: user?.id, contactId: currentContact?.contactId })
            dispatch({ type: MessagesTypes.ADD_REQUEST, payload: { message, contactId: currentContact?.contactId } })
            setMessage("")
        }
    }

    //console.log(currentContact)

    return(
        <>
            {
                user ?
                    <>
                    <div id={style.content}>
                        <div id={style.left}>
                            <Header/>
                            <div id={style.contacts}>
                                <div id={style.searchAdd}>
                                    <input type="text" placeholder="Contact Name" onChange={(e) => { 
                                        dispatch({ type: ContactsTypes.FILTER_REQUEST, payload: { name: e.target.value, userId: user.id }})
                                    }}/>
                                    <AiOutlineUserAdd onClick={open}/>
                                </div>
                                {
                                    State.contacts.search[0] ?
                                        State.contacts.search.map(contact => <Contact contact={contact} setCurrentContact={setCurrentContact}/>)
                                    :
                                        <></>
                                }
                            </div>
                        </div>
                        <AddContact/>
                        <main id={style.main}>
                            <div id={style.chat}>
                                {
                                    currentContact.contactId ?
                                        <>
                                            <div id={style.contactHeader}>
                                                <div id={style.contactLocal}>
                                                    <div id={style.div}>
                                                        <p>{currentContact.name}</p>
                                                        <p>{currentContact.online ? "online" : ""}</p>
                                                    </div>
                                                    
                                                    <div id={style.contactImage}>
                                                        <img src={currentContact.profile_image} onError={(e) => e.currentTarget.src = ProfileImage}/>
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
                                        </>
                                    :
                                        <></>
                                }
                            </div>
                        </main>
                    </div>
                    </>
                :
                    <></>
            }
        </>
    )
}

export default Home
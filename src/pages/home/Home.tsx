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
import { io } from "socket.io-client"

const socket = io("http://localhost:4000")

type ContactData = {
    contactId: string
    name: string
}

function Home(){
    const { user, VerifyToken } = useContext(AuthContex)
    const [currentContact, setCurrentContact] = useState<ContactData>()
    const [message, setMessage] = useState("")
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
            dispatch({ type: MessagesTypes.MESSAGE_REQUEST, payload: { message }})
        })
    }, [socket])

    useEffect(() => {
        window.onunload = () => {
            socket.disconnect()
        }
    })
    

    function open(){
        document.getElementById(styleMenu.local)?.classList.toggle(styleMenu.activeMenu)
    }

    function sendMessage(){
        if (message != "" && currentContact?.contactId != ""){
            dispatch({ type: MessagesTypes.MESSAGE_REQUEST, payload: { message: { message, fromId: user?.id, contactId: currentContact?.contactId } }})

            socket.emit("message", { message, to: currentContact?.name, fromId: user?.id, contactId: currentContact?.contactId })
            dispatch({ type: MessagesTypes.ADD_REQUEST, payload: { message, contactId: currentContact?.contactId } })
            setMessage("")
        }
    }

    console.log(State.messages)

    return(
        <>
            {
                user ? 
                    <>
                        <Header/>
                        <AddContact/>
                        <main id={style.main}>
                            <div id={style.contacts}>
                                <div id={style.searchAdd}>
                                    <input type="text" placeholder="Contact Name"/>
                                    <AiOutlineUserAdd onClick={open}/>
                                </div>
                                {
                                    State.contacts.data.map(contact => <Contact contact={contact} setCurrentContact={setCurrentContact}/>)
                                }
                            </div>
                            <div id={style.chat}>
                                {
                                    currentContact != undefined ?
                                        <>
                                            <div id={style.messages}>
                                                {
                                                    State.messages.chat.map(message => <Message message={message}></Message>)
                                                }
                                            </div>
                                            <div id={style.sendMessage}>
                                                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                                                <button onClick={sendMessage}>send</button>
                                            </div>
                                        </>
                                    :
                                        <></>
                                }
                            </div>
                        </main>
                    </>
                :
                    <></>
            }
        </>
    )
}

export default Home
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

function Home(){
    const { user, VerifyToken } = useContext(AuthContex)
    const [currentContactId, setCurrentContactId] = useState("")
    const [message, setMessage] = useState("")
    const State = useSelector(state => state) as ApplicationState
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const status = await VerifyToken()
            if (status != 200){
                navigate("/signin")
            } else {
                dispatch({ type: ContactsTypes.LOAD_REQUEST })
                dispatch({ type: MessagesTypes.LOAD_REQUEST})
            }
        })()
    }, [])

    function addContact(){
        document.getElementById(styleMenu.local)?.classList.toggle(styleMenu.activeMenu)
    }

    function sendMessage(){
        if (message != "" && currentContactId != ""){
            dispatch({ type: MessagesTypes.ADD_REQUEST, payload: { message, contactId: currentContactId } })
        }
    }

    console.log(State)

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
                                    <AiOutlineUserAdd onClick={addContact}/>
                                </div>
                                {
                                    State.contacts.data.map(contact => <Contact contact={contact} setCurrentContactId={setCurrentContactId}/>)
                                }
                            </div>
                            <div id={style.chat}>
                                {
                                    currentContactId != "" ?
                                        <>
                                            <div id={style.messages}>
                                                {
                                                    State.messages.chat.map(message => <div>{message.message}</div>)
                                                }
                                            </div>
                                            <div id={style.sendMessage}>
                                                <input type="text" onChange={(e) => setMessage(e.target.value)}/>
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
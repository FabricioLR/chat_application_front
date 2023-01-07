import { useContext } from "react"
import { AiOutlineUserAdd } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { AuthContex } from "../../context/userContext"
import { ApplicationState } from "../../store"
import { ContactsTypes } from "../../store/ducks/contacts/types"
import Contact from "../contact/Contact"
import style from "./contacts.module.css"
import styleMenu from "../addContact/addContact.module.css"

function Contacts(){
    const { user } = useContext(AuthContex)
    const dispatch = useDispatch()
    const State = useSelector(state => state) as ApplicationState

    return(
        <div id={style.contacts}>
            <div id={style.searchAdd}>
                <input type="text" placeholder="Contact Name" onChange={(e) => { 
                    dispatch({ type: ContactsTypes.FILTER_REQUEST, payload: { name: e.target.value, userId: user?.id }})
                }}/>
                <AiOutlineUserAdd onClick={() => document.getElementById(styleMenu.local)?.classList.toggle(styleMenu.activeMenu)}/>
            </div>
            {
                State.contacts.search[0] ?
                    State.contacts.search.map(contact => <Contact contact={contact}/>)
                :
                    null
            }
        </div>
    )
}

export default Contacts
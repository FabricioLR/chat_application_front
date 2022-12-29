import { Contact as contact } from "../../store/ducks/contacts/types"
import ProfileImage from "../../../images/profile.png"
import style from "./contact.module.css"
import { useContext } from "react"
import { AuthContex } from "../../context/userContext"
import { useDispatch } from "react-redux"
import { MessagesTypes } from "../../store/ducks/messages/types"

type ContactProps = {
    contact: contact
    setCurrentContactId: Function
}

function Contact(props: ContactProps){
    const { user } = useContext(AuthContex)
    const dispatch = useDispatch()

    return(
        <div className={style.contact} onClick={() => {
                props.setCurrentContactId(props.contact.id)
                dispatch({ type: MessagesTypes.FILTER_REQUEST, payload: { contactId: props.contact.id }})
            }}>
            <div className={style.contactImage}>
                <img src={
                    user?.id == props.contact.user1.id ?
                        props.contact.user2.profile_image == "" ? ProfileImage : props.contact.user2.profile_image
                    :
                        props.contact.user1.profile_image == "" ? ProfileImage : props.contact.user1.profile_image
                } alt="" />
            </div>
            <div className={style.contactName}>
                <p>{user?.id == props.contact.user1.id ? props.contact.user2.name : props.contact.user1.name}</p>
            </div>
        </div>
    )
}

export default Contact
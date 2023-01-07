import { Contact as contact, ContactsTypes } from "../../store/ducks/contacts/types"
import ProfileImage from "../../../images/profile.png"
import style from "./contact.module.css"
import { useContext } from "react"
import { AuthContex } from "../../context/userContext"
import { useDispatch, useSelector } from "react-redux"
import { MessagesTypes } from "../../store/ducks/messages/types"
import { ApplicationState } from "../../store"
import socket from "../socket/socket"

type ContactProps = {
    contact: contact
}

function Contact(props: ContactProps){
    const { user } = useContext(AuthContex)
    const dispatch = useDispatch()
    const State = useSelector(state => state) as ApplicationState

    return(
        <div className={style.contact} onClick={() => {
                dispatch({ type: ContactsTypes.SET_CURRENTCONTACT, payload: {
                    contactId: props.contact.id,
                    name: user?.id == props.contact.user1.id ? props.contact.user2.name : props.contact.user1.name,
                    profile_image: user?.id == props.contact.user1.id ? props.contact.user2.profile_image : props.contact.user1.profile_image,
                    online: false
                }})
                dispatch({ type: MessagesTypes.FILTER_REQUEST, payload: { contactId: props.contact.id }})
                dispatch({ type: MessagesTypes.UPDATE_MESSAGE, payload: { contactId: props.contact.id }})
                dispatch({ type: MessagesTypes.UPDATE_MESSAGE_FRONT, payload: { contactId: props.contact.id }})
                socket.emit("updateMessageStatus", { contactId: props.contact.id, to: user?.id == props.contact.user1.id ? props.contact.user2.name : props.contact.user1.name })
            }}>
            <div className={style.contactImage}>
                <img src={
                    user?.id == props.contact.user1.id ?
                        props.contact.user2.profile_image
                    :
                        props.contact.user1.profile_image
                } onError={(e) => e.currentTarget.src = ProfileImage} />
            </div>
            <div className={style.contactName}>
                <p>{user?.id == props.contact.user1.id ? props.contact.user2.name : props.contact.user1.name}</p>
            </div>
                {
                    State.messages.data.filter(message => message.contactId == props.contact.id && message.viewed == false && message.fromId != user?.id).length > 0 ?
                        <div className={style.messagesNotViewed}>
                            <p>{State.messages.data.filter(message => message.contactId == props.contact.id && message.viewed == false && message.fromId != user?.id).length}</p>
                        </div>
                    :
                    null
                }
        </div>
    )
}

export default Contact
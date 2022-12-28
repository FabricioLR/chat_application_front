import { Contact as contact } from "../../store/ducks/contacts/types"
import ProfileImage from "../../../images/profile.png"
import style from "./contact.module.css"

type ContactProps = {
    contact: contact
}

function Contact(props: ContactProps){
    return(
        <div className={style.contact}>
            <div className={style.contactImage}>
                <img src={props.contact.contact.profile_image == "" ? ProfileImage : props.contact.contact.profile_image} alt="" />
            </div>
            <div className={style.contactName}>
                <p>{props.contact.contact.name}</p>
            </div>
        </div>
    )
}

export default Contact
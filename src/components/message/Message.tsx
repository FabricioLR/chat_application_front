import { useContext } from "react"
import { AuthContex } from "../../context/userContext"
import { Message as message } from "../../store/ducks/messages/types"
import style from "./message.module.css"
import { MdDone, MdDoneAll } from "react-icons/md"

type MessageProps = {
    message: Pick<message, "fromId"|"message"|"viewed">
}

function Message(props: MessageProps) {
    const { user } = useContext(AuthContex)

    return (
        <div className={style.message} id={props.message.fromId == user?.id ? style.owner : style.other}>
            <p>{props.message.message}</p>
            {
                props.message.fromId == user?.id ?
                    props.message.viewed ?
                        <MdDoneAll className={style.viewed}/>
                    :
                        <MdDone className={style.viewed}/>
                :
                    null
            }
        </div>
    )
}

export default Message

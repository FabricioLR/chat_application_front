import { useContext, useEffect, useState } from "react"
import { AuthContex } from "../../context/userContext"
import { Message as message } from "../../store/ducks/messages/types"
import style from "./message.module.css"

type MessageProps = {
    message: Omit<message, "id"|"toId"|"contactId"|"to"|"from">
}

function Message(props: MessageProps) {
    const { user } = useContext(AuthContex)

    return (
        <div className={style.message} id={props.message.fromId == user?.id ? style.owner : style.other}>
            <p>{props.message.message}</p>
        </div>
    )
}

export default Message

import style from "./addContact.module.css"
import { AiOutlineClose} from "react-icons/ai"
import { useDispatch } from "react-redux"
import { ContactsTypes } from "../../store/ducks/contacts/types"
import { useState } from "react"


function AddContact(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [load, setLoad] = useState("Add")

    function close(){
        document.getElementById(style.local)?.classList.toggle(style.activeMenu)
    }

    async function add(){
        if (name !== ""){
            setLoad("Adding...")
            dispatch({ type: ContactsTypes.ADD_REQUEST, payload: { name, setLoad }})
            setName("")
        }
    }

    return(
        <div id={style.local}>
            <form onSubmit={(e) => {e.preventDefault(); add()}} id={style.form}>
                <div>
                    <AiOutlineClose onClick={close}/>
                </div>
                <div>
                    <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} onKeyUp={(key) => {
                        if (key.key === "Enter") {
                            add()
                        }
                    }}/>
                </div>
                <input type="submit" value={load} disabled={load == "Add" ? false : true}/>
            </form>
        </div>
    )
}

export default AddContact
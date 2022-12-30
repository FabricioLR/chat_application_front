import { MdEmail, MdLock } from "react-icons/md"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useContext, useState } from "react"
import { FaUser } from "react-icons/fa"
import { AuthContex } from "../../../context/userContext"
import { useNavigate } from "react-router-dom"
import style from "./signUp.module.css"

function SignUp(){
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [load, setLoad] = useState("Sign Up")
    const { Register } = useContext(AuthContex)
    const navigate = useNavigate()

    async function register(){
        setLoad("Signing Up...")
        await Register({
            email,
            password,
            name,
            navigate
        })
        setLoad("Sign Up")
    }

    return(
        <div id={style.local}>
            <form id={style.form} onSubmit={(e) => {e.preventDefault(); register()}} onKeyUp={(key) => {
                if (key.key === "Enter") {
                    register()
                }
            }}>
                <p>Welcome</p>
                <div id={style.name}>
                    <div>
                        <FaUser></FaUser>
                    </div>
                    <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
                </div>
                <div id={style.email}>
                    <div>
                        <MdEmail></MdEmail>
                    </div>
                    <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div id={style.password}>
                    <div>
                        <MdLock></MdLock>
                    </div>
                    <input type={show ? "text" : "password"} placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                    {
                        show?
                            <div>
                                <AiFillEyeInvisible onClick={() => setShow(false)}></AiFillEyeInvisible>
                            </div>
                        :
                            <div>
                                <AiFillEye onClick={() => setShow(true)}></AiFillEye>
                            </div>
                    }
                </div>
                <input id={style.button} type="submit" value={load} disabled={load == "Signing Up..." ? true : false}/>
            </form>
        </div>
    )
}

export default SignUp
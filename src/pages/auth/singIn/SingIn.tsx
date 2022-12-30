import { MdEmail, MdLock } from "react-icons/md"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContex } from "../../../context/userContext"
import style from "./signIn.module.css"

function SignIn(){
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [load, setLoad] = useState("Sign In")
    const { Authenticate } = useContext(AuthContex)
    const navigate = useNavigate()

    async function authenticate(){
        setLoad("Signing In...")
        await Authenticate({
            email,
            password,
            navigate
        })
        setLoad("Sign In")
    }

    return(
        <div id={style.local}>
            <form id={style.form} onSubmit={(e) => {e.preventDefault(); authenticate()}} onKeyUp={(key) => {
                if (key.key === "Enter") {
                    authenticate()
                }
            }}>
                <p>Welcome</p>
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
                <input type="submit" value={load} id={style.button} disabled={load == "Signing In..." ? true : false}/>
                <p>Do not have an account? <Link to="/signup">Sing Up</Link></p>
            </form>
        </div>
    )
}

export default SignIn
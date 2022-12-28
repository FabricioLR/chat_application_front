import { MdEmail, MdLock } from "react-icons/md"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContex } from "../../../context/userContext"

function SignIn(){
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { Authenticate } = useContext(AuthContex)
    const navigate = useNavigate()

    async function authenticate(){
        if (email !== "" && password !== ""){
            await Authenticate({
                email,
                password,
                navigate
            })
        }
    }

    return(
        <div>
            <div>
                <form  onSubmit={(e) => {e.preventDefault(); authenticate()}} onKeyUp={(key) => {
                    if (key.key === "Enter") {
                        authenticate()
                    }
                }}>
                    <p>Welcome</p>
                    <div>
                        <MdEmail></MdEmail>
                        <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <MdLock></MdLock>
                        <input type={show ? "text" : "password"} placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                        {
                            show?
                                <AiFillEyeInvisible onClick={() => setShow(false)}></AiFillEyeInvisible>
                            :
                                <AiFillEye onClick={() => setShow(true)}></AiFillEye>
                        }
                    </div>
                    <input type="submit" value="Sign In"/>
                    <p>Do not have an account? <Link to="/signup">Sing Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn
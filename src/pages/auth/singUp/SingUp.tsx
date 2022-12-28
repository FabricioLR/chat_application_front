import { MdEmail, MdLock } from "react-icons/md"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useContext, useState } from "react"
import { FaUser } from "react-icons/fa"
import { AuthContex } from "../../../context/userContext"
import { useNavigate } from "react-router-dom"

function SignUp(){
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const { Register } = useContext(AuthContex)
    const navigate = useNavigate()

    async function register(){
        if (email !== "" && password !== "" && name !== ""){
            await Register({
                email,
                password,
                name,
                navigate
            })
        }
    }

    return(
        <div>
            <div>
                <form onSubmit={(e) => {e.preventDefault(); register()}} onKeyUp={(key) => {
                    if (key.key === "Enter") {
                        register()
                    }
                }}>
                    <p>Welcome</p>
                    <div>
                        <FaUser></FaUser>
                        <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
                    </div>
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
                    <input type="submit" value="Sign Up"/>
                </form>
            </div>
        </div>
    )
}

export default SignUp
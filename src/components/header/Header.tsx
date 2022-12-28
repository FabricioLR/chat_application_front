import { useContext } from "react"
import { AuthContex } from "../../context/userContext"
import ProfileImage from "../../../images/profile.png"
import style from "./header.module.css"
import { useNavigate } from "react-router-dom"

function Header(){
    const { user } = useContext(AuthContex)
    const navigate = useNavigate()

    return(
        <header id={style.localheader}>
            <div id={style.header}>
                <div id={style.logo}>
                    <img src="" alt="" />
                </div>
                <div id={style.profile} onClick={() => navigate("/profile")}>
                    <img src={ user?.profile_image == "" ? ProfileImage : user?.profile_image} alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header
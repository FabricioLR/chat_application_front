import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContex } from "../../context/userContext"
import ProfileImage from "../../../images/profile.png"
import style from "./profile.module.css"

function Profile(){
    const { user, SignOut, ChangeProfileImage } = useContext(AuthContex)
    const [imageLoad, setImageLoad] = useState("Upload")
    const [file, setFile] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        /* if (!user){
            navigate("/signin")
        } */
    }, [])

    async function changeProfileImage() {
        setImageLoad("Uploading...")
        await ChangeProfileImage({
            file
        })
        setImageLoad("Upload")
    }

    return(
        <div id={style.local}>
            <div id={style.owner}>
                <div id={style.ownerImage}>
                    <img src={user?.profile_image} onError={(e) => e.currentTarget.src = ProfileImage} />
                </div>
                <div id={style.ownerName}>
                    <p>{user?.name}</p>
                </div>
            </div>
            <div id={style.edit}>
                <form id={style.form} onSubmit={(e) => {e.preventDefault(); changeProfileImage()}}>
                    <div>
                        <p>Change Profile Image</p>
                        <input type="file" required onChange={(e: any) => setFile(e.target.files[0])}/>
                    </div>
                    <input type="submit" value={imageLoad} disabled={imageLoad == "Uploading..." ? true : false}/>
                </form>
                <form id={style.form2} onSubmit={(e) => {e.preventDefault();}}>
                    <div>
                        <p>Change Name</p>
                        <input type="text" required />
                    </div>
                    <div>
                        <p>Change Password</p>
                        <input type="text" required />
                    </div>
                    <input type="submit" value="Save" />
                </form>
            </div>
            <div id={style.exit}>
                <button onClick={() => SignOut(navigate)}>Sign Out</button>
            </div>
        </div>
    )
}

export default Profile
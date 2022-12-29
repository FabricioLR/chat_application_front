import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContex } from "../../context/userContext"
import ProfileImage from "../../../images/profile.png"

function Profile(){
    const { user, SignOut } = useContext(AuthContex)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user){
            navigate("/signin")
        }
    }, [])

    return(
        <div>
            <div>
                <div>
                    <img src={user?.profile_image} onError={(e) => e.currentTarget.src = ProfileImage} />
                </div>
                <div>
                    <p>{user?.name}</p>
                </div>
            </div>
            <div>
                <form onSubmit={(e) => {e.preventDefault();}}>
                    <p>Change Profile Image</p>
                    <input type="file"/>
                    <p>Change Name</p>
                    <input type="text" />
                    <p>Change Password</p>
                    <input type="password" />
                    <input type="submit" value="Save" />
                </form>
            </div>
            <div>
                <button onClick={() => SignOut(navigate)}>Sign Out</button>
            </div>
        </div>
    )
}

export default Profile
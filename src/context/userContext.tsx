import { createContext, ReactNode, useState } from "react"
import api from "./api"

type User = {
    name: string
    profile_image: string
    id: string
}

type AuthContextData = {
    user: User | null
    Register: Function
    Authenticate: Function
    SignOut: Function
    ChangeProfileImage: Function
    VerifyToken: Function
}

type AuthProviderProps = {
    children: ReactNode
}

type RegisterData = {
    email: string
    name: string
    password: string
    navigate: Function
}

type AuthenticateData = {
    email: string
    password: string
    navigate: Function
}

type AuthResponseData = {
    token: string
    user: {
        name: string
        profile_image: string
        id: string
    }
}

type ChangeProfileImageData = {
    file: File
}

export const AuthContex = createContext({} as AuthContextData)

function AuthProvider(props: AuthProviderProps){
    const [ user, setUser ] = useState<User | null>(null)

    async function Register(data: RegisterData){
        try {
            const response = await api.post<AuthResponseData>("Register", data)

            if (response.status == 200){
                setUser({
                    name: response.data.user.name,
                    profile_image: response.data.user.profile_image,
                    id: response.data.user.id,
                })
                sessionStorage.setItem("token", response.data.token)
                data.navigate("/")
            }
        } catch (error: any) {
            alert(error.response.data.error)
        }
    }

    async function Authenticate(data: AuthenticateData){
        try {
            const response = await api.post<AuthResponseData>("Authenticate", data)

            if (response.status == 200){
                setUser({
                    name: response.data.user.name,
                    profile_image: response.data.user.profile_image,
                    id: response.data.user.id,
                })
                sessionStorage.setItem("token", response.data.token)
                data.navigate("/")
            }
        } catch (error: any) {
            console.log(error.response.data)
            alert(error.response.data.error)
        }
    }

    function SignOut(navigate: Function){
        setUser(null)
        sessionStorage.removeItem("token")
        navigate("/signin")
    }

    async function VerifyToken(){
        try {
            const response = await api.get<Omit<AuthResponseData, "token">>("AuthenticateByToken", {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            })

            if(response.status == 200){
                setUser({
                    name: response.data.user.name,
                    profile_image: response.data.user.profile_image,
                    id: response.data.user.id,
                })
            }

            return response.status
        } catch(error) {
            console.log(error)
        }
    }

    async function ChangeProfileImage(data: ChangeProfileImageData){
        const formData = new FormData()
        formData.append("file", data.file)
        
        try {
            const response = await api.post<Omit<AuthResponseData, "token">>("ChangeUserImage", formData, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            })
            if (response.status == 200){
                setUser({
                    name: response.data.user.name,
                    profile_image: response.data.user.profile_image,
                    id: response.data.user.id,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContex.Provider value={{ user, Register, Authenticate, SignOut, ChangeProfileImage, VerifyToken }}>
            {props.children}
        </AuthContex.Provider>
    )
}

export default AuthProvider
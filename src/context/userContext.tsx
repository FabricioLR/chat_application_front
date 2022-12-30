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

type Props = {
    email: string
    name: string
    password: string
    navigate: Function
    token: string
    user: User
    file: File
}

export const AuthContex = createContext({} as AuthContextData)

function AuthProvider(props: AuthProviderProps){
    const [ user, setUser ] = useState<User | null>(null)

    async function Register(data: Omit<Props, "token"|"user"|"file">){
        try {
            const response = await api.post<Pick<Props, "token"|"user">>("Register", data)

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
            console.log(error.response.data.error)
            alert(error.response.data.error)
        }
    }

    async function Authenticate(data: Omit<Props, "token"|"user"|"name"|"file">){
        try {
            const response = await api.post<Pick<Props, "token"|"user">>("Authenticate", data)

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

    function SignOut(navigate: Function){
        setUser(null)
        sessionStorage.removeItem("token")
        navigate("/signin")
    }

    async function VerifyToken(){
        try {
            const response = await api.get<Pick<Props, "user">>("AuthenticateByToken", {
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

            return { status: response.status, name: response.data.user.name}
        } catch(error) {
            return { status: 400 }
        }
    }

    async function ChangeProfileImage(data: Omit<Props, "token"|"user"|"name"|"navigate"|"email"|"password">){
        const formData = new FormData()
        formData.append("file", data.file)
        
        try {
            const response = await api.post<Pick<Props, "user">>("ChangeUserImage", formData, {
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
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    return (
        <AuthContex.Provider value={{ user, Register, Authenticate, SignOut, ChangeProfileImage, VerifyToken }}>
            {props.children}
        </AuthContex.Provider>
    )
}

export default AuthProvider
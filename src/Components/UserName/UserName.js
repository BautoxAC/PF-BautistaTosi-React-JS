import { useContext, } from "react"
import { ThemeContext } from "../../Components/context/Context"
import "./UserName.css"
const UserName = () => {
    const { logged,formValue } = useContext(ThemeContext)
    return (
        <>
            {logged === true && <picture className="ContainerImgUser">
                <img src="/assets/userNameImg.png" alt="Imagen de usuario" className="imgUser"/>
                <figcaption>{formValue.email}</figcaption>
            </picture>}
        </>
    )
}

export default UserName
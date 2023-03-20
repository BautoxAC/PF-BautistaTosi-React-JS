import { Link } from "react-router-dom"
import "./Login.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ThemeContext } from "../../Components/context/Context"
import { useContext } from "react";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const navigate = useNavigate()
    const { setFormValue, formValue, setLogged } = useContext(ThemeContext)
    function login(e) {
        e.preventDefault()
        const auth = getAuth()
        auth.languageCode = 'it'
        signInWithEmailAndPassword(auth, formValue.email, formValue.password)
            .then(() => {
                toast.success('Iniciaste sesión', {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "colored",
                })
                setTimeout(() => {
                    setLogged(true)
                    navigate("/cart")
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code
                Swal.fire({
                    title: "Error",
                    text: "Revisa que los datos esten ingresados correctamente",
                    icon: 'error',
                    footer: "Error: " + errorCode,
                }
                )
            })
    }
    function handleInput(e) {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }
    function handleMax(e) {
        if (e.target.value.length >= 100 || e.key === "<" || e.key === ">" || e.key === "{" || e.key === "}" || e.key === "=") {
            e.preventDefault()
        }
    }
    return (
        <div className="loginContainer">
            <form>
                <h1>Inicia Sesión</h1>
                <label>Email:</label>
                <input type="email" id="email" name="email" required onChange={handleInput} onKeyDown={handleMax} placeholder="ejemplo@gmail.com" />
                <label>Contraseña:</label>
                <input type="password" id="password" name="password" required onChange={handleInput} onKeyDown={handleMax} placeholder="Ingrese la contraseña" />
                <div className="buttonsContainer">
                    <Link to="/cart">
                        <Button variant="primary">Volver</Button>
                    </Link>
                    <Button variant="primary"><input type="submit" value="Inicia Sesión" onClick={login} className="loginContainerSubmit" />
                    </Button>
                </div>
                <ToastContainer />
            </form>

        </div>
    )
}

export default Login
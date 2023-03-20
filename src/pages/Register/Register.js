import { ThemeContext } from "../../Components/context/Context"
import { useContext } from "react";
import "./Register.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'
const Register = () => {
    const navigate = useNavigate()
    const { setFormValue, formValue } = useContext(ThemeContext)
    function createUser(e) {
        e.preventDefault()
        const auth = getAuth()
        auth.languageCode = 'it'
        createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
            .then(() => {
                Swal.fire(
                    'Te registraste',
                    'Ahora inicia sesión',
                    'info'
                )
                navigate("/cart")
            })
            .catch((error) => {
                const errorCode = error.code
                Swal.fire({
                    title: "Email invalido",
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
        if (e.target.value.length >= 50 || e.key === "<" || e.key === ">" || e.key === "{" || e.key === "}" || e.key === "=") {
            e.preventDefault()
        }
    }
    return (
        <div className="registerContainer">
            <h1>Registrate</h1>
            <form>
                <label>Email:</label>
                <input type="email" id="email" name="email" required onChange={handleInput} onKeyDown={handleMax} placeholder="ejemplo@gmail.com" />
                <label>Telefono:</label>
                <input type="text" id="phone" name="phone" required onChange={handleInput} onKeyDown={handleMax} placeholder="Ingrese el telefono(opcional)" />
                <label>Contraseña:</label>
                <input type="password" id="password" name="password" required onChange={handleInput} onKeyDown={handleMax} placeholder="Ingrese la contraseña" />
                <div className="buttonsContainer">
                    <Link to="/cart">
                        <Button variant="primary">Volver</Button>
                    </Link>
                    <Button variant="primary"><input type="submit" value="Registrar" onClick={createUser} className="registerContainerSubmit" /></Button>
                </div>
            </form>
        </div>
    )
}

export default Register
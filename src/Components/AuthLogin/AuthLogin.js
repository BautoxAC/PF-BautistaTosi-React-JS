import "./AuthLogin.css"
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const AuthLogin = () => {
    return (
        <div className="AuthLoginContainer">
            <h1>¿Quieres ver tu carrito?</h1>
            <div>
                <Link to="/cart/register">
                    <Button variant="primary">Registrate</Button>
                </Link>
                <Link to="/cart/login">
                    <Button variant="primary">Inicia sesión</Button>
                </Link>
            </div>

        </div>
    )
}

export default AuthLogin
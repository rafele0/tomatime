import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import "../index.css";
import titolo from "../assets/sfondoTomate.jpg";
import text from "../assets/Raggruppa 22@2x.png";

const LoginContainer = ({ setIsAuthenticated }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                setIsAuthenticated(true);
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Errore di connessione al server");
        }
    };

    return (
        <div className="login-body">
            <div className="login-box">
                <Login onLogin={handleLogin} error={error} />
            </div>
            <img src={text} alt="" className="image-login"/>
        </div>
    );
};

export default LoginContainer;
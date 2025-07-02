import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

export default function Register() {
      const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = () => {
    // Here you would normally call your API to register
    // For simplicity, we'll just simulate registration
    const userData = { username: "demo", email: "demo@example.com" };
    login(userData); // Log the user in
    navigate("/login"); // Redirect to login after registration
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
         <h3 className="loginLogo">DanielSocial</h3>
         <span className="loginDesc">connect with friends and the world around DanielSocial.
         </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="username" className="loginInput"/>
            <input placeholder="Email" className="loginInput"/>
            <input placeholder="name" className="loginInput"/>
            <input placeholder="password" className="loginInput"/>
            <span className="loginForget"> forgot password ?
            </span>
            <button className="loginButton" onClick={handleRegister}>
                Sign up</button>
            <button 
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >Log into your account</button>
          </div>
        </div>
      </div>
    </div>
  )
}
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

export default function Login() {
      const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    // Here you would normally call your API to login
    // For simplicity, we'll just simulate login
    const userData = { username: "demo", email: "demo@example.com" };
    login(userData); // Log the user in
    navigate("/"); // Redirect to home after login
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
            <input placeholder="Email" className="loginInput"/>
            <input placeholder="password" className="loginInput"/>
            <button className="loginButton" 
            onClick={handleLogin}>
                Login
                </button>
            <button className="loginRegisterButton" 
            onClick={() => navigate("/register")}
            >create an account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

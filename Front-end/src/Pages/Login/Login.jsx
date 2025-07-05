import "./Login.css"
import { useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const handleChange = (e) => {
  //  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 // };
 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
    alert("All fields are required.");
    return;
  }
    const success = await login(email, password);
    if (success) {
      navigate("/home");
    }
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
           <form className="loginBox" onSubmit={handleLogin}>
            <input placeholder="Email"
              className="loginInput" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
             <input placeholder="Password" type="password"
              className="loginInput" value={password}
              onChange ={(e) => setPassword(e.target.value)}/>
            <button className="loginButton" 
            type="submit">Login
            </button>
            <button className="loginRegisterButton" 
            onClick={() => navigate("/register")}
            >create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

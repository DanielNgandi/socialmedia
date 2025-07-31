import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState} from "react";
import { AuthContext } from "../../Context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //const handleChange = (e) => {
    //setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //};

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !name || !password) {
    alert("All fields are required.");
    return;
  }
    const success = await register(username, email, name, password);
    if (success) {
      navigate("/login");
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
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              placeholder="Username"
              className="loginInput"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              className="loginInput"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Name"
              className="loginInput"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="loginForget" onClick={() => navigate("/reset-password")} style={{ cursor: 'pointer', color: 'blue' }}> forgot password?</span>
            <button className="loginButton"  type="submit">
                Sign up</button>
            <button 
              className="loginRegisterButton"
              onClick={() => navigate("/login")}
            >Log into your account</button>
          </form>
        </div>
      </div>
    </div>
  )
}
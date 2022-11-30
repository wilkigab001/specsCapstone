import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();

  let authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitHandler called");

    const user = {
      username,
      password,
    };

    if (register) {
      axios
        //was pointing to https whenever using local host it has to be http
        .post("http://localhost:4004/register", user)
        .then((res) => {
          console.log(res.data);
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
          console.log(authCtx);
          navigate("/");
        })
        .catch((err) => {
          setPassword("");
          setUsername("");
        });
    } else if (!register) {
      axios
        .post("http://localhost:4004/login", user)
        .then((res) => {
          console.log(res.data);
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch((err) => {
          setPassword("");
          setUsername("");
        });
    }
    navigate('/')
  };

  return (
    <div className={styles.letsFlex}>
      <main className={styles.loginDiv}>
        {register? (<h1>Welcome!</h1>): (<h1>Welcome Back!</h1>)}
        <form className="form auth-form" onSubmit={submitHandler}>
          <div className={styles.formyflex}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.formButton}>
            <button
              className={styles.button}
              onClick={() => console.log(username, password)}
            >
              {register ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
        <button
          className={styles.buttonRegister}
          onClick={() => setRegister(!register)}
        >
          Need to {register ? "Login" : "Sign Up"}?
        </button>
      </main>
    </div>
  );
};

export default Login;

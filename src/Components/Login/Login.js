import { useRef, useState } from "react";
import classes from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const userLoginDetails = {
      email,
      password,
    };

    axios
      .post("http://localhost:5000/login", userLoginDetails)
      .then((res) => {
        setMessage('')
        localStorage.setItem('token', res.data.token)
        navigate('/home')
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };
  return (
    <div className={classes.mainDiv}>
      <h1>Login Page</h1>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.inputDiv}>
          <label>Email: </label>
          <input type="email" ref={emailInputRef} required />
        </div>
        <div className={classes.inputDiv}>
          <label>Password: </label>
          <input type="password" ref={passwordInputRef} required />
        </div>
        <button type="submit">LOGIN</button>
      </form>
      <p>
        New User! <a href="/">Signup here</a>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

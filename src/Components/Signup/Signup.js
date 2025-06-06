import { useRef, useState } from "react";
import axios from "axios";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [existingUser, setExistingUser] = useState(false);
  const navigate = useNavigate()

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const username = usernameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const userSignupDetails = {
      username,
      email,
      password,
    };

    axios
      .post("http://localhost:5000/signup", userSignupDetails)
      .then((res) => {
        console.log(res.data);
        if (res.data.userData === "User already Exist") {
          setExistingUser(true);
        } else {
          setExistingUser(false);
          navigate('/login')
        }
        usernameInputRef.current.value = "";
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.mainDiv}>
      <h1>Signup Page</h1>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.inputDiv}>
          <label>Username: </label>
          <input type="text" ref={usernameInputRef} required />
        </div>
        <div className={classes.inputDiv}>
          <label>Email: </label>
          <input type="email" ref={emailInputRef} required />
        </div>
        <div className={classes.inputDiv}>
          <label>Password: </label>
          <input type="password" ref={passwordInputRef} required />
        </div>
        <button type="submit">SIGNUP</button>
      </form>
      <p>
        Existing User! <a href="/login">Login here</a>
      </p>
      {existingUser && <p>Email already Exist! please Login...</p>}
    </div>
  );
};

export default Signup;

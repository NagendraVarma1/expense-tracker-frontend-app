import { useRef } from "react";
import classes from './Login.module.css'

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    const userLoginDetails = {
      email,
      password,
    };

    console.log(userLoginDetails);
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
    </div>
  );
};

export default Login;

import { useRef } from "react"
import axios from "axios"

const Login = () => {

    const usernameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const username = usernameInputRef.current.value;
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const userloginDetails = {
            username,
            email,
            password
        }
        console.log(userloginDetails)

        axios.post('http://localhost:5000/login', userloginDetails)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            <h1>Login Page</h1>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <label>Username: </label>
                    <input type="text" ref={usernameInputRef} required/>
                </div>
                <div>
                    <label>Email: </label>
                    <input type="email" ref={emailInputRef} required/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" ref={passwordInputRef} required/>
                </div>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}

export default Login
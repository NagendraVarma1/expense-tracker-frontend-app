import { useRef, useState } from "react"
import axios from "axios"

const Signup = () => {

    const usernameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [existingUser, setExistingUser] = useState(false)

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const username = usernameInputRef.current.value;
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        const userSignupDetails = {
            username,
            email,
            password
        }

        axios.post('http://localhost:5000/signup', userSignupDetails)
        .then((res) => {
            console.log(res.data)
            if(res.data.userData === "User already Exist"){
                setExistingUser(true)
            }
            else{
                setExistingUser(false)
            }
            usernameInputRef.current.value = '';
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            <h1>Signup Page</h1>
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
            {existingUser && <p>Email already Exist! please Login...</p>}
        </div>
    )
}

export default Signup
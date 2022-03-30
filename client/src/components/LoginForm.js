import React, { useState } from "react"; 
// import { Button, Error, Input, FormField, Label } from "../styles";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function LoginForm({ onLogin }){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    // const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
        }).then(res => {
            setIsLoading(false);
            if (res.ok) {
                res.json().then((user) => {
                    onLogin(user)
                    // history.push("/account")
                });
            } else {
                res.json().then((error) => {
                    console.log(error.errors)
                    // setErrors(error.errors)
                    // alert(error.errors)
                });
            }
        });
    }
    
    return(
        // <React.Fragment>
        //     <Link to="/">Home</Link>
        // <div>
        //     <p> User Login </p>
            
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
            </button>
            {/* {errors.map((err) => (
                <p key={err}>{err}</p>
            ))} */}
        </form>
        // </div>
        // <div>
        //     <Link to="/create-account">Create an Account</Link>
        // </div>
        // </React.Fragment>
    ); 

}

export default LoginForm;

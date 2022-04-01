import React, { useState } from "react"; 
// import { Button, Error, Input, FormField, Label } from "../styles";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

function LoginForm({ onLogin }){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
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
                    console.log(error.error.login)
                    setError(error.error.login)
                    // alert(error.errors)
                });
            }
        });
    }
    
    return(
        <form onSubmit = { handleSubmit } className = "login">
            <div className="form-fields">
                {/* <label htmlFor="username">Username</label> */}
                <input className="input"
                    type="text" 
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
                {/* <label htmlFor="password">Password</label> */}
                <input className="input"
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                />
            </div>
            <button className = "submit" variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
            </button>
            <h3 style = {{ color: "red"}}>{ error }</h3>
        </form>
        // </div>
        // <div>
        //     <Link to="/create-account">Create an Account</Link>
        // </div>
        // </React.Fragment>
    ); 

}

export default LoginForm;

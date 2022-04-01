import React, { useState } from "react"; 

function LoginForm({ onLogin }){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                });
            } else {
                res.json().then((error) => {
                    console.log(error.error.login)
                    setError(error.error.login)
                });
            }
        });
    }
    
    return(
        <form onSubmit = { handleSubmit } className = "login-signup">
            <div className="form-fields">
                <input className="input form-control" 
                    style = {{marginBottom: "10px"}}
                    type="text" 
                    id="username"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input className="input form-control"
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <h4 style = {{ color: "red" }}>{ error }</h4>
            </div>
            <button className = "submit" variant="fill"  type="submit">
                {isLoading ? "Loading..." : "LOG IN"}
            </button>            
        </form>
    ); 
}

export default LoginForm;

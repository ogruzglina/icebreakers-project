import React, { useState } from "react";

function SignUpForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=");
    const [hometown, setHometown] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const user = {
            first_name: firstName,
            last_name: lastName,
            avatar: avatarUrl,
            hometown,
            birthdate,
            email,
            username,
            password,
            password_confirmation: passwordConfirmation,
        }

        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => {
                    console.log(err.errors);
                    setErrors(err.errors);
                });
            }
        });
    }

    return (
        <form onSubmit = { handleSubmit } className = "login-signup">
            <div className="form-fields signup-fields">
                <input className="input form-control" 
                    style = {{marginBottom: "10px"}}
                    type="text"
                    id="first-name"
                    autoComplete="off"
                    value={firstName}
                    placeholder="First name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input className="input form-control" 
                    style = {{marginBottom: "10px"}}
                    type="text"
                    id="last-name"
                    autoComplete="off"
                    value={lastName}
                    placeholder="Last name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input className="input form-control" 
                    style = {{marginBottom: "10px"}}
                    type="text"
                    id="username"
                    autoComplete="off"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input className="input form-control" 
                    style = {{marginBottom: "10px"}}
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <input className="input form-control" 
                    style = {{marginBottom: "10px"}}
                    type="password"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    placeholder="Password confirmation"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    autoComplete="current-password"
                />
                { errors.map((err) => ( <h4 key = { err } style = {{ color: "red"}}>{ err }</h4> ))}
            </div>
            <button className = "submit" type="submit">
                { isLoading ? "Loading..." : "SIGN UP" }
            </button>
        </form>

    );
}

export default SignUpForm;
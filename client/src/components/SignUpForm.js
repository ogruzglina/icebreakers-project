import React, { useState } from "react";
// import { button, Error, input, formfield, label, Textarea } from "../styles";

function SignUpForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("../images/default-avatar.jpeg");
    const [hometown, setHometown] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // const history = useHistory();

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
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="first_name">First Name</label>
            <input
            type="text"
            id="first-name"
            autoComplete="off"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="last_name">Last Name</label>
            <input
            type="text"
            id="last-name"
            autoComplete="off"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            />
            <label htmlFor="password">Password Confirmation</label>
            <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
            />
            <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
            {errors.map((err) => (
                <div key={err}>{err}</div>
            ))}
        </form>
    );
}

export default SignUpForm;
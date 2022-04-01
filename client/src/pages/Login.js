import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
// import logo from "../images/logo.png"

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
    {/* <div >
      <h1>Welcome</h1>
      <h2>to</h2>
      <img src={logo} alt="logo" width="70%" />
    </div> */}
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <br />
          <p id = "text-for-signup">
            Don't have an account? &nbsp;
            <button type="button" class="btn btn-secondary" color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <br />
          <p id = "text-for-signup">
            Already have an account? &nbsp;
            <button type="button" class="btn btn-secondary" color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </>
  );
}

export default Login;
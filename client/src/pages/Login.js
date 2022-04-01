import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
 import team from "../images/team.png"

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div class="text-center">
        <img src={team} alt="team" width="28%" />
      </div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <br />
          <p className = "text-for-login-signup">
            Don't have an account? &nbsp;
            <button type="button" class="btn btn-secondary" color="secondary" onClick={() => setShowLogin(false)}>
              SIGN UP
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <br />
          <p className = "text-for-login-signup">
            Already have an account? &nbsp;
            <button type="button" class="btn btn-secondary" color="secondary" onClick={() => setShowLogin(true)}>
              LOG IN
            </button>
          </p>
        </>
      )}
    </>
  );
}

export default Login;
import React from "react";
import { Link, useHistory } from "react-router-dom";

function NavBar({ currentUser, setCurrentUser }) {
  
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" })
    .then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  return (
    <>
      <Link to="/">Icebreakers</Link>
      <nav>
        <button>
          <Link style={{textDecoration: "none"}} to="/profile">My User Profile</Link>
        </button>
        <button variant="outline" onClick={handleLogoutClick}>
          {/* <Link style={{textDecoration: "none"}} to="/">Logout</Link> */}
          Logout
        </button>
      </nav>
    </>
  );
}

export default NavBar;
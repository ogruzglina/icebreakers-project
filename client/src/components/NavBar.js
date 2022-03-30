import React from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <>
      <Link to="/">Icebreakers</Link>
      <nav>
        <button as={Link} to="/profile">
          My User Profile
        </button>
        <button variant="outline" onClick={handleLogoutClick}>
          Logout
        </button>
      </nav>
    </>
  );
}

export default NavBar;
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"

function NavBar({ setCurrentUser }) {
  
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
      <div class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">

                    <div class="navbar-header">
                        <button class="navbar-toggle" data-target="#mobile_menu" data-toggle="collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                        <a href="/"><img src={logo} alt="logo" width="70%" /></a>
                    </div>

                    <div class="navbar-collapse collapse" id="mobile_menu">                    
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="/profile"><span class="glyphicon glyphicon-user"></span> Profile</a></li>
                            <li><a href="/" onClick={handleLogoutClick}><span class="glyphicon glyphicon-log-in"></span> Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default NavBar;
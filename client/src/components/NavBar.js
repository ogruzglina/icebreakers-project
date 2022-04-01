import React from "react";
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
      <div className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">

                    <div className="navbar-header">
                        <button className="navbar-toggle" data-target="#mobile_menu" data-toggle="collapse"><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                        <a href="/"><img src={logo} alt="logo" width="70%" /></a>
                    </div>

                    <div className="navbar-collapse collapse" id="mobile_menu">                    
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/profile"><span className="glyphicon glyphicon-user"></span> Profile</a></li>
                            <li><a href="/" onClick={handleLogoutClick}><span className="glyphicon glyphicon-log-in"></span> Logout</a>
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
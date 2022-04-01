import React, { useState } from 'react'

function Profile({ currentUser, setCurrentUser }) {
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);
  const [hometown, setHometown] = useState(currentUser.hometown);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate);
  const [email, setEmail] = useState(currentUser.email);
  const [isLoading, setIsLoading] = useState(false);

  function handleSaveChangesClick(e) {

    e.preventDefault();
    setIsLoading(true);

    const user = {
      first_name: firstName,
      last_name: lastName,
      avatar: avatarUrl,
      hometown: hometown,
      birthdate: birthdate,
      email: email,
    }

    fetch(`/users/${currentUser.id}`, {
      method: "PATCH" ,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user),
    })
    .then((r) => {
      setIsLoading(false);
      r.json();
      setCurrentUser({...user,
        first_name: firstName,
        last_name: lastName,
        avatar: avatarUrl,
        hometown: hometown,
        birthdate: birthdate,
        email: email,
      });
    })
    .then((json) => console.log(json));
  }

  return (
    <div className="user-account" style = {{ displey: "flex", flexDirection: "column", justifyContent: "center"}}>
      <h1  style = {{ marginTop: "150px", display: "flex", justifyContent: "center"}}><b>Update Your Profile</b></h1>
      <form className=" text-center" onSubmit={handleSaveChangesClick} style = {{ marginTop: "30px", display: "flex", justifyContent: "center", flexDirection: "column"}}>
      
        <div className="profile" style = {{ marginTop: "30px", display: "flex", justifyContent: "center", marginLeft: "33%"}}>
          
        <div className = "profile-input">
          <div><label>First Name</label></div>
          <div>
            <input
            className="input form-control"
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style = {{width: "400px"}}
          /></div>
        </div>
        <div className = "profile-input">
          <div><label>Last Name</label> </div>
          <div>
            <input
              className="input form-control"
              type="text"
              id="last-name"
              autoComplete="off"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style = {{width: "400px"}}
            /> </div>
        </div>
        <div className = "profile-input">
          <div><label>Profile Picture URL</label> </div>
          <div>
            <input
              className="input form-control"
              type="text"
              id="last-name"
              autoComplete="off"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              style = {{width: "400px"}}
            /> </div>
        </div>
        <div className = "profile-input">
          <div><label>Hometown</label> </div>
          <div>
            <input
              className="input form-control"
              type="text"
              id="last-name"
              autoComplete="off"
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
              style = {{width: "400px"}}
            /> </div>
        </div>
        <div className = "profile-input">
          <div><label>Birthday</label> </div>
          <div>
            <input
              style = {{width: "400px"}}
              className="input form-control"
              type="text"
              id="last-name"
              autoComplete="off"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            /> </div>
        </div>
        <div className = "profile-input">
          <div className = "p-i-div"><label>Email</label> </div>
          <div className = "p-i-div" >
            <input
              className="input form-control"
              type="text"
              id="last-name"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style = {{width: "400px"}}
            /> </div>
        </div>
        
        </div>
        <div>
        <button className = "btn" type="submit" style = {{ marginTop: "30px", marginLeft: "47%", display: "flex", justifyContent: "center"}}>{isLoading ? "Loading..." : "Save Changes"}</button>
        </div>
        {/* <button className = "btn" type="submit">{isLoading ? "Loading..." : "Save Changes"}</button> */}
      </form>
      
    </div>
  )
}

export default Profile
import React, { useState } from 'react'
import defaultAvatar from "../images/default-avatar.jpeg"

function Profile({ currentUser, setCurrentUser }) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [hometown, setHometown] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSaveChangesClick(e) {

    e.preventDefault();
    setIsLoading(true);

    const user = {
      first_name: firstName,
      last_name: lastName,
      avatar: avatarUrl,
      hometown,
      birthdate,
      email,
    }

    fetch(`/users/${currentUser.id}`, {
      method: "PATCH" ,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user),
    })
    .then((r) => {
      setIsLoading(false);
      r.json()
    })
    .then((json) => console.log(json));

  }

  return (
    <div className="user-account">
      <form className="user-profile" onSubmit={handleSaveChangesClick}>
        <div>
          <label>First Name</label>
          <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
          type="text"
          id="last-name"
          autoComplete="off"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Profile Picture</label>
          <input type="file" id="myFile" name="filename"
                    onChange={(e) => setAvatarUrl(e.target.value)}/>
          <input
          type="text"
          id="last-name"
          autoComplete="off"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Hometown</label>
          <input
          type="text"
          id="last-name"
          autoComplete="off"
          value={hometown}
          onChange={(e) => setHometown(e.target.value)}
          />
        </div>
        <div>
          <label>Birthday</label>
          <input
          type="text"
          id="last-name"
          autoComplete="off"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
          type="text"
          id="last-name"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">{isLoading ? "Loading..." : "Save Changes"}</button>
      </form>
    </div>
  )
}

export default Profile
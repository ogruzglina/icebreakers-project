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
    <div className="user-account">
      <form className="user-profile text-center" onSubmit={handleSaveChangesClick}>
        <div>
          <h2 className="text-color">Update Your Profile</h2>
        </div>
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
          <label>Profile Picture URL</label>
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
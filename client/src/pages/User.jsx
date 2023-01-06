import "./user.css";
import { useEffect, useState } from "react";
const User = (props) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const signOut = (e) => {
    sessionStorage.removeItem("li_at");
    window.location.href = "/";
  };
  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(sessionStorage.getItem("li_at"));
      if (!loggedInUser.email || !loggedInUser.fullName) {
        throw new Error("");
      }
      setEmail(loggedInUser.email);
      setFullName(loggedInUser.fullName);
    } catch (error) {
      sessionStorage.removeItem("li_at");
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="User">
      <div class="wrapper">
        <div class="container">
          <div class="title">
            <span class="text">User Profile</span>
          </div>
          <div class="settings">
            <div class="pictureField">
              <img
                type="file"
                src="https://raw.githubusercontent.com/LokeshPatil-loki/Let-s-Talk/main/public/resources/user.png"
                id="userProfilePicture"
              />
            </div>
            <div class="field">
              <label for="name">Name:</label>
              <input
                value={fullName}
                type="text"
                id="name"
                name="name"
                autocomplete="off"
                readOnly
              />
            </div>
            <div class="field">
              <label for="email">Email Adress:</label>
              <input
                value={email}
                type="email"
                id="email"
                name="email"
                autocomplete="off"
                readonly
              />
            </div>
            <div class="field">
              <button onClick={signOut}>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

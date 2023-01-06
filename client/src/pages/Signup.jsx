import "./style.css";
import { useState, useRef } from "react";
import axios from "axios";

const Signup = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();

  const toggleShowPassword = (e) => {
    if (e.target.checked) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await axios
      .post("http://localhost:3001/api/signup", {
        email,
        fullName,
        password,
      })
      .then((response) => {
        alert("Account Created");
        window.location.href = "/";
      })
      .catch((err) => {
        return alert(err.response.data.errors.join("\n"));
      });
  };

  return (
    <div className="Signup">
      <div class="wrapper">
        <div class="container">
          <div class="title">Sign Up</div>
          <div class="signup">
            <form onSubmit={onSubmit} id="signUpForm">
              <div class="field">
                <label for="fullName">Full Name</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  required
                />
                <span id="errFullName" class="error"></span>
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="username@domain.com"
                  required
                />
                <span id="errEmail" class="error"></span>
              </div>
              <div class="field">
                <label for="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a password"
                  required
                />
                <span id="errPassword" class="error"></span>
              </div>

              <div class="field show-password">
                <input onChange={toggleShowPassword} type="checkbox" id="show-password" />
                <label id="lbl-show-password" for="show-password">
                  Show Password
                </label>
              </div>

              <div class="field">
                <button type="submit" id="btn-signup">
                  Sign Up
                </button>
              </div>

              <div class="field">
                <span id="have-an-account">
                  Already have an account? <a href="/login">Sign in instead.</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

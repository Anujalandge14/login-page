import "./style.css";
import { useState, useRef } from "react";
import axios from "axios";

const Login = (props) => {
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
    axios
      .post("http://localhost:3001/api/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("li_at", JSON.stringify(res.data));
        alert("Signed In");
        window.location.href = "/";
      })
      .catch((err) => {
        return alert(err.response.data.errors.join("\n"));
      });
  };

  return (
    <div className="Login">
      <div class="wrapper">
        <div class="container">
          <div class="title">Login</div>
          <div class="login">
            <form onSubmit={onSubmit} id="signUpForm">
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
                  ref={passwordRef}
                  onChange={(e) => setPassword(e.target.value)}
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
                <button type="submit" id="btn-login">
                  Login
                </button>
              </div>

              <div class="field">
                <span id="have-an-account">
                  <a href="/signup">Already have an account?</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

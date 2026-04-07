// //Login.jsx file
// import React, { useState } from "react";  // right pop up without blur
// import "../styles/Login.css";   // 👈 use the CSS I gave you

// function Login({ setIsLoggedIn, switchToSignup }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // For now, just set login success (later you can add real auth)
//     if (username && password) {
//       setIsLoggedIn(true);   // ✅ clear blur and show CreatePost
//     } else {
//       alert("Please enter username & password");
//     }
//   };

//   return (
//     <div className="outside-login-container"> {/* dark background + blur */}
//       <div className="main-login-container"> {/* white modal box */}
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p>
//           Don’t have an account?{" "}
//           <a onClick={switchToSignup} className="signup-link"><u>Sign Up</u></a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;












// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Login({ setIsLoggedIn, switchToSignup }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       alert("You are already logged in!");
//       navigate("/profile"); // ✅ redirect to profile
//     }
//   }, [navigate]);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.username === username && storedUser.password === password) {
//       localStorage.setItem("token", "dummy-token");
//       setIsLoggedIn(true);
//       navigate("/profile"); // ✅ redirect to profile
//     } else {
//       alert("Invalid username or password");
//     }
//   };

//   return (
//     <div className="login-box">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don’t have an account?{" "}
//         <span onClick={switchToSignup} className="link">
//           Signup
//         </span>
//       </p>
//     </div>
//   );
// }

// export default Login;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Login.css";

// export default function Login({ setIsLoggedIn }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const { username, password } = formData;

//     if (!username || !password) {
//       alert("All fields are required!");
//       return;
//     }

//     const savedUser = JSON.parse(localStorage.getItem("user"));

//     if (
//       savedUser &&
//       savedUser.username === username &&
//       savedUser.password === password
//     ) {
//       // Successful login
//       localStorage.setItem("token", "loggedin"); // fake token
//       setIsLoggedIn(true);
//       alert("Login Successful!");
//       navigate("/profile");
//     } else {
//       alert("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="outer-login-container">
//     <div className="main-login-container">
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Enter Username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <p className="dont">
//         Don’t have an account? <span onClick={() => navigate("/signup")} className="signup-link">Sign Up</span>
//       </p>
//     </div>
//     </div>
//   );
// }









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", username);
      formDataToSend.append("password", password);

      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Successful login
        localStorage.setItem("token", data.access_token);
        setIsLoggedIn(true);

        // Fetch user data to confirm we have common user details
        const meResponse = await fetch("http://127.0.0.1:8000/users/me", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });
        const userData = await meResponse.json();
        setUser(userData);

        alert("Login Successful!");
        navigate("/profile");
      } else {
        alert(data.detail || "Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Connection error. Is the backend running?");
    }
  };

  return (
    <div className="outer-login-container">
      <div className="main-login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <p className="dont">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="signup-link"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

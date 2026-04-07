// Signup.jsx file
// import React, { useState } from "react";    //right pop up without blur
// import "../styles/Signup.css";   // 👈 same CSS as Login

// function Signup({ setIsLoggedIn, switchToLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (username && password) {
//       alert("Signup successful! Please login.");
//       setIsLoggedIn(true);   // ✅ mark logged in
//     } else {
//       alert("Please enter all fields");
//     }
//   };

//   return (
//     <div className="outside-signup-container">
//       <div className="main-signup-container">
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Choose Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Choose Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//         <p>
//           Already have an account?{" "}
//           <a onClick={switchToLogin} className="login-link"><u>Login</u></a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;







//Signup.jsx file
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/; // simple regex
    return re.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Validation
    if (!username || !email || !password) {
      alert("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      alert("Enter a valid email address!");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.detail || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please check if the backend is running.");
    }
  };

  return (
    <div className="outer-signup-container">
      <div className="main-signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <span onClick={() => navigate("/login")} className="login-link">Login</span>
        </p>
      </div>
    </div>
  );
}









// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Signup.css";

// export default function Signup({ setIsLoggedIn, setUser }) {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const { username, email, password } = formData;

//     if (!username || !email || !password) {
//       alert("All fields are required!");
//       return;
//     }

//     // Simple email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert("Please enter a valid email!");
//       return;
//     }

//     // Save user to localStorage
//     const newUser = { username, email, password };
//     localStorage.setItem("user", JSON.stringify(newUser));

//     // Set login status + user state
//     localStorage.setItem("token", "loggedin");
//     setIsLoggedIn(true);
//     setUser(newUser);

//     alert("Signup successful! Welcome " + username);
//     navigate("/profile");
//   };

//   return (
//     <div className="outer-signup-container">
//       <div className="main-signup-container">
//         <h1>Sign Up</h1>
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter Username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//         <p className="dont">
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="login-link"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

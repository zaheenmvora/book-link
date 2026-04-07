// ProtectedRoute.jsx file
// import React, { useState } from "react";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import "../styles/ProtectedRoute.css";

// export default function ProtectedRoute({ isLoggedIn, setIsLoggedIn, children }) {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="protected-container">
//       {/* Always render children (e.g. CreatePost) */}
//       <div className={!isLoggedIn ? "blurred-content" : ""}>
//         {children}
//       </div>

//       {/* If not logged in, show overlay + modal */}
//       {!isLoggedIn && (
//         <>
//           <div className="proroute-overle"></div>
//           <div className="inside-proroute">
//             {showLogin ? (
//               <Login
//                 setIsLoggedIn={setIsLoggedIn}
//                 switchToSignup={() => setShowLogin(false)}
//               />
//             ) : (
//               <Signup
//                 setIsLoggedIn={setIsLoggedIn}
//                 switchToLogin={() => setShowLogin(true)}
//               />
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }







// ProtectedRoute.jsx
// import React, { useState } from "react";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import "../styles/ProtectedRoute.css";

// export default function ProtectedRoute({ isLoggedIn, setIsLoggedIn, children }) {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="protected-container">
//       {/* Blur children if not logged in */}
//       <div className={!isLoggedIn ? "blurred-content" : ""}>
//         {children}
//       </div>

//       {/* If not logged in, show overlay with login/signup */}
//       {!isLoggedIn && (
//         <>
//           <div className="proroute-overlay"></div>
//           <div className="inside-proroute">
//             {showLogin ? (
//               <Login
//                 setIsLoggedIn={setIsLoggedIn}
//                 switchToSignup={() => setShowLogin(false)}
//               />
//             ) : (
//               <Signup
//                 setIsLoggedIn={setIsLoggedIn}
//                 switchToLogin={() => setShowLogin(true)}
//               />
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }










import React, { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function ProtectedRoute({ isLoggedIn, setIsLoggedIn, setUser, children }) {
  const [showLogin, setShowLogin] = useState(true); // toggle between login/signup

  if (!isLoggedIn) {
    return (
      <div className="protected-auth-overlay">
        <div className="protected-auth-modal">
          <h1>Access Denied</h1>
          <p>Please login or signup to continue to this page.</p>
          <div className="modal-btn-container">
            <button className="modal-ok-btn" onClick={() => window.location.href = "/"}>OK</button>
          </div>
          <div className="auth-toggle-container">
            {showLogin ? (
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                switchToSignup={() => setShowLogin(false)}
              />
            ) : (
              <Signup switchToLogin={() => setShowLogin(true)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return children; // if logged in, show the protected page
}









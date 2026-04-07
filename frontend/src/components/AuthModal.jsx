//AuthModal.jsx file
// import React, { useState } from "react";
// import Login from "../pages/Login";
// import Signup from "../pages/Signup";
// import "../styles/Login.css";
// import "../styles/Signup.css";

// function AuthModal({ setShowAuthModal, setIsLoggedIn }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [fadeOut, setFadeOut] = useState(false);

  
//   const handleClose = () => {
//     setFadeOut(true);
//     setTimeout(() => setShowAuthModal(false), 300); // match fade duration
//   };

//   return (
//     <div className={`modal-overlay ${fadeOut ? "fade-out" : "fade-in"}`}>
//       <div className="modal-content">
//         {isLogin ? (
//           <Login
//             onLoginSuccess={() => {
//               setIsLoggedIn(true);
//               handleClose();
//             }}
//             switchToSignup={() => setIsLogin(false)}
//           />
//         ) : (
//           <Signup
//             onSignupSuccess={() => {
//               setIsLoggedIn(true);
//               handleClose();
//             }}
//             switchToLogin={() => setIsLogin(true)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default AuthModal;










// AuthModal.jsx file
import React, { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import "../styles/AuthModal.css";  // new combined CSS

function AuthModal({ setShowAuthModal, setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setShowAuthModal(false), 300); // match fade duration
  };

  return (
    <div className={`modal-overlay ${fadeOut ? "fade-out" : "fade-in"}`}>
      <div className="modal-content">
        {isLogin ? (
          <Login
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              handleClose();
            }}
            switchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <Signup
            onSignupSuccess={() => {
              setIsLoggedIn(true);
              handleClose();
            }}
            switchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
}

export default AuthModal;

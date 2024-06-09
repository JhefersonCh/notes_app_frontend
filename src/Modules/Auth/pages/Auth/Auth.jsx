import { useState } from "react";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import "./Auth.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-inner-container">
        <SwitchTransition>
          <CSSTransition
            key={showRegister ? "register" : "login"}
            timeout={250}
            classNames="fade"
            unmountOnExit
          >
            {showRegister ? (
              <Register setShowRegister={setShowRegister} />
            ) : (
              <Login setShowRegister={setShowRegister} />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};
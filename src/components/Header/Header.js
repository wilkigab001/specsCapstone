import React, { useState, useContext } from "react";
import styles from "./Header.module.css";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import AuthContext from "../../store/authContext";

import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.header}>
      <div className={styles.headerCenter}>
        <p className={styles.text}>Your Trip Planner!</p>
      </div>
      <div className={styles.menuIcon}>
        <AiOutlineMenu onClick={() => setIsMenuOpen(true)} size={25} />
      </div>
      {isMenuOpen && (
        <div className={styles.sidebar}>
          <div className={styles.closeHeader}>
            <AiOutlineCloseCircle
              onClick={() => setIsMenuOpen(false)}
              className={styles.icon}
            />
          </div>
          <div className={styles.buttons}>
            <li className={styles.list}>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <p className={styles.sideBarItems}>Home</p>
              </NavLink>
            </li>
            <li className={styles.list}>
              <NavLink to="/profile" style={{ textDecoration: "none" }}>
                <p className={styles.sideBarItems}>Profile</p>
              </NavLink>
            </li>
            <li className={styles.list}>
              <NavLink to="/form" style={{ textDecoration: "none" }}>
                <p className={styles.sideBarItems}>New Post</p>
              </NavLink>
            </li>
            {authCtx.token ? (
              <li className={styles.list}>
                <p
                  className={styles.sideBarItems}
                  onClick={() => authCtx.logout()}
                >
                  Logout
                </p>
              </li>
            ) : (
              <li className={styles.list}>
                <NavLink to="/auth" style={{ textDecoration: "none" }}>
                  <p className={styles.sideBarItems}>Login</p>
                </NavLink>
              </li>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

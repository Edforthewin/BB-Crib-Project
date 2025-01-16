import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './ProfileButton.css';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    if(!showMenu) return;

    const closeMenu = (e) => {
      if(!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu)

  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.userLogout());
    closeMenu();
    window.location.href = '/';
  };

  const ulClassName = 'profile-button' + (showMenu ? "": " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Greetings, {user.username}! </li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
                <NavLink to="/spots/current" className="profile-manage" onClick={closeMenu}>Manage Spots</NavLink>
            {/* <button onClick={handleManageSpots}>Manage Spots</button> */}

        </li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </>
    ) : (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            onButtonClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            onButtonClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </li>
      </>
    )}
  </ul>
</>
);

}

export default ProfileButton;

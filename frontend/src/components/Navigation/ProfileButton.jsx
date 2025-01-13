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

  useEffect(() => {
    if(!showMenu) {
      return;
    }
    const closeMenu = (e) => {
      if(!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu)

  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.userLogout());
    closeMenu();
    window.location.href = '/';
  };

  // const ulClassName = 'profile-button' + (showMenu ? "": " hidden");

  const handleDemoButton = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.userLogin({
      credential: "Demo-lition",
      password: 'password'
    }))
      .then(() => setShowMenu(false));
  }

  return (
    <>
      <div className='profile-button'>
          <button onClick={toggleMenu}>
          <i className='fa-solid fa-bars menu-button'></i>
            <i className='fas fa-user-circle'></i>
          </button>
      </div>
      {showMenu && (user ?
        <div className='dropdown'>
            <ul className='profile-dropdown'>
                <div className='dropdown-user' ref={ulRef}>
                    <div>
                      Hello, {user.firstname}
                    </div>
                    <div>
                       {user.email}
                    </div>
                </div>
                <div>
                    <NavLink to='/spots/current' className='hosting'>Manage Spots</NavLink>
                </div>
                <div className="dropdown-link">
                      <NavLink to='/bookings' className="hosting">My bookings</NavLink>
                </div>
                <div className='dropdown-link'>
                  <button onClick={logout} className='dropdown-button'>Sign out</button>
                </div>
            </ul>
        </div>: (
          <div className='dropdown'>
            <ul className='profile-dropdown'>
                <li>
                    <OpenModalButton
                      buttonText="Login"
                      onButtonClick={closeMenu}
                      modalComponent={<LoginFormModal/>}
                    className='dropdown-button'
                    />
                </li>
                <li>
                     <OpenModalButton
                      buttonText="Sign Up"
                      onButtonClick={closeMenu}
                      modalComponent={<SignupFormModal/>}
                    className='dropdown-button'
                    />
                </li>
                <li>
                    <button onClick={handleDemoButton} className='dropdown-button'>Demo User</button>
                </li>
            </ul>
          </div>
        )
      )}
    </>
  )

}

export default ProfileButton;

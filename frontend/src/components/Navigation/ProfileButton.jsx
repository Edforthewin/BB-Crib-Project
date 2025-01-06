import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link } from 'react-router-dom';
import './ProfileButton.css';


function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const onClickMenuButton = (e) => {
    e.stopPropagation();
    if (showMenu) {
      setShowMenu(false);
      return;
    }
    setShowMenu(true);
  }

  useEffect(() => {
    if(!showMenu) {
      return;
    }
    const closeMenu = (e) => {
      e.stopPropagation();
      setShowMenu(false);
    }

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu)

  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  const handleDemoButton = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      credential: "Demo-lition",
      password: 'password'
    }))
      .then(() => setShowModal(false));
  }

  return (
    <>
      <div className='profile-button'>
          <button onClick={onClickMenuButton}>
          <i className='fa-solid fa-bars menu-button'></i>
            <i className='fas fa-user-circle'></i>
          </button>
      </div>
      {showMenu && (user ?
        <div className='dropdown'>
            <ul className='profile-dropdown'>
                <div className='dropdown-user'>
                    <div>
                      Hello, {user.firstname}
                    </div>
                    <div>
                       {user.email}
                    </div>
                </div>
                <div>
                    <Link to='/hosting' className='hosting'>Manage Listing</Link>
                </div>
                <div className='dropdown-link'>
                  <button onClick={logout} className='dropdown-button'>Sign out</button>
                </div>
            </ul>
        </div>: (
          <div className='dropdown'>
            <ul className='profile-dropdown'>
                <li>
                    <button onClick={() => {
                      setLogin(true)
                      setShowModal(true)
                    }} className='dropdown-button'>Login</button>
                </li>
                <li>
                    <button onClick={() => {
                        setLogin(false)
                        setShowModal(true)
                    }} className='dropdown-button'>SignUp</button>
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

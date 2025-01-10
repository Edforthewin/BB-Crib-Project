import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState} from 'react'
import { Modal } from '../../context/Modal';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import NewSpot from '../NewSpot/NewSpot';
import LabelledButton from '../LabelledButton/index';
import logo from './BB-cribz.png';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);


  return (
    <div className='navigation'>
      <div className='bb-crib-logo'>
        <NavLink to='/'><img src={logo} alt='logo' style={{width:120, height:80}} /></NavLink>
      </div>
      <div className='navigation-mid'>
          <div className='search-container'>
              <LabelledButton child={
                <div className='search-where'>
                    <span>Anywhere</span>
                </div>
              } />
              <LabelledButton child={
                <div className='search-time'>
                  <span>Any week</span>
                </div>
              } />
              <LabelledButton child={
                <div className='search-guest'>
                    <span>Any Price</span>
                  <div className='button-container'>
                      <button className='button-search'><i className='fa-solid fa-magnifying-glass' style={{ fontsize: 14 }}></i></button>
                  </div>
                </div>
              } />
          </div>

      </div>
      <div className='navigation-bar'>
        {isLoaded && (
          <>
          <ProfileButton
              user={sessionUser}
              setLogin={setLogin}
              setShowModal={setShowModal}
          />
              <div className='link-createspot'>
                  <NewSpot/>
              </div>
          </>
        )}
      </div>
      {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              {login ? <LoginFormModal setShowModal={setShowModal}/> : <SignupFormModal setShowModal={setShowModal}/>}
          </Modal>
      )}
    </div>
  );
}

export default Navigation;

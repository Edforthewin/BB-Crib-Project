import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import NewSpot from '../NewSpot/NewSpot';
import LabelledButton from '../LabelledButton/index';
import logo from './BB-cribz.png';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


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
          {
            sessionUser && (
              <li className='createSpot'>
                <NavLink to="/spots/new" className='create-spot-link'>
                Create a New Spot
                </NavLink>
              </li>
            )
          }
          <ProfileButton user={sessionUser}/>
              <div className='link-createspot'>
                  <NewSpot/>
              </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;

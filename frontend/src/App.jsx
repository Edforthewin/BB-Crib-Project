import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import NewSpotFormModal  from './components/NewSpot/NewSpot';
import  SpotDetail  from './components/Listing-Spots/ListingSpotDetail';
import  UserSpots  from './components/UserSpots/index';
import FilterSpots from './components/Listing-Spots/FilterSpots';
import ListingSpotsBoi from './components/Listing-Spots/ListingSpot';
import Footer from './components/Footer/index';
import UseProfile from './components/UserProfile/UserProfile';
import './index.css'

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className='page'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element:<ListingSpotsBoi/> && <Footer/>
      },
      {
        path: '/signup',
        element: <SignupFormModal/>
      },
      {
        path: '/spots/new',
        element: <NewSpotFormModal/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail/>
      },
      {
        path: '/hosting',
        element: <UserSpots/>
      },
      {
        path: '/filtered-spots',
        element: <FilterSpots/>
      },
      {
        path: '/bookings',
        element: <UseProfile/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

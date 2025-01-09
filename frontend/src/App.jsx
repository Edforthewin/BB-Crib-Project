import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import NewSpotFormModal  from './components/NewSpot/NewSpot';
import  SpotDetail  from './components/Listing-Spots/ListingSpotDetail';
import  UserSpots  from './components/UserSpots';
import ListingSpotsBoi from './components/Listing-Spots/ListingSpot';
import Footer from './components/Footer';
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
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

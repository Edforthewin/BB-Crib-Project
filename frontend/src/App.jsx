import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation/Navigation';
import NewSpot from './components/NewSpot/NewSpot';
import Footer from './components/Footer/index';
import SpotsLayout from './components/LandingPage/SpotsLayout';
import ManageSpots from './components/ManageSpots/ManageSpots';
import UpdateSpot from './components/ManageSpots/UpdateSpot';
import SpotDetails from './components/SpotDetails/SpotDetails';
import './index.css'

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => {
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
        element: <SpotsLayout/> && <Footer/>
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails/>
      },
      {
        path: '/spots/new',
        element: <NewSpot/>
      },
      {
        path: '/spots/current',
        element: <ManageSpots/>
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpot/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

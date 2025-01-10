import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as bookingAction from '../../store/booking';
import CancelTripModal from './Cancel/CancelModal';
import './UserProfile.css';

function UseProfile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userBooking = useSelector(state => state.bookings.user);

    useEffect(() => {
        dispatch(bookingAction.fetchUserBookings());
    }, [dispatch]);

    return (
        <>
          {sessionUser && (
            <>
              <div className='bookings-container'>
                <div className='booking-trips'>
                  <h2>Trips</h2>
                  <div className='booking-trips-info'>
                    {Object.values(userBooking).length > 0 &&
                      Object.values(userBooking).map(booking => (
                        <div key={booking.id}> {booking.id}
                          <Link className='booking-trip-detail' to={`/spots/${booking.spotId}`}>
                            <div className='booking-trip-img'>
                              <img src={booking.Spot.previewImage} alt="Spot" />
                            </div>
                            <div className='booking-trip-content'>
                              <span className='booking-city'>
                                {booking.Spot.city}
                              </span>
                              <div className='booking-date-info'>
                                <span className='booking-date'>{booking.startDate.substring(0, 10)}</span>
                                <span className='booking-date'>{booking.endDate.substring(0, 10)}</span>
                              </div>
                            </div>
                          </Link>
                          <div>
                            <CancelTripModal bookingId={booking.id} />
                          </div>
                        </div>
                      ))}
                    {Object.values(userBooking).length === 0 && (
                      <div>You have no trips.</div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {!sessionUser && <div>Please login to see this page!</div>}
        </>
      );
}

export default UseProfile

import { useDispatch } from "react-redux";
import { useState } from 'react';
import * as bookingAction from '../../../store/booking';
import '../UserProfile.css'

function CancelTrip(props) {
    const bookingId = props.bookingId;
    const modal = props.onClose;
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    const handleYesButton = (e) => {
        e.preventDefault;
        setErrors('');
        dispatch(bookingAction.deleteBooking(bookingId))
            .then(() => modal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data.messsage);
                }
            })
    }

    const handleCancelButton = (e) => {
        e.preventDefault();
        modal;
    }

    return (
        <div className="cancel-component">
            <div className="cancel-question">
                Do you want to cancel the trip?
            </div>
            <div className="cancel-error">
                {
                    errors &&
                    <span>{errors}</span>
                }
            </div>
            <div className="cancel-button">
                {
                    !errors &&
                    <>
                        <button onClick={handleYesButton} className="cancel-delete">Yes</button>
                        <button onClick={handleCancelButton} className="cancel-cancel">No</button>
                    </>
                }
                {
                    errors &&
                    <button onClick={handleCancelButton} className="cancel-ok">Ok</button>
                }
            </div>

        </div>
    )
}

export default CancelTrip

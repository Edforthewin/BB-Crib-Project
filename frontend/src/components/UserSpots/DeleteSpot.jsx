import { useDispatch } from 'react-redux';
import { useState } from 'react';

import * as spotsActions from '../../store/spots';
import './DeleteSpot.css';

function DeleteSpot(props) {
    const spot = props.spot;
    const modal = props.onClose;
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleYesButton = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(spotsActions.destroySpot(spot))
        .then(() => modal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let error = Object.values(data.errors)
                setErrors(error);
            }
        })
    }
    if(errors.length > 0) {
        alert("ERROR! Try again")
    }
    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();

    }
    return (
        <div className='delete-spot'>
            <div className='confirm-question'>
                Please confirm the deletion of this spot:
            </div>
            <div className='delete-button'>
                <button onClick={handleYesButton} className='button-delete'>Confirm</button>
                <button onClick={handleCancelButton} className='button-cancel'>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteSpot

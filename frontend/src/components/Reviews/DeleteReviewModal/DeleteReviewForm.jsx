import { useDispatch } from 'react-redux';
import{ useState } from 'react';
import * as reviewsAction from '../../../store/review';

function DeleteReviewFrom(props) {
    const reviewId = props.review;
    const modal = props.onClose;
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleYesButton = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(reviewsAction.destroyReview(reviewId))
        .then(() => modal())
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                let error = Object.values(data.errors)
                setErrors(error)
            }
        })
    }
    if (errors.length > 0) {
        alert("Oops, Please try again")
    }
    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
    }

    return (
        <div className="delete-component">
            <div className="delete-question">
                Are you sure to delete this review?
            </div>
            <div className="delete-btn">
                <button onClick={handleYesButton} className='button-delete'>Delete</button>
                <button onClick={handleCancelButton} className='button-cancel'>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteReviewFrom

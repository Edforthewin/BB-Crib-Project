import { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [ reviewText, setReviewText ] = useState('');
    const [ starRating, setStarRating ] = useState(0);
    const [error, setError] = useState('');

    const handleCommentChange = (e) => {
        const text = e.target.value;
        setReviewText(text);
        if(text.length < 10) {
            setError('Comment must be at least 10 characters long.');
        } else {
            setError('');
        }
    };

    const handleStarChange = (star) => {
        setStarRating(star);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(reviewText.length >= 10 && starRating) {
            try {
                await onSubmit({ review: reviewText, stars: starRating });
                setReviewText('');
                setStarRating(0);
                setError('');
                onClose();
            } catch (err) {
                console.error(err);
                setError('Review already exists for this spot.');
            }
        } else {
            setError('Please provide a valid comment and star rating.');
        }
    };

    const handleOverlayClick = () => {
        onClose();
    }

    if(!isOpen) return null;

    return (
        <div className='modal-overlay' onClick={handleOverlayClick}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>How was your stay?</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reviewText}
                        onChange={handleCommentChange}
                        placeholder='Leave your review...'
                        required
                    />
                    <div className='star-rating'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {[ 1, 2, 3, 4, 5].map((star) => (
                                <label key={star} style={{ cursor: 'pointer', fontSize: '24px' }}>
                                    <input
                                        type='radio'
                                        value={star}
                                        onChange={() => handleStarChange(star)}
                                        style={{ display: 'none' }}
                                    />
                                    <span onClick={() => handleStarChange(star)}>
                                        {starRating >= star ? '★' : '☆' }
                                    </span>
                                </label>
                            ))}
                            <span style={{ marginLeft: '8px' }}>Stars</span>
                        </div>
                    </div>
                    <button className='postreview-btn'
                        type='submit'
                        disabled={!reviewText || reviewText.length < 10 || starRating === 0}
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    )
};

export default ReviewModal;

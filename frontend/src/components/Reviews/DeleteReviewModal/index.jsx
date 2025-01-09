import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import  DeleteReviewForm  from './DeleteReviewForm';

function DeleteReviewModal({reviewId, spotId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)} className='button-delete'>Delete</button>
          {showModal && (
            <Modal>
                      <DeleteReviewForm review={reviewId} spotId={spotId} onClose={() => setShowModal(false)} />
            </Modal>
          )}
        </>
      );
}


export default DeleteReviewModal

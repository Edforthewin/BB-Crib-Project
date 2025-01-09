import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import  ReviewForm  from './index'

function ReviewSpotModal({ spotId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)} className='button-create'>Add a review</button>
          {showModal && (
            <Modal>
              <ReviewForm spotId={spotId} onClose={() => setShowModal(false)} />
            </Modal>
          )}
        </>
      );
}

export default ReviewSpotModal

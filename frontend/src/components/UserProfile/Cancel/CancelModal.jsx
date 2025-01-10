import { useState } from "react";
import { Modal } from '../../../context/Modal';
import CancelTrip  from './CancelTrip';

function CancelTripModal({bookingId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)} className='button-delete'>Delete</button>
          {showModal && (
            <Modal>
              <CancelTrip bookingId={bookingId} onClose={() => setShowModal(false)} />
            </Modal>
          )}
        </>
      );

}

export default CancelTripModal

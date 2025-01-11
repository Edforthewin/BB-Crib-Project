import { useState } from 'react';
import { Modal } from '../../context/Modal';
import  DeleteSpot  from './DeleteSpot';
import './DeleteSpot.css';

export default function DeleteSpotModal({spot}) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)} className='button-delete'>Delete</button>
          {showModal && (
            <Modal>
              <DeleteSpot spot={spot} onClose={() => setShowModal(false)} />
            </Modal>
          )}
        </>
      );
    }

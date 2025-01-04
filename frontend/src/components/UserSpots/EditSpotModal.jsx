import { useState } from 'react';
import { Modal } from '../../context/Modal';
import { EditSpotForm } from './EditSpot';


export default function DeleteSpotModal({ spot }) {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='button-update'>Update</button>
            {showModal && (
                <Modal>
                    <EditSpotForm spot={spot} onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    );
}

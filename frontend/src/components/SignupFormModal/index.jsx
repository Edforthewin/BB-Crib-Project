import { useState } from "react";
import { Modal } from '../../context/Modal';
import SignupFormModal from "./SignupFormModal";

function SignUp() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)}>Sign Up</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <SignupFormModal />
            </Modal>
          )}
        </>
      );

}

export default SignUp

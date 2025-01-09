import { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginFormModal from "./LoginFormModal";

function LoginForm() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)}>Log In</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginFormModal />
            </Modal>
          )}
        </>
      );

}

export default LoginForm

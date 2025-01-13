import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import { useModal } from '../../context/Modal'
import './LoginForm.css';

function LoginFormModal({setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemoLogin = async () => {
    try {
        await dispatch(sessionActions.demoLogin());
        closeModal();
    } catch (error) {
        console.error("Demo login failed", error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.userLogin({ credential, password }))
        .then(() => setShowModal(false))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors([`username/email or password are incorrect!`]);
            }
        })
}

return (
  <div className='login-container'>
      <div className='login-header'>
          <h2>Log in</h2>
      </div>
      <form onSubmit={handleSubmit} className='login-form'>
          <div className='login-welcome'>
              <h3>Welcome to Hairbnb</h3>
          </div>

          {errors.length > 0 &&
              <ul>
                  {errors.map(error =>
                      <li key={error}>{error}</li>)}
              </ul>
          }

          <div className='login-info'>
              <div className='login-name'>
                  <label>
                      <input
                          type='text'
                          value={credential}
                          onChange={(e) => setCredential(e.target.value)}
                          required
                          placeholder='username/email'
                          className='login-input login-input-email'
                      />
                  </label>
              </div>
              <div className='login-password'>
                  <label>
                      <input
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          placeholder='password '
                          className='login-input'
                      />
                  </label>
              </div>
          </div>
          <div className='login-button'>
              <button className='login-button' type='submit'>Log in</button>
          </div>
      </form>
  </div>
)
}

export default LoginFormModal;

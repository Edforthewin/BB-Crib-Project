import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemoLogin = async () => {
    try {
        dispatch(sessionActions.demoLogin());
        closeModal();
    } catch (error) {
        console.error("Demo login failed", error);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.userLogin({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                setErrors(data.errors);
            }
        });
};

const isButtonDisabled = credential.length < 4 || password.length < 6;

return (
  <div className='login-container'>
      <div className='login-header'>
          <h2>Log in</h2>
      </div>
      <form onSubmit={handleSubmit} className='login-form'>
          <div className='login-welcome'>
              <h3>Welcome to BB-Cribs</h3>
          </div>
          <div className='login-info'>
              <div className='login-name'>
                  <label>
                      <input
                          type='text'
                          value={credential}
                          onChange={(e) => setCredential(e.target.value)}
                          required
                          placeholder='Username or email'
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
                          placeholder='Password'
                          className='login-input'
                      />
                  </label>
                  {errors.credential && (
                  <p>{errors.credential}</p>
                   )}
              </div>
          </div>
          <div className='login-button'>
              <button className='login-button' type='submit' disabled={isButtonDisabled}>Log in</button>
          </div>
      </form>
      <div className='demo-link-container'>
        <span className='demo-link' onClick={handleDemoLogin}>
            Demo User
        </span>
      </div>
  </div>
)
}

export default LoginFormModal;

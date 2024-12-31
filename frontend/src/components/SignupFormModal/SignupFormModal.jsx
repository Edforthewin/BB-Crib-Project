import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if(sessionUser) {
    return (
      <Redirect to='/' />
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signup-container'>
      <div className='signup-header'>
        <h2>Create Account Bub</h2>
      </div>

      <form onSubmit={handleSubmit} className='signup-form'>
        {
           errors.length > 0 &&
           <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
           </ul>
        }
        <div className='signup-field signup-info'>
           <div className='signup-field signup-firstname'>
            <label>
                <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder='First Name'
                    className='input-field'
                />
            </label>
        </div>
        <div className='signup-field signup-lastname'>
            <label>
                <input
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder='Last Name'
                  className='input-field'
                />
            </label>
        </div>
        <div className='signup-field signup-username'>
          <label>
             <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Username'
                className='input-field'
             />
          </label>
        </div>
        <div className='signup-field signup-email'>
          <label>
              <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='Email'
                  className='input-field'
              />
          </label>
        </div>
        <div>
            <label>
                  <input
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder='Password'
                      className='input-field'
                  />
            </label>
        </div>
        <div className='signup-field signup-confirmedPassword'>
            <label>
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder='Confirmed Password'
                    className='input-field'
                />
            </label>
        </div>
        <div className='signup-button'><button type='submit'>Sign Up</button></div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;

import { useState } from 'react';
import { useDispatch} from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
    <div className='overall-box'>
       <div className='sign-up-css'>
         <h1>Sign Up</h1>
       </div>
      <form onSubmit={handleSubmit} className='form-css'>
        <div className='overall-signup-css'>
          <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </label>
        </div>
        {errors.email && <p>{errors.email}</p>}
         <div className='overall-signup-css'>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
          />
            </label>
         </div>
        {errors.username && <p>{errors.username}</p>}
         <div className='overall-signup-css'>
            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
         </div>
        {errors.firstName && <p>{errors.firstName}</p>}
         <div className='overall-signup-css'>
            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
         </div>
        {errors.lastName && <p>{errors.lastName}</p>}
         <div className='overall-signup-css'>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
         </div>
        {errors.password && <p>{errors.password}</p>}
         <div className='overall-signup-css'>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
         </div>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
         <div className='submit-button'>
            <button type="submit">Sign Up</button>
         </div>
      </form>
    </div>
  );
}

export default SignupFormModal;

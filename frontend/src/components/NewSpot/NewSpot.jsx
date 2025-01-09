import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spots';
import './NewSpot.css';



function NewSpotFormModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [desription, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const lat = 47.823;
    const lng = 123;
    const [url, setUrl] = useState('');
    // const { closeModal } = useModal();
    const [errors, setErrors ] = useState([]);
    const preview = true;
    const sessionUser = useSelector((state) => state.session.user);

    if(!sessionUser) return (
        <div className='spot-welcome'>
            <h2>Login to see this page!!!!</h2>
        </div>
    )


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if(url.length > 256) setErrors(['The length of URL must be less than 256 characters'])


    let createdSpot = await dispatch(spotActions.makeSpot({name, desription, price, address, country, city, state, lat, lng, url, preview}))
        .catch(async res => {
            const data = await res.json();
            if (data & data.message) {
                if (data.errors) {
                    const errors = Object.values(data.errors);
                    setErrors(errors);
                } else {
                    setErrors(data.message);
                }
            }
        })

        if (createdSpot) {
            const id = createdSpot.id
            navigate.push(`/spots/${id}`)
        }

   }

   return (
        <div className='newspot-main'>

            <div className='newspot-container'>
                <div className='newspot-welcome'>
                    <h2>Host your crib</h2>
            </div>
            <form onSubmit={handleSubmit} className='spot-form'>
            {errors.length > 0 &&
            <ul>
                {errors.map(error =>
                    <li key={error}>{error}</li>)}
            </ul>
        }
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder='Address'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder='City'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder='State'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder='Country'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Name the place'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <textarea
                value={desription}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Description: Describe the place'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder='$Price'
                className='input-fieldSpot'
                min='1'

              />
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='url'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                placeholder='Image Link'
                className='input-fieldSpot'

              />
            </label>
        </div>
        <button type='submit'>Agree & Submit</button>
        </form>
            </div>
        </div>
   )

}


export default NewSpotFormModal;

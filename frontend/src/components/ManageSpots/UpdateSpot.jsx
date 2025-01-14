import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modifySpot } from '../../store/spots';

const UpdateSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spot = useSelector((state) => state.spots[spotId]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(spot) {
            setName(spot.name || '');
            setDescription(spot.description || '');
            setAddress(spot.address || '');
            setCity(spot.city || '');
            setState(spot.state || '');
            setCountry(spot.country || '');
            setPrice(spot.price || '');
            setLat(spot.lat || '');
            setLng(spot.lng || '');
        }
    }, [spot]);

    const handleSubmit = async (e) => {
        e.prevenDefault();
        const updatedSpot = {
            address,
            city,
            state,
            country,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            name,
            description,
            price: parseFloat(price,)
        };

        const result = await dispatch(modifySpot(spotId, updatedSpot));

        if(result && result.errors) {
            setErrors(result.errors);
        } else {
            navigate(`/spots/${spotId}`);
        }
    };

    if(!spot) {
        return <div>Loading...</div>;
    }


    return (
        <div className='edit-spot'>
            <h1>Update your crib</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Address:
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Name:
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                <label>
                    State:
                    <input
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Latitude:
                    <input
                        type='number'
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Longitude:
                    <input
                        type='number'
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Update Crib</button>
            </form>
            {errors && <div className="error">{JSON.stringify(errors)}</div>} {/* Display any errors */}
        </div>
    )
};

export default UpdateSpot

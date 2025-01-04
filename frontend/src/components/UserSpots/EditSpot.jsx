import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spots';
import { useState } from 'react';
import './EditSpot.css';

function EditSpotForm(props) {
    const spot = props.spot;
    const modal = props.onClose;
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const lat = 47.823;
    const lng = 123;
    const [name, setName] = useState(spot.name);
    const [desription, setDescription] = useState(spot.desription);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const id = spot.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(spotsActions.modifySpot({ id, name, desription, price, address, country, city, state, lat, lng }))
            .then(() => modal())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    let error = Object.values(data.errors)
                    setErrors(error)
                }
            })
    }

    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
    }

    return (
        <div className="createspot-div">
            <div className="createspot-welcome">
                <h2>Edit your crib</h2>
            </div>
            <form onSubmit={handleSubmit} className="createspot-form">
                {errors.length > 0 &&
                    <ul>
                        {errors.map(error =>
                            <li key={error}>{error}</li>)}
                    </ul>
                }
                <div className="createspot-field">
                    <label>
                        <input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Address"
                            className="field"
                        />
                    </label>
                </div>
                <div className="create-spot-field">
                    <label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            placeholder="City"
                            className="field"
                        />
                    </label>
                </div>
                <div className="createspot-field">
                    <label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            placeholder="State"
                            className="field"
                        />
                    </label>
                </div>
                <div className="createspot-field">
                    <label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            placeholder="Country"
                            className="field"
                        />
                    </label>
                </div>
                <div className="createspot-field">
                    <label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Name your crib"
                            className="field"
                        />
                    </label>
                </div>
                <div className="createspot-field">
                    <label>
                        <textarea
                            value={desription}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="field"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            placeholder="$Price"
                            className="field"
                            min='1'
                        />
                    </label>
                </div>
                <button type='submit'>Agree & Submit</button>
                <button onClick={handleCancelButton}>Cancel</button>
            </form>
        </div>

    )

}


export default EditSpotForm

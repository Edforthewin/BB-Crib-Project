import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeSpot } from '../../store/spots';
import { uploadSpotImage } from '../../store/spots';
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
    const [previewImage, setPreviewImage] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [imageUrls, setImageUrls] = useState('');
    const [errors, setErrors ] = useState({});


    const handleImageChange = (index, value) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if(!country) newErrors.country = "Country is required.";
        if(!address) newErrors.address = "Street address is required.";
        if(!city) newErrors.city = "City is required";
        if(!state) newErrors.state = "State is required";
        if(desription.length < 30) newErrors.desription = "Description needs 30 or more characters.";
        if(!name) newErrors.name = "Name is required";
        if(!price) newErrors.price = "Price per night is required.";
        if (!lat || lat< -90 || lat > 90) newErrors.lat = "Latitude must be between -90 and 90.";
        if (!lng || lng < -180 || lng > 180) newErrors.lng = "Longitude must be between -180 and 180.";
        if (!previewImage) newErrors.previewImage = "Preview image is required.";

        const imageErrors = imageUrls.map(url => {
            const isValid = url === '' || /\.(png|jpg|jpeg)$/.test(url);
            return isValid ? '' : 'Image URL needs to end in png or jpg (or jpeg)';
        });

        if (imageErrors.some(error => error !== '')) {
            newErrors.imageErrors = imageErrors;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            name,
            desription,
            address,
            city,
            state,
            country,
            price: parseFloat(price),
            previewImage,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            images: imageUrls.filter(image => image)
        };

        try {
            const result = await dispatch(makeSpot(data));

            if(result && result.id) {
                await dispatch(uploadSpotImage(result.id, imageUrls, previewImage));
                alert("Spot successfully created!");
                navigate(`/spots/${result.id}`);
            } else {
                alert("Failed to create spot. Please check your inputs.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred while creating the spot.';
            alert(errorMessage);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
   };


   return (
        <div className='newspot-main'>

            <div className='newspot-container'>
                <div className='newspot-welcome'>
                    <h2>Host your crib</h2>
            </div>
            <form onSubmit={handleSubmit} className='spot-form'>

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
              {errors.address && <p>{errors.address}</p>}
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
              {errors.city && <p>{errors.city}</p>}
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
              {errors.state && <p>{errors.state}</p>}
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
                placeholder='Latitude'
                className='input-fieldSpot'
              />
              {errors.lat && <p>{errors.lat}</p>}
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
                placeholder='Longitude'
                className='input-fieldSpot'

              />
              {errors.lng && <p>{errors.lng}</p>}
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
              {errors.country && <p>{errors.country}</p>}
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
              {errors.name && <p>{errors.desription}</p>}
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <textarea
                value={desription}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Description: Describe the crib...'
                className='input-fieldSpot'

              />
              {errors.desription && <p>{errors.desription}</p>}
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder='Price per night (USD)'
                className='input-fieldSpot'
                min='1'
              />
              {errors.price && <p>{errors.price}</p>}
            </label>
        </div>
        <div className='newspot-field'>
            <label>
                <input
                type='text'
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
                placeholder='Preview Image URL'
                className='input-fieldSpot'

              />
              {errors.previewImage && <p>{errors.previewImage}</p>}
            </label>

            {imageUrls.map((url, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => handleImageChange(index, e.target.value)}
                                placeholder="Image URL"
                            />
                            {errors.imageErrors && errors.imageErrors[index] && (
                                <p>{errors.imageErrors[index]}</p>
                            )}
                        </div>
            ))}
        </div>
        <button type='submit'>Agree & Submit</button>
        </form>
            </div>
        </div>
   )

}


export default NewSpotFormModal;

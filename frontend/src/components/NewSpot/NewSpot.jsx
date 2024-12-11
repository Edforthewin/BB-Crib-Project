import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spots';
import './NewSpot.css';



function NewSpotFormModal() {
    const dispatch = useDispatch();
    const [name, setName ] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [url, setUrl] = useState('');
    const [errors, setErrors] = useState({});
    const preview = true;
    const { closeModal } = useModal();
    const sessionUser = useSelector((state) => state.session.user);

    return (

    )

}


export default NewSpotFormModal;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spots';
import './NewSpot.css';



function NewSpotFormModal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors ] = useState({});

    const [form, setForm ] = useState({
        country: '',
        address: '',
        city: '',
        state: '',
        desription: '',
        name: '',
        price: '',
        previewImage: '',
        images: ['', '', '', ''],


    });

    const formValidate = () => {
        const errors = {};
        if(!form.country) errors.country = 'Need that country';
        if(!form.address) errors.address = 'Street addy is required';
        if(!form.city) errors.city = 'City is required';
        if(!form.state) errors.state = 'State is required';
        if(form.desription.length < 30) errors.desription = 'Description needs 30 or more chars';
        if(!form.name) errors.name = 'Name is required';
        if(!form.price) errors.price = 'Price per night is required';
        if(!form.previewImage) errors.previewImage = 'Preview image is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = formValidate();

        if(Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        try {
            const newSpot = await dispatch(spotActions(form));
            navigate(`/spots/${newSpot.id}`);
        } catch(error) {
            setErrors({ submit: error.message });
        }
    };

    return (

    )

}


export default NewSpotFormModal;

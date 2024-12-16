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

    return (

    )

}


export default NewSpotFormModal;

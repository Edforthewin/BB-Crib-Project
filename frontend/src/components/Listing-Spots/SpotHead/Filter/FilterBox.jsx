import { useState } from 'react';
import * as spotActions from '../../../../store/spots';
import { useNavigate } from 'react-router-dom';
import './FilterBox.css';

const FilterBox = ({onClose, dispatch}) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const closeBox = () => {
        onClose();
    }

    const filter = () => {
        setError('');
        if (!minPrice || !maxPrice) {
            setError("please input min price or max price.");
        } else if (Number(minPrice) === 0) {
            setError("min price must start from $1");
        } else if (+minPrice >= +maxPrice) {
            setError("min price must be less than max price.")
        } else {
            dispatch(spotActions.spotFilter({ minPrice, maxPrice }))
            .then(() => {
                navigate.push("/filtered-spots");
                onClose();
            }).catch(async (error) => {
                setError(error)
            })
        }
    }

    return (
        <div className="filtersearch-box">
            <div className="search-input-title">
                <i className="fa-solid fa-xmark" onClick={closeBox}></i>
                <div className="search-input-title-span"><span>Filters</span></div>
            </div>
            <div className="search-input-content">
                <span>Price range</span>
                <div className="search-input-err">
                    {
                        error &&
                        <span>
                                {error}
                        </span>
                    }
                </div>
                <div className="search-input-price">
                    <div className="search-input-min">
                        <label>Min Price</label>
                        <input
                            type='number'
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className="search-input-max">
                        <label>Max Price</label>
                        <input
                             type='number'
                             value={maxPrice}
                             onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="search-input-btn">
                <button className="search-input-btnfilter" onClick={filter} >
                    <i className="fa-solid fa-filter"></i>
                    <span>
                        Show Places
                    </span>
                </button>
            </div>
        </div>

    )
}

export default FilterBox

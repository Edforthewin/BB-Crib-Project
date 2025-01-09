import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as spotAction from '../../../store/spots';

const SearchBox = ({onClose}) => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const closeBox = () => {
        onClose();
    }

    const filter = () => {
        setError("");
        if (!minPrice || !maxPrice) {
            setError("Pls input min price or max price.");
        } else if (Number(minPrice) === 0) {
            setError("min price start from $1");
        } else if (+minPrice >= +maxPrice) {
            setError("min price must be less than max price.");
        } else {
            dispatch(spotAction.spotFilter({ minPrice, maxPrice}))
                .then(() => {
                    onClose();
                    navigate.push("/filtered-spots");
                }).catch(async (error) => {
                    setError(error);
                })
        }
    }

    return (
        <>
            <div className="search-input-title">
                <i className="fa-solid fa-xmark" onClick={closeBox}></i>
                <div className="search-input-title-span"><span>Filters</span></div>
            </div>
            <div>
                <span>Price Range</span>
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
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className="search-input-max">
                        <label>Max Price</label>
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="search-input-button">
                <button className="search-input-button-filter" onClick={filter}>
                    <i className="fa-solid fa-filter"></i>
                    <span>
                        Show Cribs
                    </span>
                </button>
            </div>
        </>
    )
}

export default SearchBox

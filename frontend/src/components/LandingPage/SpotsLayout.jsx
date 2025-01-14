import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import './SpotsLayout.css';

function SpotsLayout() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const starEmoji = '⭐';

    useEffect(() => {
        dispatch(allSpots());
    }, [dispatch]);

    return (
        <>
            <div className="row">
                {spots.map(spot => {
                    const averageRating = spot.avgRating ? spot.avgRating.toFixed(1) : 'New';

                    return (
                    <div className="column" key={spot.id}>
                        <NavLink to={`/spots/${spot.id}`} className="spotTile">

                           <div className="spotslayout-imagecontainer">
                            <img className="imgLayout" src={spot.previewImage} alt={spot.name} />
                            </div>

                            <div className="tooltip">{spot.name}</div>


                          <div className="spotslayout-infocontainer">
                                <div className="spotGridHeader">

                                <div className="location">{spot.city}, {spot.state}
                                </div>

                                <div className="star">{starEmoji} <span className="spotGrid-star">{averageRating}</span>
                                </div>

                                 </div>

                                <div className="spotGridDetails">
                                     <p>
                                       ${spot.price.toFixed(2)} night</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                )
})}
            </div>
        </>
    );
}

export default SpotsLayout

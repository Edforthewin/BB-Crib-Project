import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpots, destroySpot } from '../../store/spots';
import { NavLink, useNavigate } from 'react-router-dom';
import './ManageSpots.css';

const ManageSpots = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [spotIdToDelete, setSpotIdToDelete] = useState(null);

    const spots = useSelector(state => {
        if(sessionUser) {
            return Object.values(state.spots)
            .filter(spot => spot.ownerId === sessionUser.id);
        }
        return [];
    });

    useEffect(() => {
        if(!sessionUser) {
            navigate('/');
        } else {
            dispatch(allSpots());
        }
    }, [dispatch, navigate, sessionUser]);

    const handleDelete = (spotId) => {
        setSpotIdToDelete(spotId);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if(spotIdToDelete) {
            dispatch(destroySpot(spotIdToDelete));
        }
        setIsModalOpen(false);
        setSpotIdToDelete(null)
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setSpotIdToDelete(null);
    };

    const starEmoji = '⭐';

    return (
        <div className="manage-spots-layout">
            <h1>Managed Spots</h1>
            <div className="manage-spot-createbtn"> <button className="ManageCreate" onClick={(e) => {
                e.stopPropagation();
                navigate(`/spots/new`);
                }}>Create a New Spot</button></div>

            {spots.length === 0 ? (
                <p>You don&apos;t have any spots listed. Create a new spot!</p>
            ) : (
                <div className="row">
                    {spots.map(spot => (
                        <div className="column" key={spot.id}>
                            <div className="spotTile">
                                <NavLink to={`/spots/${spot.id}`} className="spotLink">

                                <div className="manage-spots-image-container">
                                     <img
                                        className="imgLayout"
                                        src={spot.previewImage}
                                        alt={spot.name}
                                    />
                                    </div>

                                    <div className="tooltip">{spot.name}</div>
                                </NavLink>


                                <div className="manage-spots-info-container">
                                    <div className="spotGridHeader">
                                    <div className="location">{spot.city}, {spot.state}</div>
                                    <div className="star"> {starEmoji} {spot.numReviews > 0 ? (spot.avgRating || 0).toFixed(1) : "New"}</div>
                                </div>

                                <div className="spotGridDetails">
                                    <p>${spot.price} /night</p>
                                </div>

                                <div className="spotButtons">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/spots/${spot.id}/edit`);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(spot.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
                {/* only render when modalopen true  */}
            {isModalOpen && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to remove this spot?</p>

                        <div className="modal-buttons">

                            <button className="delete-button" onClick={confirmDelete}>
                                Yes (Delete Spot)
                            </button>

                            <button className="cancel-button" onClick={cancelDelete}>
                                No (Keep Spot)
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default ManageSpots;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allUserSpots } from '../../store/spots';
import EditSpotModal from './EditSpotModal';
import DeleteSpotModal from './DeleteSpotModal';
import { Link } from 'react-router-dom';
import './index.css';

function UserSpots(){
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allspots);

    useEffect(() => {
        dispatch(allUserSpots())
    }, [dispatch])

    return (
        <div className='managespot-div'>
            {!sessionUser &&
                <div>
                    <h2>Please login to see content ahead</h2>
                </div>
            }
            {sessionUser &&
                <div className='managespot-page'>
                    <div className='managespot-welcome'>
                        <h2>Hello, {sessionUser.firstName} </h2>
                    </div>
                    {spots.length > 0 && spots.map(spot =>
                        <div key={spot.id} className='managespot-container'>
                            <div>
                                <img src={spot.previewImage} style={{height:"200px"}}></img>
                            </div>
                            <div className='managespot-name'>
                                <div>
                                    <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
                                </div>
                                <div className='managespot-change'>
                                    <div className='update'>
                                        <EditSpotModal spot={spot}/>
                                    </div>
                                </div>
                                <div className='delete'>
                                    <DeleteSpotModal spot={spot}/>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}


export default UserSpots

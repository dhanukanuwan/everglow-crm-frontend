import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshUserTokenQuery } from '../../services/auth/authService';
import { RootState } from "../../features/lib/types";
import { logout, setRefreshToken } from '../../features/auth/authSlice';

const SiteHeader = ({title}: {title: string}) => {

    const [ showProfileDropdown, setShowProfileDropdown] = useState(false);

    //const { userInfo } = useSelector( (state: RootState) => state.auth );
    const dispatch = useDispatch();

    const { data, isFetching } = useRefreshUserTokenQuery('userDetails', {
        // Refresh token every 30 mins.
        pollingInterval: 1800000,
    });

    useEffect(() => {
        if (data && !isFetching) dispatch(setRefreshToken(data))
    }, [data, dispatch, isFetching])

    return(
        <div className="header-wrap bg-white px-4 py-2 border-bottom">
            <div className="d-flex">
                <div className="flex-grow-1">
                    <h1 className="mb-0 h3">{title}</h1>
                </div>

                <div className="ps-3">

                    <div className="dropdown profile-dropdown">
                        <button 
                            type="button"
                            className={`btn btn-secondary rounded-circle ${ showProfileDropdown ? 'show' : ''}`}
                            data-bs-toggle="dropdown"
                            aria-expanded={`${ showProfileDropdown ? 'true' : 'false'}`}
                            onClick={() => setShowProfileDropdown( !showProfileDropdown )}>
                                DG
                        </button>
                        <ul className={`dropdown-menu position-absolute end-0 bg-white rounded-0 ${ showProfileDropdown ? 'show' : ''}`} style={{width: '15rem'}}>
                            <li className="border-bottom border-gray-bg px-3" onClick={() => setShowProfileDropdown( false )}>
                                <Link to={'/'} className="d-flex text-decoration-none py-2 text-dark-text">
                                    <span className="icon-user"></span>
                                    <span className="ms-2">Profile</span>
                                </Link>
                            </li>
                            <li className="px-3" onClick={() => setShowProfileDropdown( false )}>
                                <button type="button" className="btn btn-link text-decoration-none py-2 px-0 text-dark-text d-flex w-100" onClick={() => dispatch({type: "LOGOUT_RESET"})}>
                                    <span className="icon-logout"></span>
                                    <span className="ms-2">Log out</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default SiteHeader;
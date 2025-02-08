import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshUserTokenQuery } from '../services/auth/authService';
import { RootState } from "../features/lib/types";
import { logout, setRefreshToken } from '../features/auth/authSlice';

const Dashboard = () => {

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
        <div className="dashboard-wrap">
            <h1>Dashboard</h1>
            <button type="button" className="btn btn-primary" onClick={() => dispatch( logout() )}>Log out</button>
        </div>
    );
}

export default Dashboard;
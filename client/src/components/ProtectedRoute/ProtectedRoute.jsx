import React, { useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { isAuthenticated } from '../../utils/authUtils';

import { useDispatch, useSelector } from 'react-redux';

import { fetchUserInfo } from '../../redux/userSlice.js';



const ProtectedRoute = ({ children, ...rest }) => {

    const location = useLocation();

    const redirectTo = '/login';

    const isAuth = isAuthenticated();

    const hasLoggedOut = useSelector(state => state.logout.hasLoggedOut);

    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();



    useEffect(() => {

        if (isAuth) {

            if (!user) {

                dispatch(fetchUserInfo());

            }

        }

    }, [isAuth, location, user]);



    return isAuth ? (

        <div className='page'>

            {React.cloneElement(children, { ...rest })}

        </div>

    ) : (

        <>

            {

                hasLoggedOut ?

                    <Navigate to={redirectTo} />

                    :

                    <Navigate to={redirectTo} replace state={{ from: location }} />

            }

        </>

    );

};



export default ProtectedRoute;
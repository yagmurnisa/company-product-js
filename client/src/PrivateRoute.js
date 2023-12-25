import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { UserContext } from "./context/UserState";

export const PrivateRoute = ({component: Component}) => {
    const {token} = useContext(UserContext);

    return token ? <Component /> : <Navigate to="/login"/>
};

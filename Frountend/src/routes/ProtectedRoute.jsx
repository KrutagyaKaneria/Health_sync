import React, { Children } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'



const ProtectedRoute = ({Children,allowedRoles}) => {
    const {token,role} = useContext(authContext);

    const isAllowed = allowedRoles.includes(role);
    const accessibleRoute = token && isAllowed ? Children : <Navigate to="/login" replace={true} />

  return accessibleRoute;
}

export default ProtectedRoute

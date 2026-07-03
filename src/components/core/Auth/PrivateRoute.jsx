import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {token} = useSelector((state) => state.auth)

    if (typeof token === "string" && token.trim().length > 0) {
        return children
    }else{
        return <Navigate to="/login"/>
    }
  
}

export default PrivateRoute
// const {token} = useSelector((state) => state.auth)

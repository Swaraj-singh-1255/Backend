import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const Protected = ({children}) => {

    const {
        user, loading
    } = useAuth()
    const navigate = useNavigate

    if(loading) {
        return <h1>Loading.......</h1>
    }

    if (!loading && !user) {
        return <navigate to="/login" />
    }

  return children
}
export default Protected

import React from 'react'
import { Link } from 'react-router-dom'
import './Title.scss'

function Title() {
    return (
        <div>
            <h1>Title page</h1>
            <Link to="/registration" >Registration</Link>
            <br/>
            <Link to="/login" >Login</Link>
        </div>
    )
}

export default Title

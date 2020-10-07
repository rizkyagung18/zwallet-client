import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Check from '../../icons/check.svg'

const style = {
    right: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        padding: "120px 150px 150px 40px"
    },
    button: {
        width: '433px'
    }
}

class AuthSuccess extends Component {
    render() {
        return (
        <div style={style.right} className="right">
            <div className="status bg-success">
                <img src={Check} alt="" />
            </div>
            <div className="information">
                <span className="info">Your PIN Was Successfully Created</span>
            </div>
            <div className="desc-right">
                <p className="text desc">Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!</p>
            </div>
            <div className="button">
                <Link to="/auth/login"><button style={style.button} className="auth-primary-btn mw-100">Login Now</button></Link>
            </div>
        </div>
        )
    }
}

export default AuthSuccess
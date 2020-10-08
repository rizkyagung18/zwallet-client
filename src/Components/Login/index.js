import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Mail from '../../icons/mail.svg'
import MailActive from '../../icons/mail-active.svg'
import Lock from '../../icons/lock.svg'
import LockActive from '../../icons/lock-active.svg'
import Eye from '../../icons/eye-crossed.svg'
import axios from 'axios'

const style = {
    right: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        padding: "120px 150px 150px 40px"
    }
}

class Login extends Component {
    constructor(props) {
        super()
        this.state = {
            email: '',
            password: '',
            isEmailActive: false,
            isPasswordActive: false,
            isEyeActive: false,
            isLogin: false,
            token_id: '',
            failedLogin: '',
            isLoading: false
        }

        this.fakeLogin = this.fakeLogin.bind(this)
    }

    async fakeLogin() {
        try {
            if(this.state.email && this.state.password) {
                const res = await axios.get(`https://whispering-falls-27902.herokuapp.com/users/login`, {
                            params: {
                                email: this.state.email
                            }
                        })
                const id = res.data.data[0].token_id
                if(id) {
                    this.setState({ token_id: id})
                    this.setState({ isLogin: true })
                    this.props.history.push(`/home/${id}`)
                }
            } else {
                this.setState({ failedLogin: 'Email and Password must be filled'})
            }
        } catch (error) {
            this.setState({ failedLogin: 'Email or Password Invalid'})
        }
    }

    render() {
        return (
            <div id="right" style={style.right} className="right">
                <div className="bold big start">Start Accessing Banking Needs
                    With All Devices and All Platforms
                    With 30.000+ Users
                </div>
                <div className="text desc-right">
                    Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
                </div>
                <div className="email input mb-5">
                    <img src={this.state.isEmailActive ? MailActive : Mail} alt="mail" className="mail"/>
                    <input onFocus={() => this.setState({ isEmailActive: true})} onBlur={() => this.setState({ isEmailActive: false})} onChange={(e) => this.setState({ email:e.target.value })} value={this.state.email} type="email" placeholder="Enter your e-mail" autoComplete="off" />
                </div>
                <div className="password input">
                    <img src={this.state.isPasswordActive ? LockActive : Lock} alt="lock" className="lock" />
                    <input onFocus={() => this.setState({ isPasswordActive: true})} onBlur={() => this.setState({ isPasswordActive: false})} onChange={(e) => this.setState({ password:e.target.value })} value={this.state.password} type={this.state.isEyeActive ? 'text' : 'password'} placeholder="Enter your password" autoComplete="off" />
                    <img onClick={() => this.setState({ isEyeActive: !this.state.isEyeActive })} src={Eye} className="eye-auth" alt="" />
                </div>
                <div className="forgot d-flex justify-content-end font-weight-bold">
                    <Link to="/auth/forgot">Forgot password?</Link>
                </div>
                {this.state.failedLogin ? <p className="text-danger text-center">{this.state.failedLogin}</p> : ''}
                <div className="button">
                    <button onClick={this.fakeLogin} className={this.state.email && this.state.password ? 'auth-primary-btn' : 'auth-grey-btn'}>Login</button>
                </div>
                <div className="sign-up">
                    <p className="text">Don’t have an account? Let’s <Link to="/auth/register" className="bold primary">Sign Up</Link></p>
                </div>
        </div>
        )
    }
}

export default Login
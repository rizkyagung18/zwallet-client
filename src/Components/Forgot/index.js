import React, { Component } from 'react'
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

class Forgot extends Component {
    constructor(props) {
        super()
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            isLockActive: false,
            isLockRepeatActive: false,
            isEmailActive: false,
            isEyeActive: false,
            isEyeRepeatActive: false,
            isEmailFilled: false,
            messageFailed: ''
        }

        this.changePassword = this.changePassword.bind(this)
    }

    async changePassword() {
        const res = await axios.get('https://whispering-falls-27902.herokuapp.com/users/login', {
            params: {
                email: this.state.email
            }
        })
        if(res.data.data.length !== 0) {
            const id = res.data.data[0].token_id
            const update = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${id}`, {
                password: this.state.password
            })
            if(update.data.rowsAffected) {
                this.props.history.push('/auth/login')
            }
        } else {
            this.setState({ isEmailFilled: false })
            this.setState({ messageFailed: 'Invalid Email' })
        }
        
    }

    renderNewPassword() {
        return (
            <>
                <div className="text desc-right">
                    Now you can create a new password for your Zwallet account. Type your password twice so we can confirm your new passsword.
                </div>
                <div className="password input">
                    <img src={this.state.isLockActive ? LockActive : Lock} alt="lock" className="lock" />
                    <input onChange={(e) => this.setState({ password:e.target.value })} value={this.state.password} type={this.state.isEyeActive ? 'text' : 'password'} placeholder="Create new password" autoComplete="off" />
                    <img onClick={() => this.setState({ isEyeActive: !this.state.isEyeActive })} onFocus={() => this.setState({ isLockActive: true})} onBlur={() => this.setState({ isPasswordActive: false})} src={Eye} className="eye-auth" alt="" />
                </div>
                <div className="password input">
                    <img src={this.state.isLockRepeatActive ? LockActive : Lock} alt="lock" className="lock" />
                    <input onChange={(e) => this.setState({ repeatPassword:e.target.value })} value={this.state.repeatPassword} type={this.state.isEyeRepeatActive ? 'text' : 'password'} placeholder="Repeat new password" autoComplete="off" />
                    <img onClick={() => this.setState({ isEyeRepeatActive: !this.state.isEyeRepeatActive })} onFocus={() => this.setState({ isLockRepeatActive: true})} onBlur={() => this.setState({ isLockRepeatActive: false})} src={Eye} className="eye-auth" alt="" />
                </div>
                <div className="button">
                    <button onClick={this.changePassword} className={this.state.password && this.state.password === this.state.repeatPassword ? 'auth-primary-btn' : 'auth-grey-btn'}>Reset Password</button>
                </div>
            </>
        )
    }

    renderEmail() {
        return (
            <>
                <div className="text desc-right mb-1">
                    To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
                </div>
                <div className="email input">
                    <img src={this.state.isEmailActive ? MailActive : Mail} alt="mail" className="mail"/>
                    <input onFocus={() => this.setState({ isEmailActive: true})} onBlur={() => this.setState({ isEmailActive: false})} onChange={(e) => this.setState({ email:e.target.value })} value={this.state.email} type="email" placeholder="Enter your e-mail" autoComplete="off" />
                </div>
                <div className="button">
                        <button onClick={() => this.state.email ? this.setState({ isEmailFilled: true }) : this.setState({ messageFailed: 'Email must be filed'}) } className={this.state.email ? 'auth-primary-btn' : 'auth-grey-btn'}>Confirm</button>
                </div>
                { this.state.messageFailed ? <p className="text-danger text-center med">{this.state.messageFailed}</p> : ''}
            </>
        )
    }

    render() {
        return (
            <div style={style.right} className="right">
                <div className="bold big start mb-1">
                    Did You Forgot Your Password?
                    Don’t Worry, You Can Reset Your
                    Password In a Minutes.
                </div>
                {this.state.isEmailFilled ? this.renderNewPassword() : this.renderEmail()}
        </div>
        )
    }
}

export default Forgot
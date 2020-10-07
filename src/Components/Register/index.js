import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Person from '../../icons/person.svg'
import PersonActive from '../../icons/person-active.svg'
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

class Register extends Component {
    constructor(props) {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            pin: ['', '', '', '', '', ''],
            isNameActive: false,
            isEmailActive: false,
            isPasswordActive: false,
            isEyeActive: false,
            isFormFilled: false,
            isSuccess: false
        }

        this.handleInput = this.handleInput.bind(this)
        this.handleFormFilled = this.handleFormFilled.bind(this)
        this.register = this.register.bind(this)
    }

    handleInput(val, index) {
        if(parseInt(val) >= 0 || val === '') {
            let pin = [...this.state.pin]
            pin[index] = val
            this.setState({ pin })
        } else {
            let pin = [...this.state.pin]
            this.setState({ pin })
        }
    }

    handleFormFilled() {
        if(this.state.username && this.state.email && this.state.password) {
            this.setState({ isFormFilled: true })
        }
    }

    async register() {
        if(this.state.pin.every((item) => item.length)) {
            const res = await axios.post('https://whispering-falls-27902.herokuapp.com/users/register', {
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                pin: parseInt(this.state.pin.join(''))
            })

            if(res.data.rowsAffected) {
                this.setState({ isSuccess: true })
            }
        }
    }

    renderForm() {
        return (
            <>
                <div className="users input mb-5">
                    <img src={this.state.isNameActive ? PersonActive : Person} alt="person" className="person"/>
                    <input onFocus={() => this.setState({ isNameActive: true})} onBlur={() => this.setState({ isNameActive: false})} onChange={(e) => this.setState({ username:e.target.value })} value={this.state.username} type="text" placeholder="Enter your username" autoComplete="off" />
                </div>
                <div className="email input mb-5">
                    <img src={this.state.isEmailActive ? MailActive : Mail} alt="mail" className="mail"/>
                    <input onFocus={() => this.setState({ isEmailActive: true})} onBlur={() => this.setState({ isEmailActive: false})} onChange={(e) => this.setState({ email:e.target.value })} value={this.state.email} type="email" placeholder="Enter your e-mail" autoComplete="off" />
                </div>
                <div className="password input mb-5">
                    <img src={this.state.isPasswordActive ? LockActive : Lock} alt="lock" className="lock" />
                    <input onFocus={() => this.setState({ isPasswordActive: true})} onBlur={() => this.setState({ isPasswordActive: false})} onChange={(e) => this.setState({ password:e.target.value })} value={this.state.password} type={this.state.isEyeActive ? 'text' : 'password'} placeholder="Enter your password" autoComplete="off" />
                    <img onClick={() => this.setState({ isEyeActive: !this.state.isEyeActive })} src={Eye} className="eye-auth" alt="eye" />
                </div>
                <div className="button">
                    <button onClick={this.handleFormFilled} className={this.state.username && this.state.email && this.state.password ? 'auth-primary-btn' : 'auth-grey-btn'}>Sign Up</button>
                </div>
                <div className="sign-up">
                    <p className="text">Already have an account? Let’s <Link to="/auth/login" className="bold primary">Login</Link></p>
                </div>
            </>
        )
    }

    renderPin() {
        return (
            <>
                <form className="pin">
                    <input type="text" maxLength="1" onChange={(e) => this.handleInput(e.target.value, 0)} value={this.state.pin[0]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleInput(e.target.value, 1)} value={this.state.pin[1]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleInput(e.target.value, 2)} value={this.state.pin[2]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleInput(e.target.value, 3)} value={this.state.pin[3]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleInput(e.target.value, 4)} value={this.state.pin[4]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleInput(e.target.value, 5)} value={this.state.pin[5]}/>
                </form>
                <div className="button">
                    <button onClick={this.register} className={this.state.pin.every((item) => item.length) ? 'auth-primary-btn' : 'auth-grey-btn'}>Confirm</button>
                </div>
            </>
        )
    }

    render() {
        if(this.state.isSuccess) {
            return <Redirect to="/auth/success" />
        } else {
            return (
                <div style={style.right} className="right">
                    <div className="bold big start">Start Accessing Banking Needs
                        With All Devices and All Platforms
                        With 30.000+ Users
                    </div>
                    <div className="text desc-right">
                        Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
                    </div>
                    {this.state.isFormFilled ? this.renderPin() : this.renderForm()}
                </div>
            )
        }
    }
}

export default Register
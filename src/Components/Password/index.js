import React, { Component } from 'react'
import Lock from '../../icons/lock.svg'
import LockActive from '../../icons/lock-active.svg'
import Eye from '../../icons/eye-crossed.svg'
import axios from 'axios'

const style = {
    buttonPrimary: {
        backgroundColor: "#6379F4",
        borderRadius: "12px",
        color: '#FFFFFF',
        width: '433px',
        border: 'none'
    },
    buttonGrey: {
        backgroundColor: "#DADADA",
        borderRadius: "12px",
        color: '#88888F',
        width: '433px',
        border: 'none'
    }
}

class Password extends Component {
    constructor(props) {
        super()
        this.state = {
            currPassword: '',
            newPassword: '',
            repeatNewPassword: '',
            currActive: false,
            newActive: false,
            repeatActive: false
        }

        this.onCurrentInput = this.onCurrentInput.bind(this)
        this.onNewInput = this.onNewInput.bind(this)
        this.onRepeatInput = this.onRepeatInput.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }

    onCurrentInput(e) {
        this.setState({ currPassword: e.target.value})
    }

    onNewInput(e) {
        this.setState({ newPassword: e.target.value})
    }

    onRepeatInput(e) {
        this.setState({ repeatNewPassword: e.target.value})
    }

    async changePassword() {
        if(this.state.currPassword && this.state.newPassword && this.state.repeatNewPassword === this.state.newPassword) {
            const res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
                password: this.state.newPassword
            })

            if(res.status === 201) {
                this.props.history.push(`/profile/${this.props.data.id}`)
            }
        }
    }

    render() {
        return (
            <div className="content-main">
                <p className="text bold text-dark mb-4">Change Password</p>
                <p style={{width:'334px'}} className="text-muted mb-5">You must enter your current password and then type your new password twice.</p>
                <div style={{padding: '15px'}} className="d-flex flex-column justify-content-center align-items-center">
                    <div className="notes bg-transparent">
                        <img className="edit" src={this.state.currActive ? LockActive : Lock} alt="" />
                        <img className="eye" src={Eye} alt="" />
                        <input onFocus={() => this.setState({ currActive: true })} onBlur={() => this.setState({ currActive: false })} onChange={this.onCurrentInput} value={this.state.currPassword} className="note bg-transparent" type="password" placeholder="Current password" />
                    </div>
                    <div className="notes bg-transparent">
                        <img className="edit" src={this.state.newActive ? LockActive : Lock} alt="" />
                        <img className="eye" src={Eye} alt="" />
                        <input onFocus={() => this.setState({ newActive: true })} onBlur={() => this.setState({ newActive: false })} onChange={this.onNewInput} value={this.state.newPassword} className="note bg-transparent" type="password" placeholder="New password" />
                    </div>
                    <div className="notes bg-transparent">
                        <img className="edit" src={this.state.repeatActive ? LockActive : Lock} alt="" />
                        <img className="eye" src={Eye} alt="" />
                        <input onFocus={() => this.setState({ repeatActive: true })} onBlur={() => this.setState({ repeatActive: false })} onChange={this.onRepeatInput} value={this.state.repeatNewPassword} className="note bg-transparent" type="password" placeholder="Repeat new password" />
                    </div>
                    <button onClick={this.changePassword} style={this.state.currPassword && this.state.newPassword && this.state.repeatNewPassword === this.state.newPassword ? style.buttonPrimary : style.buttonGrey} className="py-3">Change Password</button>
                </div>
            </div>
        )
    }
}

export default Password
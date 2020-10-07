import React, { Component } from 'react'
import Trash from '../../icons/trash.svg'
import Phone from '../../icons/phone.svg'
import PhoneActive from '../../icons/phone-active.svg'
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

class User extends Component {
    constructor(props) {
        super()
        this.state = {
            isEditPhone: false,
            phone: props.data.phone,
            newPhone: '',
            isPhoneActive: false
        }

        this.handleInputPhone = this.handleInputPhone.bind(this)
        this.deletePhone = this.deletePhone.bind(this)
        this.addPhone = this.addPhone.bind(this)
    }

    splitPhone(phone) {
        if(phone) {
            const newPhone = phone.split('').map((item, index) => {
                if(index === 2 || index === 6) {
                    return item + '-'
                } else {
                    return item
                }
            })
    
            return newPhone
        }
    }

    handleInputPhone(e) {
        this.setState({ newPhone: e.target.value})
    }

    async deletePhone() {
        const res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
            phone: ''
        })
        if(res) {
            window.location.reload()
        }
    }

    async addPhone() {
        if(this.state.newPhone.length >= 11) {
            const res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
                phone: this.state.newPhone
            })
            if(res) {
                window.location.reload()
                this.setState({ isEditPhone: false })
            }
        }
    }

    renderInfo() {
        return (
            <>
                <p className="text bold text-dark mb-4">Personal Information</p>
                <p style={{width:'334px'}} className="text-muted mb-5">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
                <div style={{padding: '15px'}} className="label d-flex flex-column justify-content-between">
                    <p className="med text-muted mb-2">First Name</p>
                    <p className="bold big mb-0">{this.props.data.firstName}</p>
                </div>
                <div style={{padding: '15px'}} className="label d-flex flex-column justify-content-between">
                    <p className="med text-muted mb-2">Last Name</p>
                    <p className="bold big mb-0">{this.props.data.lastName}</p>
                </div>
                <div style={{padding: '15px'}} className="label d-flex flex-column justify-content-between">
                    <p className="med text-muted mb-2">Verified E-mail</p>
                    <p className="bold big mb-0">{this.props.data.email}</p>
                </div>
                <div style={{padding: '15px'}} className="label d-flex justify-content-between align-items-center">
                    <div>
                        <p className="med text-muted mb-2">Phone Number</p>
                        <p className="bold big mb-0">+62 {this.splitPhone(this.state.phone)}</p>
                    </div>
                    <div>
                        <p onClick={() => this.setState({ isEditPhone: true })} style={{cursor: 'pointer'}} className="med primary">Manage</p>
                    </div>
                </div>
            </>
        )
    }

    renderManagePhone() {
        return(
            <>
                <p className="text bold text-dark mb-4">Manage Phone Number</p>
                <p style={{width:'334px'}} className="text-muted mb-5">You can only delete the phone number and then you must add another phone number.</p>
                <div style={{padding: '15px'}} className="label d-flex justify-content-between align-items-center">
                    <div>
                        <p className="med text-muted mb-2">Primary</p>
                        <p className="bold big mb-0">+62 {this.splitPhone(this.state.phone)}</p>  
                    </div>
                    <div>
                        <img style={{cursor: 'pointer'}} onClick={this.deletePhone} src={Trash} alt="trash" />
                    </div>
                </div>
            </>
        )
    }

    renderAddPhone() {
        return(
            <>
                <p className="text bold text-dark mb-4">Add Phone Number</p>
                <p style={{width:'334px'}} className="text-muted mb-5">Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
                <div style={{padding: '15px'}} className="d-flex flex-column justify-content-center align-items-center">
                    <div className="notes bg-transparent">
                        <img className="edit" src={this.state.isPhoneActive ? PhoneActive : Phone} alt="" />
                        <input onFocus={() => this.setState({ isPhoneActive:true })} onBlur={() => this.setState({ isPhoneActive:false })} onChange={this.handleInputPhone} value={this.state.newPhone} className="note bg-transparent" type="text" placeholder="Enter your phone number" />
                    </div>
                    <button onClick={this.addPhone} className="py-3" style={this.state.newPhone ? style.buttonPrimary : style.buttonGrey}>Add Phone Number</button>
                </div>
            </>
        )
    }

    render() {
        return (
            <div className="content-main">
                {this.state.isEditPhone ? this.state.phone ? this.renderManagePhone() : this.renderAddPhone() : this.renderInfo() }
            </div>
        )
    }
}

export default User
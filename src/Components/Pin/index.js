import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router'

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

class Pin extends Component {
    constructor(props) {
        super()
        this.state = {
            currPin: ['', '', '', '', '', ''],
            pin: ['', '', '', '', '', ''],
            isValidPIN: false,
            isChangedPIN: false,
            messageFailed: ''
        }

        this.changePIN = this.changePIN.bind(this)
        this.checkPIN = this.checkPIN.bind(this)
    }

    handleCurrPIN(val, index) {
        if(parseInt(val) >= 0 || val === '') {
            let currPin = [...this.state.currPin]
            currPin[index] = val
            this.setState({ currPin })
        }
    }

    handleNewPIN(val, index) {
        if(parseInt(val) >= 0 || val === '') {
            let pin = [...this.state.pin]
            pin[index] = val
            this.setState({ pin })
        }
    }

    async changePIN() {
        if(this.state.pin.every(item => item.length !== 0)) {
            let pin = this.state.pin.join('')
            const res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
                pin
            })

            if(res) {
                this.setState({ isChangedPIN: true })
            }
        }
    }

    checkPIN() {
        if(this.state.currPin.every(item => item.length !== 0)) {
            const pin = this.state.currPin.join('')
            console.log(pin)
            console.log(this.props.data.pin === pin)
            if(this.props.data.pin === pin) {
                this.setState({ isValidPIN: true })
            } else {
                this.setState({ messageFailed: 'Invalid PIN'})
                this.setState({ currPin: ['', '', '', '', '', '']})
            }
        }
    }

    renderCurrPIN() {
        return (
            <>
                <p style={{width:'334px'}} className="text-muted mb-5">Enter your current 6 digits Zwallet PIN below to continue to the next steps.</p>
                <div style={{padding: '15px'}} className="d-flex flex-column justify-content-center align-items-center">
                <form className="pin">
                    <input type="text" maxLength="1" onChange={(e) => this.handleCurrPIN(e.target.value, 0)} value={this.state.currPin[0]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleCurrPIN(e.target.value, 1)} value={this.state.currPin[1]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleCurrPIN(e.target.value, 2)} value={this.state.currPin[2]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleCurrPIN(e.target.value, 3)} value={this.state.currPin[3]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleCurrPIN(e.target.value, 4)} value={this.state.currPin[4]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleCurrPIN(e.target.value, 5)} value={this.state.currPin[5]}/>
                </form>
                <p className="text-danger med">{this.state.messageFailed}</p>
                <button onClick={this.checkPIN} style={this.state.currPin.every(item => item.length !== 0) ? style.buttonPrimary : style.buttonGrey} className="py-3">Continue</button>
                </div>
            </>
        )
    }

    renderNewPIN() {
        return (
            <>
                <p style={{width:'334px'}} className="text-muted mb-5">Type your new 6 digits security PIN to use in Zwallet.</p>
                <div style={{padding: '15px'}} className="d-flex flex-column justify-content-center align-items-center">
                <form className="pin">
                    <input type="text" maxLength="1" onChange={(e) => this.handleNewPIN(e.target.value, 0)} value={this.state.pin[0]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleNewPIN(e.target.value, 1)} value={this.state.pin[1]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleNewPIN(e.target.value, 2)} value={this.state.pin[2]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleNewPIN(e.target.value, 3)} value={this.state.pin[3]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleNewPIN(e.target.value, 4)} value={this.state.pin[4]}/>
                    <input type="text" maxLength="1" onChange={(e) => this.handleNewPIN(e.target.value, 5)} value={this.state.pin[5]}/>
                </form>
                    <button onClick={this.changePIN} style={this.state.pin.every(item => item.length !== 0) ? style.buttonPrimary : style.buttonGrey} className="py-3">Continue</button>
                </div>
            </>
        )
    }

    render() {
        if(this.state.isChangedPIN) {
            return <Redirect to={{ pathname: `/profile/${this.props.data.id}`}}/>   
        } else {
            return (
                <div className="content-main">
                    <p className="text bold text-dark mb-4">Change PIN</p>
                    {this.state.isValidPIN ? this.renderNewPIN() : this.renderCurrPIN()}
                </div>
            )
        }
    }
}

export default Pin
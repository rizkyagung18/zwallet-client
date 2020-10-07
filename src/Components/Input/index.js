import axios from 'axios'
import React, { Component } from 'react'
import './Confirm.css'
import './Input.css'
import { Modal, Button } from 'react-bootstrap'
import Edit from '../../icons/edit.svg'
import EditActive from '../../icons/edit-active.svg'
import Success from '../../icons/success.svg'
import Failed from '../../icons/failed.svg'
import { Link } from 'react-router-dom'

class Input extends Component {
    constructor(props) {
        super()
        this.state = {
            amount: '',
            note: '',
            isNoteActive: false,
            isContinue: false,
            modalShow: false,
            dataReceiver: [],
            pin: ['', '', '', '', '', ''],
            wrongPin: '',
            isStatus: false,
            isSuccess: false,
            isFailed: false
        }

        this.handleInputAmount = this.handleInputAmount.bind(this)
        this.handleInputNotes = this.handleInputNotes.bind(this)
    }

    async componentDidMount() {
        const path = window.location.href.split('/')
        const id = path[path.length-1]
        const res = await axios(`https://whispering-falls-27902.herokuapp.com/users/search/receiver/${id}}`)
        this.setState({ dataReceiver: res.data.data[0]})
    }

    handleInputAmount(e) {
        this.setState({ amount: e.target.value})
    }

    handleInputNotes(e) {
        this.setState({ note: e.target.value})
    }

    handlePIN = (val, index) => {
        if(parseInt(val) >= 0 || val === '') {
            let pin = [...this.state.pin]
            pin[index] = val
            this.setState({ pin })
        }
      }
  
      handleClick = async () => {
        if(this.state.pin.every(item => item.length !== 0)) {
          const pin = this.state.pin.join('')
          if(this.props.data.pin === pin) {
            const res = await axios.post(`https://whispering-falls-27902.herokuapp.com/transfer/${this.state.dataReceiver.user_id}`, {
              amount: this.state.amount,
              note: this.state.note,
              id_sender: this.props.data.id
            })
  
            this.setState({ isStatus: true })
            if(res.status === 201) {
              this.setState({ isSuccess: true })
            } else {
                this.setState({ isFailed: true })
            }
          } else {
              this.setState({ wrongPin: 'Wrong PIN' })
          }
        } else {
            this.setState({ wrongPin: 'PIN must be filled'})
        }
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

    getDate() {
        const date = new Date()
        let month = date.getMonth()
        switch(month) {
            case 0:
                month = "January"
                break
            case 1:
                month = "February"
                break
            case 2:
                month = "March"
                break
            case 3:
                month = "April"
                break
            case 4:
                month = "May"
                break
            case 5:
                month = "June"
                break
            case 6:
                month = "July"
                break
            case 7:
                month = "August"
                break
            case 8:
                month = "September"
                break
            case 9:
                month = "October"
                break
            case 10:
                month = "November"
                break
            case 11:
                month = "December"
                break
            default:
                month = null
                break
        }
        const day = date.getDate()
        const year = date.getFullYear()
        const hour = date.getHours()
        const minute = date.getMinutes()

        return `${month} ${day}, ${year} - ${hour.toString().length === 1 ? "0" + hour : hour}.${minute.toString().length === 1 ? "0" + minute : minute}`
    }

    renderInput() {
        const { name, photo, phone } = this.state.dataReceiver
        return (
            <>
                <div className="where">
                    <p className="text bold">Transfer Money</p>
                    <div className="profile label">
                        <div className="avatar">
                            <img style={{borderRadius: '10px'}} width="70px" height="70px" src={photo} alt="" />
                        </div>
                        <div className="info">
                            <p className="name text bold">{name}</p>
                            <div className="text-muted med">+62 {this.splitPhone(phone)}</div>
                        </div>
                    </div>
                </div>
                <div className="med type">
                    Type the amount you want to transfer and then press continue to the next steps.
                </div>
                <form>
                    <div className="input bg-transparent">
                        <input onInput={this.handleInputAmount} value={this.state.amount} className="amount primary bg-transparent" type="text" placeholder="0.00" />
                        <span className="cash bold med">Rp{this.props.data.balance} Available</span>
                    </div>
                    <div className="notes bg-transparent">
                        <img className="edit" src={this.state.isNoteActive ? EditActive : Edit} alt="" />
                        <input onFocus={() => this.setState({ isNoteActive: true })} onBlur={() => this.setState({ isNoteActive: false })} onChange={this.handleInputNotes} value={this.state.note} className="note bg-transparent" type="text" placeholder="Add some notes" />
                    </div>
                    <div className="confirm">
                        <button onClick={() => this.state.amount ? this.setState({ isContinue: true }) : this.setState({ isContinue: false })} type="submit" className="btn-primary">Continue</button>
                    </div>
                </form>
            </>
        )
    }

    renderContinue() {
        const { name, photo, phone } = this.state.dataReceiver     
        return (
            <>
                <div className="into">
                    <p className="text bold">Transfer To</p>
                    <div className="profile label">
                        <div className="avatar">
                            <img style={{borderRadius: '10px'}}
                             width="70px" height="70px" src={photo} alt="" />
                        </div>
                        <div className="info">
                            <p className="name text bold">{name}</p>
                            <div className="text-muted med">+62 {this.splitPhone(phone)}</div>
                        </div>
                    </div>
                </div>
                <div className="details">
                    <p className="text bold">Details</p>
                    <div className="label">
                        <div className="title med">Amount</div>
                        <div className="desc big bold">Rp{this.state.amount}</div>
                    </div>
                    <div className="label">
                        <div className="title med">Balance Left</div>
                        <div className="desc big bold">Rp{this.props.data.balance - this.state.amount}</div>
                    </div>
                    <div className="label">
                        <div className="title med">Date & Time</div>
                        <div className="desc big bold">{this.getDate()}</div>
                    </div>
                    <div className="label">
                        <div className="title med">Notes</div>
                        <div className="desc big bold">{this.state.note}</div>
                    </div>
                </div>
                <div className="confirm">
                    <button onClick={() => this.setState({ modalShow: true})} className="btn-primary" style={{float: 'right'}}>Continue</button>
                </div>
                <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Enter PIN to Transfer
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p className="med text-modal">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                    <form className="pin">
                        <input onChange={(e) => this.handlePIN(e.target.value, 0)} value={this.state.pin[0]} type="text" maxLength="1" />
                        <input onChange={(e) => this.handlePIN(e.target.value, 1)} value={this.state.pin[1]} type="text" maxLength="1"/>
                        <input onChange={(e) => this.handlePIN(e.target.value, 2)} value={this.state.pin[2]} type="text" maxLength="1"/>
                        <input onChange={(e) => this.handlePIN(e.target.value, 3)} value={this.state.pin[3]} type="text" maxLength="1"/>
                        <input onChange={(e) => this.handlePIN(e.target.value, 4)} value={this.state.pin[4]} type="text" maxLength="1"/>
                        <input onChange={(e) => this.handlePIN(e.target.value, 5)} value={this.state.pin[5]} type="text" maxLength="1"/>
                    </form>
                    <p className="text-center text-danger">{this.state.wrongPin}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClick}>Continue</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    renderSuccess() {
        const { name, photo, phone } = this.state.dataReceiver
        return (
            <>
                <div style={{margin: 'auto', marginBottom: '30px'}}>
                    <img src={Success} alt="" />
                </div>
                <span className="bold logo text-center">Transfer Success</span>
                <div className="details">
                    <div className="label">
                        <div className="title bold med">Amount</div>
                        <div className="desc big bold">Rp{this.state.amount}</div>
                    </div>
                    <div className="label">
                        <div className="title bold med">Balance Left</div>
                        <div className="desc big bold">Rp{this.props.data.balance - this.state.amount}</div>
                    </div>
                    <div className="label">
                        <div className="title bold med">Date & Time</div>
                        <div className="desc big bold">{this.getDate()}</div>
                    </div>
                    <div className="label">
                        <div className="title bold med">Notes</div>
                        <div className="desc big bold">{this.state.note}</div>
                    </div>
                </div>
                <div className="into">
                    <p className="text bold">Transfer To</p>
                    <div className="profile label">
                        <div className="avatar">
                            <img style={{borderRadius: '10px'}}
                             width="70px" height="70px" src={photo}  alt="" />
                        </div>
                        <div className="info">
                            <p className="name text bold">{name}</p>
                            <div className="text-muted med">+62 {this.splitPhone(phone)}</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="small-btn-light-primary">
                        <img alt="share" />
                    </button>
                    <button className="big-btn-light-primary text primary bold">
                        Download PDF
                    </button>
                    <Link to="/home/1">
                        <button className="med-btn-primary">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </>
        )
    }

    renderFailed() {
        const { name, photo, phone } = this.state.dataReceiver
        return (
            <>
                <div style={{margin: 'auto', marginBottom: '30px'}} className="status bg-danger">
                    <img src={Failed} alt="" />
                </div>
                <span className="bold logo text-center">Transfer Failed</span>
                <p className="text-danger text-center">We can’t transfer your money at the moment, we recommend you to check your internet connection and try again.</p>
                <div className="details">
                    <div className="label">
                        <div className="title bold med">Amount</div>
                        <div className="desc big bold">Rp{this.state.amount}</div>
                    </div>
                    <div className="label">
                        <div className="title bold med">Balance Left</div>
                        <div className="desc big bold">Rp{this.props.data.balance - this.state.amount}</div>
                    </div>
                    <div className="label">
                        <div className="title bold med">Date & Time</div>
                        <div className="desc big bold">{this.getDate()}</div>
                    </div>
                    <div className="label">
                        <div className="title bold med">Notes</div>
                        <div className="desc big bold">{this.state.note}</div>
                    </div>
                </div>
                <div className="into">
                    <p className="text bold">Transfer To</p>
                    <div className="profile label">
                        <div className="avatar">
                            <img style={{borderRadius: '10px'}}
                             width="70px" height="70px" src={photo}  alt="" />
                        </div>
                        <div className="info">
                            <p className="name text bold">{name}</p>
                            <div className="text-muted med">+62 {this.splitPhone(phone)}</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to="/home/1">
                        <button className="med-btn-primary">
                            Try Again
                        </button>
                    </Link>
                </div>
            </>
        )
    }

    renderFirst() {
        return (
            <>
                {this.state.isContinue ?  this.renderContinue() : this.renderInput()}
            </>
        )
    }

    renderLast() {
        return (
            <>
                {this.state.isSuccess ? this.renderSuccess() : this.renderFailed()}
            </>
        )
    }

    render() {
        console.log(this.state)
        return (
            <div className="content-main">
                {this.state.isStatus ? this.renderLast() : this.renderFirst()}
            </div>
        )
    }
}

export default Input
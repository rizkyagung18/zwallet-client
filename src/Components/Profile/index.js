import React, { Component } from 'react'
import Edit from '../../icons/edit-profile.svg'
import ArrowRight from '../../icons/arrow-right.svg'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

const style = {
    label: {
        borderRadius: "10px",
        backgroundColor: "#E5E8ED",
        padding: "20px",
        marginBottom: "20px",
        width: "433px",
        cursor: 'pointer'
    }
}

class Profile extends Component {
    state = {
        isLogout: false,
        modalShow: false,
        newName: this.props.data.name,
        newPhotoURL: this.props.data.photo,
        message: ''
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
        } else {
            return ""
        }
    }

    handleClick = async () => {
        if(this.state.newName) {
            const { newName, newPhotoURL } = this.state
            let res;
            if(newName !== this.props.data.name && newPhotoURL !== this.props.data.photo) {
                res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
                    name: newName,
                    photo: newPhotoURL
                })
            } else {
                if(newName === this.props.data.name && newPhotoURL !== this.props.data.photo ) {
                    res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
                        photo: newPhotoURL
                    })
                } else if(newName !== this.props.data.name && newPhotoURL === this.props.data.photo) {
                    res = await axios.patch(`https://whispering-falls-27902.herokuapp.com/users/${this.props.data.id}`, {
                        name: newName
                    })
                }
            }

            if(res.status === 201) {
                window.location.reload()
            } else {
                this.setState({ message: 'Failed edit name or photo user'})
            }
        } else {
            this.setState({ message: "Name shouldn't be empty"})
        }
    }

    render() {
        const data = this.props.data
            return (
                <div className="content-main d-flex flex-column align-items-center py-5">
                    <img className="mb-3" style={{borderRadius: '10px'}} width="80px" height="80px" src={data.photo} alt="" />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <img onClick={() => this.setState({ modalShow: true })} style={{cursor: 'pointer'}} className="mr-2" src={Edit} alt="edit" height="11px" />
                        <p className="mb-0 text-muted med">Edit</p>
                    </div>
                    <p className="mb-2 big bold text-dark">{data.name}</p>
                    <p className="med text-muted">+62 {this.splitPhone(data.phone)}</p>
                    <Link to={{ pathname: `/profile/${data.id}/info`}} style={style.label} className="mt-4 d-flex justify-content-between align-items-center">
                        <p className="bold med text-dark mb-0">Personal Information</p>
                        <img src={ArrowRight} alt="arrow" />
                    </Link>
                    <Link to={{ pathname: `/profile/${data.id}/password`}} style={style.label} className="d-flex justify-content-between align-items-center">
                        <p className="bold med text-dark mb-0">Change Password</p>
                        <img src={ArrowRight} alt="arrow" />
                    </Link>
                    <Link to={{ pathname: `/profile/${data.id}/pin`}} style={style.label} className="d-flex justify-content-between align-items-center">
                        <p className="bold med text-dark mb-0">Change PIN</p>
                        <img src={ArrowRight} alt="arrow" />
                    </Link>
                    <Link to="/" style={style.label} className="d-flex justify-content-between align-items-center">
                        <p className="bold med text-dark mb-0">Logout</p>
                    </Link>
                    <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Profile
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-column align-items-center mb-4">
                            <img width="90px" height="90px" style={{borderRadius: '10px'}} className="mb-3 mt-3" src={data.photo} alt="dp" />
                            <p className="mb-2 big bold text-dark">{data.name}</p>
                            <input style={{borderBottom: '1px solid rgba(169, 169, 169, 0.6)', borderRadius: 0}} className="bg-transparent mb-3" onChange={(e) => this.setState({ newName: e.target.value })} value={this.state.newName} type="text" placeholder="Enter new name" />
                            <input style={{borderBottom: '1px solid rgba(169, 169, 169, 0.6)', borderRadius: 0}} className="bg-transparent" onChange={(e) => this.setState({ newPhotoURL: e.target.value })} value={this.state.newPhotoURL} type="text" placeholder="Enter new photo url" />
                        </div>
                        <p className="text-danger med text-center">{this.state.message}</p>
                        <Button onClick={this.handleClick}>Edit</Button>
                    </Modal.Body>
                </Modal>
                </div>
            )
    }
}

export default Profile
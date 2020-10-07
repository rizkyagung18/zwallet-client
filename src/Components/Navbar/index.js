import React, { Component } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import bell from '../../icons/bell.svg'

class Bar extends Component {
    state = {
        sidebarActive: false
    }
    splitPhone(phone) {
        if(phone) {
            const newPhone = phone.split('').map((item, index) => {
                if(index === 2 || index === 6) {
                    return item + ' '
                } else {
                    return item
                }
            })
    
            return newPhone
        }
    }

    handleClick = () => {
        const status = !this.state.sidebarActive
        this.setState({ sidebarActive: status })
    }

    render() {
        const phone = this.props.data.phone
        return (
            <Navbar className="nav" bg="white" expand="lg">
                <Container className="navbar py-5">
                    <Nav.Item className="logo primary">Zwallet</Nav.Item>
                    <Nav.Item className="d-none d-md-flex justify-content-between align-items-center">
                        <div className="mr-4">
                            <img style={{borderRadius: '10px'}} src={this.props.data.photo} width="52px" height="52px" alt="profile" />
                        </div>
                        <div className="mr-4">
                            <div className="text bold">{this.props.data.name}</div>
                            <div className="small">+62 {this.splitPhone(phone)}</div>
                        </div>
                        <div className="mr-4 icon">
                            <img id="bell" src={bell} alt="bell" />
                        </div>
                    </Nav.Item>
                    <div className={`sidenav ${this.state.sidebarActive ? 'active' : ''}`}>
                        <div className="d-flex justify-content-center flex-column top">
                            <div className="image mr-4">
                                <img style={{borderRadius: '10px'}} width="70px" height="70px" src={this.props.data.photo} alt="" />
                            </div>
                            <div className="info d-flex flex-column mb-5">
                                <span className="bold text">{this.props.data.name}</span>
                                <span className="med">+62 {this.splitPhone(phone)}</span>
                            </div>
                        </div>
                        <hr/>
                        <div className="d-flex flex-column align-items-center justify-content-between bottom">
                            <div className="d-flex justify-content-between flex-column align-items-center">
                                <div className="px-4 my-5">
                                    <span className="big primary bold"><a href="home.html">Dashboard</a></span>
                                    <hr className="bg-primary"/>
                                </div>
                                <div className="py-4 my-5">
                                    <span className="big primary bold"><a href="search.html">Transfer</a></span>
                                    <hr className="bg-primary"/>
                                </div>
                                <div className="px-4 my-5">
                                    <span className="big primary bold"><a href="topup.html">Top Up</a></span>
                                    <hr className="bg-primary"/>
                                </div>
                                <div className="px-4 my-5">
                                    <span className="big primary bold">Profile</span>
                                    <hr className="bg-primary"/>
                                </div>
                            </div>
                            <div className="sidenav-logout align-self-center my-5">
                                <span className="big primary bold"><a href="login.html">Logout</a></span>
                            </div>
                        </div>
                    </div>
                    <div onClick={this.handleClick} className="hamburger">
                        <div className="bg-primary"></div>
                        <div className="bg-primary"></div>
                        <div className="bg-primary"></div>
                    </div>
                </Container>
            </Navbar>
        )
    }
}

export default Bar
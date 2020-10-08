import React, { Component } from 'react'
import Dashboard from '../../icons/menu/grid.svg'
import Transfer from '../../icons/menu/arrow-up.svg'
import Topup from '../../icons/menu/plus.svg'
import Profile from '../../icons/menu/user.svg'
import Logout from '../../icons/menu/log-out.svg'
import DashboardActive from '../../icons/menu-active/grid.svg'
import TransferActive from '../../icons/menu-active/arrow-up.svg'
import TopupActive from '../../icons/menu-active/plus.svg'
import ProfileActive from '../../icons/menu-active/user.svg'
import { Link } from 'react-router-dom'

class Menu extends Component {
    state = {
        isActive: 1
    }

    componentDidMount() {
        const path = window.location.href
        if(path.search('home') >= 0) {
            this.setState({ isActive: 1})
        }
        else if(path.search('transfer') >= 0) {
            this.setState({ isActive: 2})
        } else if(path.search('topup') >= 0) {
            this.setState({ isActive: 3})
        } else if(path.search('profile') >= 0) {
            this.setState({ isActive: 4})
        }
    }

    render() {
        const id = this.props.id
        return (
        <div className="content-menu d-none d-md-flex justify-content-between flex-column">
            <div className="menu d-flex flex-column justify-content-between">
                <div className={`item ${this.state.isActive === 1 ? 'activated bold primary' : ''}`}>
                    <img src={this.state.isActive === 1 ? DashboardActive : Dashboard} alt=""/>
                    <Link onClick={() => this.setState({ isActive: 1})} to={{
                        pathname: `/home/${id}`
                    }} className="text ml-3">Dashboard</Link>
                </div>
                <div className={`item ${this.state.isActive === 2 ? 'activated bold primary' : ''}`}>
                    <img src={this.state.isActive === 2 ? TransferActive : Transfer} alt=""/>
                    <Link onClick={() => this.setState({ isActive: 2})} to={{
                        pathname: `/transfer/${id}`
                    }} className="text ml-3">Transfer</Link>
                </div>
                <div className={`item ${this.state.isActive === 3 ? 'activated bold primary' : ''}`}>
                    <img src={this.state.isActive === 3 ? TopupActive : Topup} alt=""/>
                    <Link onClick={() => this.setState({ isActive: 3})} to={{
                        pathname: `/topup/${id}`
                    }} className="text ml-3">Top Up</Link>
                </div>
                <div className={`item ${this.state.isActive === 4 ? 'activated bold primary' : ''}`}>
                    <img src={this.state.isActive === 4 ? ProfileActive : Profile} alt=""/>
                    <Link onClick={() => this.setState({ isActive: 4})} to={{
                        pathname: `/profile/${id}`
                    }} className="text ml-3">Profile</Link>
                </div>
            </div>
            <div className="item logout">
                <img src={Logout} alt=""/>
                <Link to="/">
                    <span className="text ml-3">Logout</span>
                </Link>
            </div>
        </div>
        )
    }
}

export default Menu
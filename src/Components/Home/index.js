import React, { Component } from 'react'
import './Home.css'
import Transfer from '../../icons/balance/arrow-up.svg'
import Topup from '../../icons/balance/plus.svg'
import { Link } from 'react-router-dom'

class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            data: props.data
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
        } else {
            return ""
        }
    }

    renderHistory() {
        return (
            <>
                {this.state.data.history.map((item, index) => {
                    return (
                        <div key={index} className="items">
                            <div className="left">
                                <div className="avatar">
                                    <img width="56px" height="56px" src={item.photo} alt="" />
                                </div>
                                <div className="info">
                                    <p className="bold history-text">{item.receiver}</p>
                                    <p className="small">Transfer</p>
                                </div>
                            </div>
                            <div className="money">
                                <p className="bold text-success">+{item.amount}</p>
                            </div>
                        </div>
                    )
                })}   
            </>
        )
    }

    render() {
        const phone = this.props.data.phone
        if(this.state.data.history) {
            return (
                <div style={{ flex: 1 }}>
                    <div id="top-panel" className="top-panel bg-top-panel">
                        <div className="left">
                            <p className="balance text">Balance</p>
                            <p className="price bold">Rp{this.props.data.balance}</p>
                            <p className="phone">+62 {this.splitPhone(phone)}</p>
                        </div>
                        <div className="right">
                            <Link to={{ pathname: `/transfer/${this.props.data.id}`}}>
                                <button className="btn-light-primary">
                                    <img className="mr-2" src={Transfer} alt=""/>
                                    Transfer
                                </button>   
                            </Link>
                            <Link to={{pathname: `/topup/${this.props.data.id}`}}>
                                <button className="btn-light-primary">
                                    <img className="mr-2" src={Topup} alt=""/>
                                    Top Up
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="bottom-panel">
                        <div className="chart">
                            <div className="top">
                                <div className="left">
                                    <img src="../assets/images/chart/arrow-down.svg" alt=""/>
                                    <p className="small">Income</p>
                                    <p className="text bold">Rp2.120.000</p>
                                </div>
                                <div className="right">
                                    <img src="../assets/images/chart/arrow-up.svg" alt=""/>
                                    <p className="small">Expense</p>
                                    <p className="text bold">Rp1.560.000</p>
                                </div>
                            </div>
                            <div className="middle">
                                <span className="graphic small bold">+Rp65.000</span>
                            </div>
                            <div className="bottom">
                                <canvas id="myChart" height="268px"></canvas>
                            </div>
                        </div>
                        <div className="history">
                            <div className="desc">
                                <span className="text bold desc-title">Transaction History</span>
                                <a href="history.html" className="small primary">See all</a>
                            </div>
                            {this.renderHistory()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                ...Loading
                </div>
            )
        }
    }
}

export default Home
import React, { Component } from 'react'
import './Home.css'
import Transfer from '../../icons/balance/arrow-up.svg'
import Topup from '../../icons/balance/plus.svg'
import { Link } from 'react-router-dom'
import Income from '../../icons/arrow-down.svg'
import Expense from '../../icons/arrow-up.svg'
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            data: props.data,
            isHistory: false,
            dataSender: []
        }
    }

    async componentDidMount() {
        const res = await axios.get(`https://whispering-falls-27902.herokuapp.com/users/search/${this.props.data.id}`)
        if(res.status === 200) {
            this.setState({ dataSender: res.data.data })
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

    photo(id) {
        const find = this.state.dataSender.find(item => {
            return item.user_id === id
        })

        if(find) {
            return find.photo
        }
    }

    receiver(id) {
        const find = this.state.dataSender.find(item => {
            return item.user_id === id
        })

        if(find) {
            return find.name
        }
    }

    renderHistory() {
        const id = this.props.data.id
        return (
            <div className="list" style={{height: '45vh', overflowY: 'scroll'}}>
                {this.state.data.history.map((item, index) => {
                    return (
                        <div key={index} className="items">
                            <div className="left">
                                <div className="avatar">
                                    <img width="56px" height="56px" src={item.id_sender === id ? item.photo : this.photo(item.id_sender)} alt="" />
                                </div>
                                <div className="info">
                                    <p className="bold history-text">{item.id_sender === id ? item.receiver : this.receiver(item.id_sender)}</p>
                                    <p className="small">Transfer</p>
                                </div>
                            </div>
                            <div className="money">
                                <p className={`bold ${item.id_sender === id ? "text-danger" : "text-success"}`}>{item.id_sender === id ? `-${item.amount}` : `+${item.amount}`}</p>
                            </div>
                        </div>
                    )
                })}   
            </div>
        )
    }

    handleGraph(stats) {
        let income = 0
        let expense = 0
        const id = this.props.data.id
        this.state.data.history.forEach(item => {
            if(item.id_sender === id) {
                expense += parseInt(item.amount)
            } else {
                income += parseInt(item.amount)
            }
        });

        if(stats === 'income') {
            return income
        } else {
            return expense
        }
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
                                    <img src={Income} alt=""/>
                                    <p className="small">Income</p>
                                    <p className="text bold">Rp{this.handleGraph('income')}</p>
                                </div>
                                <div className="right">
                                    <img src={Expense} alt=""/>
                                    <p className="small">Expense</p>
                                    <p className="text bold">Rp{this.handleGraph('expense')}</p>
                                </div>
                            </div>
                            <div className="bottom">
                                <canvas id="myChart" height="268px"></canvas>
                            </div>
                        </div>
                        <div className="history">
                            <div className="desc">
                                <span className="text bold desc-title">Transaction History</span>
                                <p className="small primary">See all</p>
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
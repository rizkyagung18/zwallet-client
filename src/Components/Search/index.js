import React, { Component } from 'react'
import axios from 'axios'
import './Search.css'
import { Link } from 'react-router-dom'
import search from '../../icons/search.svg'

class Search extends Component {
    constructor(props) {
        super()
        this.state = {
            data: [],
            query: ''
        }

        this.handleInput = this.handleInput.bind(this)
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const res = await axios.get(`https://whispering-falls-27902.herokuapp.com/users/search/${id}`)
        this.setState({ data: res.data.data })
    }

    async handleInput(e) {
        this.setState({ query: e.target.value })
        const id = this.props.match.params.id
        let res;
        if(this.state.query) {
            res = await axios.get(`https://whispering-falls-27902.herokuapp.com/transfer/search/${id}`, {
                params: {
                    q: this.state.query
                }
            })
        } else {
            res = await axios.get(`https://whispering-falls-27902.herokuapp.com/users/search/${id}`)
        }
        if(res) {
            this.setState({ data: res.data.data })
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

    render() {
        console.log(window.location.href)
        const id = this.props.match.params.id
        return (
            <div style={{height:'80vh'}} className="content-main">
                <div className="title text bold">
                    Search Receiver
                </div>
                <div className="input">
                    <img className="search" src={search} alt="" />
                    <input name="q" type="search" onChange={this.handleInput} value={this.state.query} autoComplete="off" placeholder="Search receiver here"/>
                </div>
                <div style={{overflowY: 'scroll'}} className="list">
                    {this.state.data.map((item, index) => {
                        if(item.phone) {
                            return (
                                <Link to={{
                                    pathname: `/transfer/${id}/${item.user_id}`
                                }} key={index} className="items label">
                                    <div className="avatar mr-4">
                                        <img style={{borderRadius: '10px'}} width="70px" height="70px" src={item.photo} alt=""/>
                                    </div>
                                    <div className="info">
                                        <p className="name text bold">{item.name}</p>
                                        <div className="text-muted med">+62 {this.splitPhone(item.phone)}</div>
                                    </div>
                                </Link>
                            )
                        } else {
                            return ''
                        }
                    })}
                </div>
            </div>
        )
    }
}

export default Search
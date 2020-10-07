import axios from 'axios'
import React, { Component } from 'react'

class Topup extends Component {
    state = {
        data: []
    }
    async componentDidMount() {
        const res = await axios.get('https://whispering-falls-27902.herokuapp.com/topup')
        this.setState({ data: res.data.data })
    }

    render() {
        return (
            <div className="content-main">
                <p className="text bold text-black">How To Top Up</p>
                {this.state.data.map((item, index) => {
                    return (
                        <div key={index} className="label d-flex">
                            <span className="text bold primary mr-3">{item.sequence}</span>
                            <p className="med desc">{item.title}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Topup
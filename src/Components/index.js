import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer/';
import Menu from './Menu/';
import Navbar from './Navbar/'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from './Home/'
import axios from 'axios';
import Search from './Search/';
import Input from './Input/';
import Topup from './Topup/';
import Profile from './Profile/';
import User from './User';
import Password from './Password/';
import Pin from './Pin/'

class App extends React.Component {
    constructor(props) {
        super()
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const id = this.props.match.params.id
        const result = await axios.get(`https://whispering-falls-27902.herokuapp.com/users/${id}`)
        this.setState({ data: result.data.data[0] })
    }

    render() {
        return (
            <Router history={createBrowserHistory}>
                <Navbar data={this.state.data} />
                <Container fluid="md" className="d-flex justify-content-between flex-column flex-lg-row">
                    <Menu id={this.props.match.params.id} />
                    <Switch>
                        <Route exact path="/home/:id" component={() => <Home data={this.state.data} />} />
                        <Route exact path="/transfer/:id" component={Search} />
                        <Route exact path="/transfer/:id/:to" component={() => <Input {...this.props} data={this.state.data} />} />
                        <Route exact path="/topup/:id" component={Topup}/>
                        <Route exact path="/profile/:id" component={() => <Profile data={this.state.data} />} />
                        <Route exact path="/profile/:id/info" component={() => <User data={this.state.data} />} />
                        <Route exact path="/profile/:id/password" component={() => <Password {...this.props} data={this.state.data} />} />
                        <Route exact path="/profile/:id/pin" component={() => <Pin data={this.state.data} />} />
                    </Switch>
                </Container>
                <Footer />
            </Router>
        )
    }
}

export default App
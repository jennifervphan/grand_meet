import React, { Component } from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup.jsx';
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import AuthService from './components/auth/auth-service.jsx';
import Login from './components/auth/Login.jsx';
import Nearby from './pages/Nearby.jsx';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = { loggedInUser: null };
        this.service = new AuthService();
    }

    fetchUser() {
        if (this.state.loggedInUser === null) {
            this.service.loggedin()
                .then(response => {
                    this.setState({
                        loggedInUser: response
                    })
                })
                .catch(err => {
                    this.setState({
                        loggedInUser: false
                    })
                })
        }
    }

    setTheUser = (userObj) => {
        this.setState({
            loggedInUser: userObj
        })
    }

    render() {
            this.fetchUser()
            if (this.state.loggedInUser) {
                return ( <
                        div className = "App" >
                        <
                        Redirect to = {
                            { pathname: "/profile" }
                        }
                        /> <
                        Route exact path = '/profile'
                        render = {
                            () => < Profile userInSession = { this.state.loggedInUser }
                            getUser = { this.setTheUser }
                            />}/ >
                            <
                            Route exact path = '/editProfile'
                            render = {
                                () => < EditProfile userInSession = { this.state.loggedInUser }
                                getUser = { this.setTheUser }
                                />} / >
                                <
                                Route exact path = '/nearby'
                                render = {
                                    () => < Nearby userInSession = { this.state.loggedInUser }
                                    getUser = { this.setTheUser }
                                    />}/ > { /* <Route exact path='/messages' render = {() => <Profile userInSession={this.state.loggedInUser} getUser={this.setTheUser}/>}/> */ } <
                                    /div>
                                )
                            }
                            else {
                                return ( <
                                    div className = "App" >
                                    <
                                    Route exact path = '/'
                                    render = {
                                        () => < Home userInSession = { this.state.loggedInUser }
                                        />} / >
                                        <
                                        Route exact path = '/signup'
                                        render = {
                                            () => < Signup getUser = { this.setTheUser }
                                            />} / >
                                            <
                                            Route exact path = '/login'
                                            render = {
                                                () => < Login getUser = { this.setTheUser }
                                                />} / >
                                                <
                                                /div>
                                            )
                                        }
                                    }
                                }

                                export default App;
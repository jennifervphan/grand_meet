import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signup from './components/auth/Signup.jsx';
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import AuthService from './components/auth/auth-service.jsx';
import Login from './components/auth/Login.jsx';
import Nearby from './pages/Nearby.jsx';
import NearbyUser from './pages/NearbyUser.jsx';
import Inbox from './pages/Inbox';
import './App.css';

import ChatPage from './pages/ChatPage';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service=new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  render() {
    this.fetchUser()
      return (
        <div className="App">
          <Route exact path='/profile' render = {() => <Profile userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>}/>
          <Route exact path = '/editProfile' render = {(routeProps) => <EditProfile userInSession={this.state.loggedInUser} getUser={this.getTheUser} {...routeProps}/>} />
          <Route exact path='/nearby' render = {(routeProps) => <Nearby userInSession={this.state.loggedInUser} getUser={this.getTheUser} {...routeProps}/>}/>
          <Route exact path="/nearby/:id" render = {(routeProps) => <NearbyUser {...routeProps}/>} />
          <Route exact path='/' render = {() => <Home userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>} />
          <Route exact path='/signup' render = {() => <Signup getUser={this.getTheUser} />} />
          <Route exact path='/login' render = {(routeProps) => <Login getUser={this.getTheUser} {...routeProps} />} />
          <Route exact path='/inbox' render = {(routeProps) => <Inbox userInSession={this.state.loggedInUser} getUser={this.getTheUser} {...routeProps}/>} />
          <Route exact path="/chat/:id" render= {(routeProps)=> <ChatPage userInSession={this.state.loggedInUser} getUser={this.getTheUser} {...routeProps}/>} />
        </div>
      )
  }
}

export default App;

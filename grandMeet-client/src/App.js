import React, { Component } from 'react';
import './App.css';
import {Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar';
import Signup from './components/auth/Signup.jsx';
import Profile from './pages/Profile.jsx';
import AuthService from './components/auth/auth-service.jsx';
import Login from './components/auth/Login.jsx';

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

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Profile userInSession={this.state.loggedInUser} />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
          <Route exact path='/' render={()=><Home userInSession={this.state.loggedInUser}/>}/>
        </div>
      )
    }
  }
}

export default App;

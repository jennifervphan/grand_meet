import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import './Login.css';
import {geolocated} from 'react-geolocated';

class Login extends Component {
  constructor(props){
    super(props);
    this.formRef = React.createRef();
    this.state = { username: '', password: ''};
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    debugger
    event.preventDefault();
    const username= this.state.username;
    const password=this.state.password;
    // const form = new FormData(this.formRef.current)
    // form.append("longitude", this.props.coords.longitude);
    // form.append("latitude", this.props.coords.latitude);
    this.service.login(username,password, {longitude: this.props.coords.longitude, latitude: this.props.coords.latitude})
    .then( response => {
        this.setState({ username: "", password: ""});
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div className="loginPage">
      <MainLayout>
      <Link to="/" style={{ textDecoration: 'none', color:"white" }}><i className="fas fa-times-circle fa-2x"></i></Link>
        <div className="loginForm">
        <h3>Log in</h3>
        <form class="loginInput" ref={this.formRef} onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>

          <label>Password:</label>
          <input type="text" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <button className="submitBtn" type="submit">Log in</button>
        </form>
        <p>Don't have account? 
        <Link to={"/signup"} style={{ color: 'rgb(5, 5, 5)', textDecoration:"underline" }}> Register</Link>
        </p>
        </div>
      </MainLayout>
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Login);
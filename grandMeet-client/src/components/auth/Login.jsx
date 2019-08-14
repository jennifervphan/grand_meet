import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
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
        <form class="loginInput" onSubmit={this.handleFormSubmit}>
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

export default Login;
import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

class Signup extends Component {
  constructor(props){
    super(props);
    this.formRef = React.createRef();
    this.state = { username: '', password: '', file: null };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(this.formRef.current)
    this.service.signup(form)
    .then(response => {
        this.setState({
            username: "", 
            password: "",
            file: null

        });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  uploadPic=(event)=>{
    this.setState({
      file: (event.target.files[0])})
  }

  render(){
    return(
      <MainLayout>
        <form ref={this.formRef} onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <label>Profile Picture:</label>
          <input type="file" name="picture" onChange={this.uploadPic}/>

          <input type="submit" value="Signup"/>
        </form>
  
        <p>Already have account? 
            <Link to={"/login"}> Login</Link>
        </p>
      </MainLayout>
    )
  }
}

export default Signup;
import React, { Component } from 'react';
import MainLayout from '../components/layout/MainLayout';
import axios from 'axios';

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.state = { username: '', about: '', file: null };
      }
    
      handleFormSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(this.formRef.current);
        form.append('user',this.props.userInSession._id)
        axios({
            method:"POST",
            baseURL: `http://localhost:5000/api/edit`,
            withCredentials: true,
            data:form
          })
        .then(response => {
            this.setState({
                username: "", 
                about: "",
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

    render() {
        return (
            <MainLayout {...this.props}>
                <form className="editPage" ref={this.formRef} onSubmit={this.handleFormSubmit}>
                    <label>Username </label>
                    <input type="text" name="username" placeholder={this.props.userInSession.username} value={this.state.username} onChange={ e => this.handleChange(e)}/>

                    <label>About </label>
                    <input type="text" name="about" value={this.state.about} onChange={ e => this.handleChange(e)}/>

                    <label>Profile Picture </label>
                    <input type="file" name="picture" onChange={this.uploadPic}/>

                    <button className="submitBtn">Save</button>
                </form>
            </MainLayout>
        )
    }
}

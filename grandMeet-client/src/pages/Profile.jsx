import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthService from '../components/auth/auth-service';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { loggedInUser: null };
        this.service = new AuthService();
      }
    
      componentDidMount(nextProps) {
        console.log(this.props);
        this.setState({...this.state, loggedInUser: this.props.userInSession });
      }
      // nextProps["userInSession"]
      logoutUser = () =>{
        this.service.logout()
        .then(() => {
          this.setState({ loggedInUser: null });
          this.props.getUser(null);  
        })
      }

    render() {
        console.log(this.props.userInSession);
        return (
          <MainLayout {...this.props}>
            {/* <div {...this.props}>  */}
                Welcome {this.props.userInSession.username}!
                <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
          </MainLayout>
        )
    }
}

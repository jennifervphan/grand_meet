import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthService from '../components/auth/auth-service';
import './Profile.css';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { loggedInUser: null };
        this.service = new AuthService();
      }
    
      componentDidMount(nextProps) {
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
        return (
          <MainLayout {...this.props}>
            <div className="ProfilePage">
                <div className="profilePic" style={{  backgroundImage: `url(${this.props.userInSession.profilePicUrl})`,}}></div>
                <Link style={{ color: 'grey', textDecoration:"none" }} to="/editProfile"><div className="editIcon"></div></Link>
                <h3>Welcome {this.props.userInSession.username}!</h3>
                <p>About: </p>
                <p>{this.props.userInSession.about}</p>
                <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
                </Link>
            </div>
          </MainLayout>
        )
    }
}

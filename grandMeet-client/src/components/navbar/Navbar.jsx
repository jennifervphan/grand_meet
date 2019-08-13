import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import AuthService from '../auth/auth-service';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    // this.service = new AuthService();
  }

  componentDidMount(nextProps) {
    console.log(this.props);
    this.setState({...this.state, loggedInUser: this.props.userInSession });
  }
  // // nextProps["userInSession"]
  // logoutUser = () =>{
  //   this.service.logout()
  //   .then(() => {
  //     this.setState({ loggedInUser: null });
  //     // this.props.getUser(null);  
  //   })
  // }

  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="nav-style">
          <Link to="/profile">Profile</Link>
          <Link to="/nearby">Nearby</Link>
          <Link to="/messages">Messages</Link>
        </nav>
      )
    } else {
      return ( 
        <nav className="nav-style">
            <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
        </nav>
      )
    }
  }
}

export default Navbar;
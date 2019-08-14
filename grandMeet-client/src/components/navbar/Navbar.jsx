import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
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
        <nav className="Navbar">
          <Link to="/profile" style={{ textDecoration: 'none', color:"darkgrey" }}>Profile</Link>
          <Link to="/nearby" style={{ textDecoration: 'none', color:"darkgrey" }}>Nearby</Link>
          <Link to="/messages" style={{ textDecoration: 'none', color:"darkgrey" }}><i class="fas fa-comments fa-2x"></i></Link>
        </nav>
      )
    } else {
      return ( 
        <nav className="Navbar">
            <Link to="/" style={{textDecoration:"none", color: "white"}}><h3>grandMeet</h3></Link>
            <Link to='/login' style={{ textDecoration: 'none', color:"white" }}><h3>Login</h3></Link>
        </nav>
      )
    }
  }
}

export default Navbar;
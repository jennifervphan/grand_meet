import React, { Component } from 'react'
import MainLayout from '../components/layout/MainLayout';
import {Link} from 'react-router-dom';

export default class User extends Component {
    render() {
        return (
            <MainLayout {...this.props}>
               {/* <Link to="/profile">Profile</Link>
          <Link to="/nearby">Nearby</Link>
          <Link to="/messages">Messages</Link>  */}
            </MainLayout>
        )
    }
}

import React, { Component } from 'react'
import MainLayout from '../components/layout/MainLayout';

export default class Profile extends Component {
    render() {
        console.log(this.props.userInSession);
        return (
            <MainLayout {...this.props}> 
                Welcome {this.props.userInSession.username}!
            </MainLayout>
        )
    }
}

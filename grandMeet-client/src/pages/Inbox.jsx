import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import AllRooms from '../components/message/AllRooms';
import EachRoom from '../components/message/EachRoom';
import MainLayout from '../components/layout/MainLayout'
import './Inbox.css';

export default class Inbox extends Component {
    constructor(props){
        super(props);
        this.state={
            chatRooms:[],
            currentUser:{}
        };
    }

    componentDidMount (){
        debugger
        let user= this.props.getUser(); 
        axios.get(`${process.env.REACT_APP_API}/inbox`, 
                    {withCredentials:true})
        .then(response => {
            console.log(response);
                let chatRooms= response.data;
                this.setState({chatRooms:chatRooms, currentUser: user})
    })
    }

    render() {
        return (
            <MainLayout {...this.props} className="Dashboard">
                <div className="inboxPage">
                <AllRooms rooms={this.state.chatRooms} currentUser={this.state.currentUser}/>
                <Route path="/inbox/:id" render={(props)=><EachRoom rooms={this.state.chatRooms} userInSession={this.state.currentUser} {...props}/>}/>
                </div>
            </MainLayout>
        )
    }
}

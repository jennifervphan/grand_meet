import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './Inbox.css';
import AllRooms from '../components/message/AllRooms';
import EachRoom from '../components/message/EachRoom';
import MainLayout from '../components/layout/MainLayout'
import axios from 'axios';

export default class Inbox extends Component {
    constructor(props){
        super(props);
        this.state={
            chatRooms:[]
        };
    }

    componentDidMount (){
        debugger
        axios.get(`${process.env.REACT_APP_API}/inbox`, 
                    {withCredentials:true})
        .then(response => {
                let chatRooms= response.data;
                this.setState({chatRooms:chatRooms})
    })
    }

    render() {
        return (
            <MainLayout {...this.props} className="Dashboard">
                <AllRooms rooms={this.state.chatRooms}/>
                <Route path="/inbox/message" render={(props)=><EachRoom rooms={this.state.chatRooms} {...props}/>}/>
            </MainLayout>
        )
    }
}

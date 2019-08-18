import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import Input from './Input';
import '../../pages/Inbox.css';

export default class EachRoom extends Component {
    constructor(props){
        super(props)
        this.state={
            currentUser:null,
            currentRoom: {users:[]},
            messages:[],
            users:[]
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount (){
        const {params}= this.props.match;
        let roomId=params.id
        const chatManager = new ChatManager({
            instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
            userId: this.props.userInSession._id,
            tokenProvider: new TokenProvider({
                url:`https://us1.pusherplatform.io/services/chatkit_token_provider/v1/95077b15-c43c-4d68-ae92-7a1f082f91c8/token`
            })
        })

        chatManager
                .connect()
                .then(currentUser => {
                    this.setState({
                        currentUser:currentUser
                    })
                    currentUser.subscribeToRoom({
                        roomId: `${roomId}`,
                        messageLimit: 100,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message]
                                })
                            },
                        }})
                        .then(currentRoom => {
                        console.log(currentRoom.userIds);
                        this.setState({
                            currentRoom,
                            users: currentRoom.userIds
                        })
                        })
                        .catch(error => console.log(error))
    })}

    addMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error));
    }

    render() {
        let eachMess= this.state.messages.map((message, index)=>{
            return(
                <li key={index} className="">
                        <h3>{message.text}</h3>
                    </li>
            )   
         })

        return (
            <div className="eachRoom">
                <ul>
                {eachMess}
                </ul>
                <Input className="input-field" onSubmit={this.addMessage} />            
            </div>
        )
    }
}

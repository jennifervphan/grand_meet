import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageList from './MessageList';
import Input from './Input';

export default class ChatApp extends Component {
    constructor(props){
        super(props)
        this.state={
            currentUser:null,
            chatPartner: this.props.location.chatPartner.user.username,
            currentRoom: {users:[]},
            messages:[],
            users:[]
        }
        this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount (){
        const chatManager = new ChatManager({
            instanceLocator: process.env.REACT_APP_chatkit_instance_locator,
            userId: this.props.userInSession.username,
            tokenProvider: new TokenProvider({
                url:`https://us1.pusherplatform.io/services/chatkit_token_provider/v1/95077b15-c43c-4d68-ae92-7a1f082f91c8/token`
            })
        })

        chatManager
                .connect()
                .then(currentUser => {
                    this.setState({ currentUser: currentUser })
                    return currentUser.subscribeToRoom({
                        roomId: "24ab072d-77b6-4003-92e5-dca664986179",
                        messageLimit: 100,
                        hooks: {
                            onMessage: message => {
                                this.setState({
                                    messages: [...this.state.messages, message],
                                })
                            },
                        }
                    })
                })
                .then(currentRoom => {
                    console.log(currentRoom.userIds);
                    this.setState({
                        currentRoom,
                        users: currentRoom.userIds
                    })
                })
                .catch(error => console.log(error))
        
    }
    
    addMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id
        })
        .catch(error => console.error('error', error));
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages}/>
                <Input className="input-field" onSubmit={this.addMessage} />
            </div>
        )
    }
}

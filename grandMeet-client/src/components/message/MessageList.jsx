import React, { Component } from 'react';
import "./MessageList.css";

export default class MessageList extends Component {
    render() {
        let eachMess= this.props.messages.map((message, index)=>{
            if(message.senderId===this.props.userInSession.username){
                return(
                    <li key={index} className="currentUser">
                        <div className="eachMesDiv">
                            <img src={this.props.userInSession.profilePicUrl} alt=""></img>
                            <p>{message.senderId}</p>
                        </div>
                        <h3>{message.text}</h3>
                    </li>
                    )
            }
            else{
                return(
                    <li key={index} className="chatPartner">
                        <div className="eachMesDiv">
                            <img src={this.props.location.chatPartner.user.profilePicUrl} alt=""></img>
                            <p>{message.senderId}</p>
                        </div>
                        <h3>{message.text}</h3>
                    </li>
                )
            }
            
            
        })
        return (
            <ul className="MessageList">
                {eachMess}
            </ul>
        )
    }
}

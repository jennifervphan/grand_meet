import React, { Component } from 'react';
import "./MessageList.css";

export default class MessageList extends Component {
    render() {
        let eachMess= this.props.messages.map((message, index)=>{
            if(message.senderId === this.props.userInSession.username){
                return(
                    <li key={index} className="currentUserDiv">
                        <div className="eachMes">
                        <div className="eachMesDiv" style={{backgroundImage: `url(${this.props.userInSession.profilePicUrl})`}}>
                        </div>
                        <h3 className="currentUser">{message.text}</h3>
                        </div>
                    </li>
                    )
            }
            else{
                return(
                    <li key={index} >
                        <div className="eachMes">                       
                        <div className="eachMesDiv" style={{backgroundImage: `url(${this.props.location.chatPartner.user.profilePicUrl})`}}>
                        </div>
                        <h3 className="chatPartner">{message.text}</h3>
                        </div>
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

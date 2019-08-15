import React, { Component } from 'react'

export default class MessageList extends Component {
    render() {
        let eachMess= this.props.messages.map((message, index)=>{
            return(
            <li>
                <p>{message.senderId}</p>
                <h3>{message.text}</h3>
            </li>
            )
            
        })
        return (
            <ul>
                {eachMess}
            </ul>
        )
    }
}

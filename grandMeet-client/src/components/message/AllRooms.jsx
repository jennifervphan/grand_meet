import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AllRooms.css';
import EachRoom from './EachRoom';
import {Route} from 'react-router-dom';

export default class AllRooms extends Component {
    render() {
        const {rooms} =this.props
        let eachRoom= rooms.map((room, index)=>{
            let roomName= room["member_user_ids"].filter(id => id !== this.props.currentUser.username)[0]
            console.log(roomName)
            return(
                <Link className="eachRoom" to={`/inbox/${room.id}`} key={index}>
                <li >
                    {roomName}
                </li>
                </Link>
            )
        })
        return (
            <ul className="roomsTab">
             {eachRoom}   
            </ul>
        )
    }
}

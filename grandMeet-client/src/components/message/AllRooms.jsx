import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../pages/Inbox.css';

export default class AllRooms extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         chatRooms:[]
    //     };
    // }

    // componentDidMount (){
    //     axios.get(`${process.env.REACT_APP_API}/inbox`, {withCredentials:true})
    //     .then(response => {
    //             let chatRooms= response.data;
    //                 this.setState({chatRooms:chatRooms})
    // })
    // }

    render() {
        const {rooms} =this.props
        let eachRoom= rooms.map(room=>{
            console.log(room)
            return(
                <Link to="/inbox/message">
                {/* // {`/inbox/${room.id}`}> */}
                {room.name}
                </Link>
            )
        })
        return (
            <div className="roomsTab">
             {eachRoom}   
            </div>
        )
    }
}

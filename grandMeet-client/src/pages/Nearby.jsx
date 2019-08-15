import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import axios from 'axios';
import MainLayout from '../components/layout/MainLayout';

class Nearby extends Component {
    _isMounted = false

    constructor(props){
        super(props);
        this.state={
            users:[],
            sortedUsers:[]
        }
        this.calculateDistance=this.calculateDistance.bind(this);
    }

    calculateDistance (lat1, lon1, lat2, lon2){
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var radlon1 = Math.PI * lon1/180
        var radlon2 = Math.PI * lon2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlon1) * Math.sin(radlon2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        debugger
        dist = Math.floor(dist * 60 * 1.1515* 1.609344); //for distance in kilometer
        return dist
      }

    componentDidMount() {
        this._isMounted = true;
        axios.get(`http://localhost:5000/api/nearby`, {withCredentials:true})
        .then(responseFromApi => {
            if (this._isMounted) {
                let users= this.calculateUserDist(responseFromApi.data);
                    console.log(users);
                    this.setState({sortedUsers:users})
        }
    })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

      calculateUserDist= (users)=> {
          debugger
        let userLong= this.props.userInSession.longitude;
        let userLat= this.props.userInSession.latitude;
        for (var i = 0; i < users.length; i++) {
            let otherLong=users[i].longitude;
            let otherLat= users[i].latitude;
            users[i]["distance"] = this.calculateDistance(userLat,userLong,otherLat,otherLong);}
        users.sort(function(a, b) { 
            return a.distance - b.distance;
        });
        return users
    } 

    render() {
        if(this.state.sortedUsers.length>0){        
        const users = this.state.sortedUsers;
        let eachUser=users.map(user=>{
            return(
                <div key={user.username}>
                    <img src={user.profilePicUrl} alt=""></img>
                    <h4>{user.username}</h4>
                    <p>Distance from you: {user.distance}km</p>
                </div>
            )
        })
        return (
            <div className="NearbyPage">
            <MainLayout {...this.props}>
              {eachUser}  
            </MainLayout>
            </div>
        )}
        return(
            <h1>No nearby Users</h1>
        )
    }
}

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(Nearby);
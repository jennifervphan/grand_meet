import React, { Component } from 'react';
import MainLayout from '../components/layout/MainLayout';
import {Link} from 'react-router-dom';
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Homepage">
            <MainLayout>
                <div className="welcomeInfo">
                <h1>talk.share.meet.</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                </p>
                <Link to='/signup' style={{ textDecoration: 'none' }}><button className="registerBtnHome">Register</button></Link>
                </div>
            </MainLayout>
            </div>
        )
    }
}

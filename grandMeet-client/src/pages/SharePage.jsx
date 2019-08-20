import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import CommonRoom from "./CommonRoom";
import MainLayout from '../components/layout/MainLayout';

export default class SharePage extends Component {
    render() {
        return (
            <MainLayout {...this.props}>
                <div style={{display: "flex"}}>
                <Link to="/commonRoom"><h4>Common Room</h4></Link>
                <Link to="/sharingThings"><h4>Sharing Corner</h4></Link>
                </div>
            </MainLayout>
        )
    }
}

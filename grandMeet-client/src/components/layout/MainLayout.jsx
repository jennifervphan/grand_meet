import React, { Component } from 'react';
import Nav from '../navbar/Navbar';

export default class MainLayout extends Component {
    render() {
        return (
            <div>
                <Nav {...this.props}/>
                {this.props.children}
            </div>
        )
    }
}

import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Login from '../components/share/Login';
import Games from '../components/share/Games';
import MainLayout from '../components/layout/MainLayout';
import "../components/share/GameBoard.css";

class CommonRoom extends React.Component {
  constructor(props){
      super(props);
      this.state = {};
  }
  
  render() {
    let contents;
    if (this.state.username) {
      contents = <Games username={this.state.username} />
    } else {
      contents = <Login login={this.enterGame.bind(this)} />
    }
    return (
      <MainLayout {...this.props}>
        { contents }
      </MainLayout>
    );
  }

  enterGame(username) {
    this.setState({
      username: username
    });
  }

}

export default CommonRoom;
import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import Login from '../components/share/Login';
import Games from '../components/share/Game';

class SharePage extends React.Component {
  state = {};

  render() {
    let contents;
    if (this.state.username) {
      contents = <Games username={this.state.username} />
    } else {
      contents = <Login login={this.enterGame.bind(this)} />
    }
    return (
      <Container>
        { contents }
      </Container>
    );
  }

  enterGame(username) {
    this.setState({
      username: username
    });
  }

}

export default SharePage;
import React, { Component } from "react";
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
class GoogleAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: null
    };
  }
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENTID,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
     this.props.signIn();
    }else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderButton() {
    const { isSignedIn } = this.state;
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
     </button>
      );
    }
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}


export default connect(null, {signIn, signOut})(GoogleAuth);

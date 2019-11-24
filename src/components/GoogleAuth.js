import React, { Component } from "react";

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
  onAuthChange = () => {
    const {isSignedIn} = this.auth;
    this.setState({isSignedIn: isSignedIn.get() })
  }
  renderButton(){
    const {isSignedIn} = this.state;
    if(isSignedIn === null){
      return(<div>I don't know if we are signed in</div>);
    }else if(isSignedIn){
      return<div>I am signed in!</div>
    }else{
      return <div>I am not signed in</div>
    }
  }
  render() {
    return <div>{this.renderButton()}</div>;
  }
}


export default GoogleAuth;

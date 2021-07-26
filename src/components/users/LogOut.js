import { Component } from "react";
import { Redirect } from "react-router-dom";
import Session from "react-session-api";
import UserContext from "../../contexts/userContext";
class LogOut extends Component {
  static contextType = UserContext;
  componentDidMount(){
    Session.clear();
    this.context.setUser(null);
  }
  render() {
    return (
      <div>
        <Redirect to="/" />
        Logout
      </div>
    )
  }
}

export default LogOut;
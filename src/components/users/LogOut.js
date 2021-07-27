import { Component } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../contexts/userContext";
class LogOut extends Component {
  static contextType = UserContext;
  componentDidMount(){
    sessionStorage.clear();
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
import { Component } from "react";
import { Redirect } from "react-router-dom";

class LogOut extends Component{
  render(){
    return(
      <div>
        <Redirect to="/" />
        Logout
      </div>
    )
  }
}

export default LogOut;
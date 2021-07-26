import { Component } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Title from "./components/home/title";
import Home from './components/home/home';
import LogIn from './components/users/LogIn';
import AdminLogIn from './components/users/AdminLogin';
import SignUp from './components/users/SignUp';
import Dashboard from './components/home/dashboard';
import { UserProvider } from "./contexts/userContext";
import reactSessionApi from "react-session-api";

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      setUser: this.setUser
    };
  }

  setUser = (user) => {
    this.setState({ user: user })
  };

  render() {

    var sessionRedirect = null;
    if (reactSessionApi.get("Role") != undefined) {
      this.setState({ user: reactSessionApi.get("Role") });
      sessionRedirect = < Redirect to="/Dashboard" />
    }

    return (
      <BrowserRouter>
        <Title />
        {sessionRedirect}
        <Route exact path="/" component={Home} />
        <Route exact path="/UserLogin" >
          <LogIn setUser={this.state.setUser} />
        </Route>
        <Route exact path="/AdminLogin">
          <AdminLogIn setUser={this.state.setUser} />
        </Route>
        <Route exact path="/SignUp" component={SignUp} />
        <UserProvider value={this.state}>
          <Route path='/Dashboard' component={Dashboard} />
        </UserProvider>
      </BrowserRouter>
    )
  }

}

export default App;
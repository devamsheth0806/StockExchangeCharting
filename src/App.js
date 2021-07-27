import { Component } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import Title from "./components/home/title";
import Home from './components/home/home';
import LogIn from './components/users/LogIn';
import AdminLogIn from './components/users/AdminLogin';
import SignUp from './components/users/SignUp';
import Dashboard from './components/home/dashboard';
import { UserProvider } from "./contexts/userContext";

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
  componentDidMount() {
    if (sessionStorage.getItem("Role") != undefined) {
      if (this.state.user == null) {
        this.setState({ user: sessionStorage.getItem("Role") });
      }
    }
  }

  componentDidUpdate() {
    if (sessionStorage.getItem("Role") != undefined) {
      if (this.state.user == null) {
        this.setState({ user: sessionStorage.getItem("Role") });
      }
    }
  }

  render() {

    var sessionRedirect = null;
    if (sessionStorage.getItem("Role") != undefined) {
      sessionRedirect =
        < Redirect to="/Dashboard" />
    }

    return (
      <BrowserRouter>
        <Title />
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
        {sessionRedirect}
      </BrowserRouter>
    )
  }

}

export default App;
import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

  render() {
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
      </BrowserRouter>
    )
  }

}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Title from './components/home/title';
import Home from './components/home/home';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './components/users/LogIn';
import AdminLogIn from './components/users/AdminLogin';
import SignUp from './components/users/SignUp';
import Dashboard from './components/home/dashboard';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Title />
      <Route exact path="/" component={Home} />
      <Route exact path="/UserLogin" component={LogIn} />
      <Route exact path="/AdminLogin" component={AdminLogIn} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route path='/Dashboard' component={Dashboard}/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

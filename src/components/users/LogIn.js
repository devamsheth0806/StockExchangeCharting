import { Component } from "react";
import { Link } from "react-router-dom";
class LogIn extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">
                  User Login
                </h1>
                <form>
                  <div className="form-group m-2">
                    <label htmlFor="username">Username</label>
                    <input
                      type="username"
                      name="username"
                      className="form-control"
                      required />
                  </div>
                  <div className="form-group m-2">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required />
                  </div>
                  <div className="m-2 text-center">
                    <Link to="Dashboard">
                      <input type="submit" value="Login" className="btn btn-primary btn-block" />
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn;
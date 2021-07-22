import { Component } from "react";
class AdminLogIn extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">
                  Admin Login
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
                    <input type="submit" value="Login" className="btn btn-primary btn-block" />
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

export default AdminLogIn;
import { Component } from "react";

class SignUp extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">
                  User SignUp
                </h1>

                <form>
                  <div className="form-group m-2">
                  <label for="username">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      name="username"
                      placeholder="Username"
                      minlength="2"
                      required />
                    <div className="invalid-feedback">
                      Username required
                    </div>
                    <div className="invalid-feedback">
                      Must be atleast 2 characters
                    </div>
                  </div>

                  <div class="form-group m-2">
                  <label for="password">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      minlength="4"
                      required />
                  </div>
                  <div class="form-group m-2">
                  <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Email"
                      pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                      required />
                  </div>
                  <div class="form-group m-2">
                  <label for="mobile">Mobile</label>
                    <input
                      type="text"
                      class="form-control"
                      name="mobile"
                      placeholder="Mobile Number"
                      minlength="10"
                      maxlength="10"
                      required />
                  </div>

                  <div className="w-100 m-2 text-center">
                    <input type="submit" value="Submit" class="btn btn-primary btn-block mx-auto" />
                  </div>
                </form>
              </div >
            </div >
          </div >
        </div >
      </div >
    )
  }
}

export default SignUp;
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import userServices from "../../services/user.services";

class SignUp extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      redirect: false,
      status: null,
      errors: null,
      user: {}
    }
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async signUp(user) {
    if (this._isMounted) {
      const response = await userServices.signUp(user).catch(function (error) {
        return error.response;
      });
      if (response.status == 201) {
        this.setState({
          status: response.status,
          errors: response.data,
          redirect: true
        })
      }
      else
        this.setState({
          status: response.status,
          errors: response.data
        })
      console.log(this.state);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var user = this.state.user;
    user.id = -1;
    this.signUp(user);
  }

  handleChange = (event) => {
    var user = this.state.user;
    if (event.target != null)
      user[event.target.name] = event.target.value;
    else
      user.role = event.value;
    this.setState({ user: user });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const redirect = this.state.redirect;

    return (
      (redirect) ?
        (
          <Redirect to="/" />
        )
        :
        (
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h1 className="text-center pb-4 pt-3">
                      User SignUp
                    </h1>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group m-2">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.handleChange}
                          name="username"
                          placeholder="Username"
                          minLength="2"
                          required />
                      </div>

                      <div className="form-group m-2">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          onChange={this.handleChange}
                          name="password"
                          placeholder="Password"
                          minLength="4"
                          required />
                      </div>
                      <div className="form-group m-2">
                        <label htmlFor="role">Role</label>
                        <Select
                          className="form-control"
                          onChange={this.handleChange}
                          name="role"
                          options={
                            [
                              { label: "USER", value: "USER" },
                              { label: "ADMIN", value: "ADMIN" }
                            ]
                          }
                          required />
                      </div>
                      <div className="form-group m-2">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          onChange={this.handleChange}
                          name="email"
                          placeholder="Email"
                          pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                          required />
                      </div>
                      <div className="form-group m-2">
                        <label htmlFor="mobile">Mobile</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={this.handleChange}
                          name="mobile"
                          placeholder="Mobile Number"
                          minLength="10"
                          maxLength="10"
                          required />
                      </div>
                      <div className="w-100 text-center">
                        <input type="submit" value="Submit" className="btn btn-primary btn-block m-2" />
                        <Link to="/">
                          <button className="btn btn-danger btn-block m-2">
                            Cancel
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div >
                </div >
                {
                  (this.state.errors != null)
                    ?
                    <div className="text-danger text-center">                      
                        <div>
                          {JSON.stringify(this.state.errors)}
                        </div>
                    </div>
                    :
                    null
                }
              </div >
            </div >
          </div >
        )
    )
  }
}

export default SignUp;
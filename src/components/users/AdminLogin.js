import { CircularProgress } from "@material-ui/core";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import userServices from "../../services/user.services";
class AdminLogIn extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      redirect: false,
      loading:false,
      status: null,
      errors: null,
      creds: {}
    }
    this.logIn = this.logIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async logIn(creds) {
    if (this._isMounted) {
      var response = "";
      this.setState({ loading: true });
      const error = await userServices.adminlogin(creds).then(res => {
        response = res;
      }).catch(function (error) {
        return error.response;
      });
      if (response.status == 200) {
        this.props.setUser("ADMIN");
        sessionStorage.setItem("Authorization", `Bearer ${response.data.token}`);
        sessionStorage.setItem("Username", creds.username);
        sessionStorage.setItem("Role", "ADMIN");
        this.setState({
          status: response.status,
          errors: response.data,
          loading: false,
          redirect: true
        })
      }
      else
        this.setState({
          status: response.status,
          loading: false,
          errors: error.data.error
        })
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    this.logIn(this.state.creds);
  }

  handleChange = (event) => {
    var creds = this.state.creds;
    if (event.target != null)
      creds[event.target.name] = event.target.value;
  }
  render() {
    const redirect = this.state.redirect;
    return (
      (redirect) ?
        (
          <Redirect to={{
            pathname: "/Dashboard"
          }} />
        )
        :
        (
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto">
                <div className="card">
                  <div className="card-body">
                    <h1 className="text-center pb-4 pt-3">
                      Admin Login
                    </h1>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group m-2">
                        <label htmlFor="username">Username</label>
                        <input
                          type="username"
                          name="username"
                          className="form-control"
                          onChange={this.handleChange}
                          required />
                      </div>
                      <div className="form-group m-2">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          onChange={this.handleChange}
                          required />
                      </div>
                      {this.state.loading
                        ?
                        <div className="w-100 text-center">
                          <CircularProgress />
                        </div>
                        :
                        <div className="text-center">
                          <input type="submit" value="Login" className="btn btn-primary btn-block m-2" />
                          <Link to="/">
                            <button className="btn btn-danger btn-block m-2">
                              Cancel
                            </button>
                          </Link>
                        </div>
                      }
                    </form>
                  </div>
                </div>
                {
                  (this.state.errors != null)
                    ?
                    <div className="text-danger text-center">
                      {JSON.stringify(this.state.errors)}
                    </div>
                    :
                    null
                }
              </div>
            </div>
          </div>
        )
    )
  }
}

export default AdminLogIn;
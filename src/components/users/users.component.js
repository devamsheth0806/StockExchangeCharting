import { Component } from 'react';
import UserContext from "../../contexts/userContext";
import userServices from '../../services/user.services';
class Users extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      update: false,
      fetched: false,
      users: []
    };

  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      this.fetchAllUsers();
      this.setState({ update: false });
    }
    if (this.state.fetched) {
      this.setState({ fetched: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async delete(id) {
    await userServices.deleteUser(id);
    this.setState({
      update: true
    })
  }

  async fetchAllUsers() {
    if (this._isMounted) {
      const response = await userServices.getAllUsers();
      this.setState({
        users: response.data,
        fetched: true
      });
    }
  }

  render() {
    console.log(this.state.users);
    const users = this.state.users.map((user) => {
      return <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.password}</td>
        <td>{user.role}</td>
        <td>{user.confirmed ? "Yes" : "No"}</td>
        {
          this.context.user == "ADMIN"
            ?
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => this.delete(user.id)} >
                Delete
              </button>
            </td>
            :
            null
        }
      </tr>
    });
    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center">
          <h1 className="text-primary">Users</h1>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>User name</th>
                <th>Password</th>
                <th>Role</th>
                <th>confirmed</th>
                {
                  this.context.user == "ADMIN"
                    ?
                    <th>Delete</th>
                    :
                    null
                }
              </tr>
            </thead>
            <tbody>
              {users}
            </tbody>
          </table >
        </div>
      </div >
    )
  }
}

export default Users;
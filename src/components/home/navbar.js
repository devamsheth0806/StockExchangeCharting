import { Component } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../contexts/userContext";

class NavBar extends Component {
  static contextType = UserContext;
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <div className="container">
          <div className="collapse navbar-collapse row" id="navbarMain">
            <ul className="nav nav-pills nav-fill">
              <NavLink exact to={`${this.props.url}/stockprices`} className="nav-link">
                <li className="nav-item">
                  Stock Prices
                </li>
              </NavLink>
              <NavLink exact to={`${this.props.url}/companies`} className="nav-link">
                <li className="nav-item">
                  Companies
                </li>
              </NavLink>
              <NavLink exact to={`${this.props.url}/sectors`} className="nav-link">
                <li className="nav-item">
                  Sectors
                </li>
              </NavLink>
              <NavLink exact to={`${this.props.url}/stockexchanges`} className="nav-link">
                <li className="nav-item">
                  Stock Exchanges
                </li>
              </NavLink>
              <NavLink exact to={`${this.props.url}/ipos`} className="nav-link">
                <li className="nav-item">
                  IPOs
                </li>
              </NavLink>
              <NavLink exact to={`${this.props.url}/comparisoncharts`} className="nav-link">
                <li className="nav-item">
                  Comparison Charts
                </li>
              </NavLink>
              {
                this.context.user == "ADMIN"
                  ?
                  <NavLink exact to={`${this.props.url}/users`} className="nav-link">
                    <li className="nav-item">
                      Users
                    </li>
                  </NavLink>
                  :
                  null
              }

              <NavLink exact to={`${this.props.url}/logout`} className="nav-link">
                <li className="nav-item">
                  Logout
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>


    );
  }
}
export default NavBar;
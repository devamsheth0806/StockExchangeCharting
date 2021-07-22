import { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/title.css";

class Title extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center">
          <Link to="/" className="navbar-brand">
            <h1 className="title">Devam's Stock Exchange Charting</h1>
          </Link>
        </div>
      </div>
    )
  }
}

export default Title;
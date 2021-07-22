import { Grid } from "@material-ui/core";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/home.css";
class Home extends Component {
  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '60vh' }}
      >
        <div className="container">
          <div className="row m-5">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <NavLink to="/SignUp">
                <div className="row">
                  <button className="btn btn-outline-warning btn-lg btn-block">
                    Sign Up
                  </button>
                </div>
              </NavLink>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row m-5">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <NavLink to="/UserLogin">
                <div className="row">
                  <button className="btn btn-outline-primary btn-lg btn-block">
                    Login as User
                  </button>
                </div>
              </NavLink>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row m-5">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
              <NavLink to="/AdminLogin">
                <div className="row">
                  <button className="btn btn-outline-success btn-lg btn-block">
                    Login as Admin
                  </button>
                </div>
              </NavLink>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </Grid>
    )
  }
}

export default Home;
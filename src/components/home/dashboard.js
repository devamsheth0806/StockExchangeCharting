import { Component, createElement } from "react";
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";
import NavBar from "./navbar";
import Companies from "../companies/companies.component";
import StockPrices from "../stock_prices/stockPrices.component";
import Sectors from "../sectors/sectors.component";
import StockExchanges from "../stock_exchanges/stockExchanges.component";
import Ipos from "../ipos/ipos.component";
import Charts from "../charts/charts-common";
import LogOut from "../users/LogOut";
import UserContext from "../../contexts/userContext";
import Users from "../users/users.component";

class Dashboard extends Component {
  static contextType = UserContext;
  render() {
    const userSession = sessionStorage.getItem("Role");
    return (
      (this.context.user != null && this.context.user != undefined && userSession != undefined) ?
        (<div>
          <NavBar url={this.props.match.url} />
          <Redirect to={`${this.props.match.path}/stockprices`} />
          <Route exact path={`${this.props.match.path}/stockprices`} component={StockPrices} />
          <Route exact path={`${this.props.match.path}/companies`} component={Companies} />
          <Route exact path={`${this.props.match.path}/sectors`} component={Sectors} />
          <Route exact path={`${this.props.match.path}/stockexchanges`} component={StockExchanges} />
          <Route exact path={`${this.props.match.path}/ipos`} component={Ipos} />
          <Route exact path={`${this.props.match.path}/comparisoncharts`} component={Charts} />
          <Route exact path={`${this.props.match.path}/logout`} component={LogOut} />
          {this.context.user == "ADMIN" ?
            <Route exact path={`${this.props.match.path}/users`} component={Users} />
            :
            null
          }
        </div>)
        :
        <Redirect to="/" />
    )
  }
}

export default Dashboard;
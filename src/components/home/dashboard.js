import { Component, createElement } from "react";
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";
import NavBar from "./navbar";
import Companies from "../companies/companies.component";
import StockPrices from "../stock_prices/stockPrices.component";
import Sectors from "../sectors/sectors.component";
import StockExchanges from "../stock_exchanges/stockExchanges.component";
import Ipos from "../ipos/ipos.component";
import ComparisonCharts from "../comparisonCharts/comparisonCharts";
import Home from "./home";
import LogOut from "../users/LogOut";

class Dashboard extends Component {
  render() {
    return (
      <div>
          <NavBar url={this.props.match.url} />
          {/* <Redirect to="/stockprices"/> */}
          <Route exact path={`${this.props.match.path}/stockprices`} component={StockPrices} />
          <Route exact path={`${this.props.match.path}/companies`} component={Companies} />
          <Route exact path={`${this.props.match.path}/sectors`} component={Sectors} />
          <Route exact path={`${this.props.match.path}/stockexchanges`} component={StockExchanges} />
          <Route exact path={`${this.props.match.path}/ipos`} component={Ipos} />
          <Route exact path={`${this.props.match.path}/comparisoncharts`} component={ComparisonCharts} />
          <Route exact path={`${this.props.match.path}/logout`} component={LogOut} />
      </div>
    )
  }
}

export default Dashboard;
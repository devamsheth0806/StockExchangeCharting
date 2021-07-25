import { Component } from "react";
import CompanyCharts from "./companyCharts";
import SectorCharts from "./sectorCharts";
class Charts extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className=" col-sm-6">
            <CompanyCharts />
          </div>
          <div className=" col-sm-6">
            <SectorCharts />
          </div>
        </div>
      </div>
    )
  }

}

export default Charts;
import { Component, createRef } from "react";
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import TimeSeries from "fusioncharts/fusioncharts.timeseries";
import companyServices from "../../services/company.services";
import Select from "react-select";

ReactFC.fcRoot(FusionCharts, TimeSeries);

let chartConfigs = {
  type: 'timeseries',// The chart type
  width: '100%', // Width of the chart
  // height: '100%', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration
    "navigator": {
      "enabled": 0
    },
    "chart": {
      "caption": "Stock Price",
      "subCaption": "In Rupees",
      "xAxisName": "Company",
      "yAxisName": "Share Price",
      "numberSuffix": "Rs.",
      "theme": "fusion",
    },
    "xAxis": {
      "outputTimeFormat": {
        "minute": "%d/%m/%Y %H:%M:%S",
        "second": "%d/%m/%Y %H:%M:%S"
      }
    }
  }
};

class CompanyCharts extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.searchRef = createRef();
    this.fromRef = createRef();
    this.toRef = createRef();
    this.state = {
      chartConfigs: chartConfigs,
      companies: [],
      stockPrices: {},
    };
    this.dosearch = this.dosearch.bind(this);
    this.getCompanies = this.getCompanies.bind(this);
    this.getCompanyStockPrices = this.getCompanyStockPrices.bind(this);
  }

  async getCompanyStockPrices(id, companyName) {
    if (this._isMounted) {
      const response = await companyServices.getCompanyStockPrices(id);
      const stockPrices = this.state.stockPrices;
      stockPrices[companyName] = response.data;
      this.setState({
        stockPrices: stockPrices
      });
      const data = [];

      if (Object.keys(this.state.stockPrices).length !== 0) {
        var configs = Object.assign({}, this.state.chartConfigs);
        var prevDs = configs.dataSource;
        for (var company in this.state.stockPrices) {
          this.state.stockPrices[company].forEach(share => {
            data.push(
              [`${share.datee} ${share.timee}`, share.sharePrice, company]
            );
          });
        };

        const schema = [
          {
            "name": "Time",
            "type": "date",
            "format": "%d/%m/%Y %H:%M:%S"
          },
          {
            "name": "Value",
            "type": "number"
          },
          {
            "name": "Company",
            "type": "string",
            "column": "Company",
            "index": 2
          }
        ]

        const fusionTable = new FusionCharts.DataStore().createDataTable(
          data,
          schema
        );

        prevDs.data = fusionTable;
        configs.dataSource = prevDs;
        this.setState({
          chartConfigs: configs
        });
      }
    }
  }

  async getCompanyStockPrices(id, companyName, from, to) {
    if (this._isMounted) {
      const response = await companyServices.getCompanyStockPrices(id, from, to);
      const stockPrices = this.state.stockPrices;
      stockPrices[companyName] = response.data;
      this.setState({
        stockPrices: stockPrices
      });
      const data = [];

      if (Object.keys(this.state.stockPrices).length !== 0) {
        var configs = Object.assign({}, this.state.chartConfigs);
        var prevDs = configs.dataSource;
        for (var company in this.state.stockPrices) {
          this.state.stockPrices[company].forEach(share => {
            data.push(
              [`${share.datee} ${share.timee}`, share.sharePrice, company]
            );
          });
        };

        const schema = [
          {
            "name": "Time",
            "type": "date",
            "format": "%d/%m/%Y %H:%M:%S"
          },
          {
            "name": "Value",
            "type": "number"
          },
          {
            "name": "Company",
            "type": "string",
            "column": "Company",
            "index": 2
          }
        ]

        const fusionTable = new FusionCharts.DataStore().createDataTable(
          data,
          schema
        );

        console.log(fusionTable);

        prevDs.data = fusionTable;
        configs.dataSource = prevDs;
        this.setState({
          chartConfigs: configs
        });
      }
    }
  }

  async getCompanies() {
    if (this._isMounted) {
      const response = await companyServices.getCompanies();
      this.setState({
        companies: response.data
      });

    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getCompanies();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  dosearch() {
    let searchval = this.searchRef.current.state.value;//get node value or text value
    if (searchval != null) {
      let companyId = this.searchRef.current.state.value.value;//get node value or text value
      let companyName = this.searchRef.current.state.value.label;

      const from = this.fromRef.current.value;
      const to = this.toRef.current.value;

      if (from == undefined || to == undefined)
        this.getCompanyStockPrices(companyId, companyName);
      else
        this.getCompanyStockPrices(companyId, companyName, from, to);
      this.searchRef.current.state.value = null;
      this.fromRef.current.value = null;
      this.toRef.current.value = null;
    }
    else {
      const chartConfigs = this.state.chartConfigs;
      chartConfigs.dataSource.data = [];
      this.setState({
        chartConfigs
      });
    }

  }

  render() {

    const companyOptions = this.state.companies.map(company => {
      return {
        label: company.companyName,
        value: company.id
      };
    });

    // console.log(companyOptions);
    const chartConfigs = this.state.chartConfigs;

    return (
      <div className="App">
        <div className="input-group row">
          <div className="col-sm-10">
            <Select
              type="text"
              className="form-control"
              placeholder="Search Companies"
              ref={this.searchRef}
              options={companyOptions}
            />
          </div>
          <div className="col-sm-2 align-self-center ">
            <div className="row">
              <button className="btn btn-primary btn-block" type="button" onClick={this.dosearch} >
                Go
              </button>
            </div>
          </div>
        </div>
        <div className="row m-2">
          <div className="col-sm-5">
            <label htmlFor="from">From:&nbsp;</label>
            <input
              type="date"
              name="from"
              ref={this.fromRef}
            />
          </div>
          <div className="col-sm-5">
            <label htmlFor="to">To:&nbsp;</label>
            <input
              type="date"
              name="to"
              ref={this.toRef}
            />
          </div>
          <div className="col-sm-2">
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* {chartConfigs.Chart} */}
            <ReactFC {...chartConfigs} />
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyCharts;
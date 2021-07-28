import { Component, createRef } from "react";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import companyServices from "../../services/company.services";
import Select from "react-select";
import sectorServices from "../../services/sector.services";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

let chartConfigs = {
  type: 'column2d',// The chart type
  width: '100%', // Width of the chart
  // height: '100%', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration
    "chart": {
      "caption": "Sector Price",
      "subCaption": "In Rupees",
      "xAxisName": "Sectors",
      "yAxisName": "Share Prices",
      "numberSuffix": "Rs.",
      "theme": "fusion",
    },
    // Chart Data
    "data": []
  },
};


class SectorCharts extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.searchRef = createRef();
    this.fromRef = createRef();
    this.toRef = createRef();
    this.state = {
      chartConfigs: chartConfigs,
      sectors: [],
      sectorPrices: {},
    };
    this.dosearch = this.dosearch.bind(this);
    this.getSectors = this.getSectors.bind(this);
    this.getSectorPrices = this.getSectorPrices.bind(this);
  }

  async getSectorPrices(id, sectorName) {
    if (this._isMounted) {
      const response = await sectorServices.getSectorPrice(id);
      const sectorPrices = this.state.sectorPrices;
      sectorPrices[sectorName] = response.data;
      this.setState({
        sectorPrices: sectorPrices
      });

      let data = this.state.sectorPrices;

      if (Object.keys(data).length !== 0) {
        var configs = Object.assign({}, this.state.chartConfigs);
        var prevDs = configs.dataSource;
        prevDs.data = [];
        for (var sector in data) {
          prevDs.data.push({
            'label': `${sector}`,
            'value': data[sector]
          });
        };

        configs.dataSource = prevDs;
        this.setState({
          chartConfigs: configs
        });
      }
    }
  }

  async getSectorPrices(id, sectorName, from, to) {
    if (this._isMounted) {
      const response = await sectorServices.getSectorPrice(id, from, to);
      const sectorPrices = this.state.sectorPrices;
      sectorPrices[sectorName] = response.data;
      this.setState({
        sectorPrices: sectorPrices
      });

      const data = this.state.sectorPrices;

      if (Object.keys(data).length !== 0) {
        var configs = Object.assign({}, this.state.chartConfigs);
        var prevDs = configs.dataSource;
        prevDs.data = [];
        for (var sector in data) {
          prevDs.data.push({
            'label': `${sector}`,
            'value': data[sector]
          });
        };

        configs.dataSource = prevDs;
        this.setState({
          chartConfigs: configs
        });
      }

    }
  }

  async getSectors() {
    if (this._isMounted) {
      const response = await sectorServices.getAllSectors();
      this.setState({
        sectors: response.data
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.getSectors();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async dosearch() {
    let searchval = this.searchRef.current.state.value;//get node value or text value
    if (searchval != null) {
      let sectorId = this.searchRef.current.state.value.value;//get node value or text value
      let sectorName = this.searchRef.current.state.value.label;

      const from = this.fromRef.current.value;
      const to = this.toRef.current.value;

      if (from == undefined || to == undefined)
        this.getSectorPrices(sectorId, sectorName);
      else
        this.getSectorPrices(sectorId, sectorName, from, to);
      this.searchRef.current.state.value = null;
      this.fromRef.current.value = null;
      this.toRef.current.value = null;
    }
    else {
      const chartConfigs = this.state.chartConfigs;
      chartConfigs.dataSource.data = [];
      this.setState({
        chartConfigs,
        sectorPrices:{}
      });
    }
  }

  render() {

    const sectorOptions = this.state.sectors.map(sector => {
      return {
        label: sector.sectorName,
        value: sector.id
      };
    });

    const chartConfigs = this.state.chartConfigs;

    return (
      <div className="App">
        <div className="input-group row text-center">
          <div className="col fs-2">
            Sectors Comparison Chart
          </div>
        </div>
        <div className="input-group row">
          <div className="col-sm-10">
            <Select
              type="text"
              className="form-control"
              placeholder="Search for Sectors"
              ref={this.searchRef}
              options={sectorOptions}
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

export default SectorCharts;
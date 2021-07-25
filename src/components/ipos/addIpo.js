import { Modal } from "@material-ui/core";
import { Component } from "react";
import Select from "react-select";
import companyServices from "../../services/company.services";
import ipoServices from "../../services/ipo.services";

class AddIpo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      style: {
        position: 'absolute center',
        width: 400,
        background: "#ccc",
        border: '2px solid #000',
        boxShadow: 5,
        padding: "2px 4px 3px"
      },
      companies: [],
      stockExchanges: [],
      ipo: {}
    }

    this.getCompanies = this.getCompanies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCompanyStockExchanges = this.getCompanyStockExchanges.bind(this);
    this.addIpo = this.addIpo.bind(this);
    this.fetchIpoById = this.fetchIpoById.bind(this);
  }

  async getCompanies() {
    const response = await companyServices.getCompanies();
    this.setState({
      companies: response.data
    })
  }

  async getCompanyStockExchanges(id) {
    const response = await companyServices.getCompanyStockExchanges(id);
    this.setState({
      stockExchanges: response.data
    })
  }

  async fetchIpoById(id) {
    const response = await ipoServices.getIpoById(id);
    const ipo = response.data;
    ipo.stockExchangeNames = ipo.stockExchanges.map(s => {
      return s.name;
    });
    const company = this.state.companies.filter(option => {
      return option.companyName === ipo.companyName
    });
    this.getCompanyStockExchanges(company[0].id);
    this.setState({
      ipo: ipo
    })
  }

  async updateIpo(ipo) {
    await ipoServices.updateIpo(ipo);
    this.props.handleClose();
  }

  async addIpo(ipo) {
    await ipoServices.addIpo(ipo);
    this.props.handleClose();
  }

  async handleSubmit(event) {
    event.preventDefault();
    var ipo = this.state.ipo;
    const id = this.props.id;
    if (!Number.isInteger(id)) {
      ipo.id = -1;
      this.addIpo(this.state.ipo);
    }
    else {
      ipo = {
        id: ipo.id,
        pricePerShare: ipo.pricePerShare,
        totalNumberOfShares: ipo.totalNumberOfShares,
        openDateTime: ipo.openDateTime,
        companyName: ipo.companyName,
        stockExchangeNames: ipo.stockExchangeNames
      }
      this.updateIpo(ipo);
    }
  }

  handleChange = (event) => {
    var ipo = this.state.ipo;
    if (event.target != null)
      ipo[event.target.name] = event.target.value;
    else if (Array.isArray(event)) {
      ipo["stockExchangeNames"] = [];
      event.forEach(e => {
        ipo[e.name].push(e.value);
      });
    }
    else {
      ipo[event.name] = event.value;
      if (event.name == "companyName") {
        var stockExchanges = this.getCompanyStockExchanges(event.id);
        this.setState({
          stockExchanges: stockExchanges
        })
      }
    }
    this.setState({ ipo: ipo });
  }

  componentDidMount() {
    this.getCompanies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id != this.props.id) {
      if (Number.isInteger(this.props.id)) {
        this.fetchIpoById(this.props.id);
      }
    }
  }

  render() {
    const id = this.props.id;
    const companies = this.state.companies.map(company => {
      return {
        label: company.companyName,
        name: "companyName",
        value: company.companyName,
        id: company.id
      };
    });

    if (Array.isArray(this.state.stockExchanges)) {
      var stockExchanges = this.state.stockExchanges.map(stockExchange => {
        return {
          label: stockExchange.name,
          name: "stockExchangeNames",
          value: stockExchange.name
        };
      });
    }
    const ipo = this.state.ipo;

    const addModal = <Modal open={this.props.open} onClose={this.props.handleClose}>
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Add IPO</h3>
          </div>
          <div className="modal-body">
            <div className="form-group m-2">
              <label htmlFor="companyName">Company Name</label>
              <Select
                type="text"
                className="form-control"
                name="companyName"
                options={companies}
                onChange={this.handleChange}
                required />
            </div>

            <div className="form-group m-2">
              <label htmlFor="stockExchangeNames">Stock Exchanges</label>
              <Select
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="stockExchangeNames"
                placeholder="Stock Exchange Names"
                options={stockExchanges}
                isMulti
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                onChange={this.handleChange}
                name="pricePerShare"
                placeholder="Price Per Share"
                step=".01"
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                onChange={this.handleChange}
                name="totalNumberOfShares"
                placeholder="Number of shares"
                min="0"
                step="1"
                required />
            </div >

            <div className="form-group m-2">
              <label htmlFor="openDateTime">Open Date Time</label>
              <input
                type="datetime-local"
                onChange={this.handleChange}
                className="form-control"
                name="openDateTime"
                placeholder="Open Date time"
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="remarks"
                placeholder="IPO Remarks"
                minLength="2"
                required />
            </div>
          </div>
          <div className="modal-footer d-flex flex-row justify-content-center">
            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            <button type="button" className="btn btn-danger" onClick={this.props.handleClose}>Close</button>
          </div>
        </form>
      </div>
    </Modal>

    const updateModal = <Modal open={this.props.open} onClose={this.props.handleClose}>
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Update IPO</h3>
          </div>
          <div className="modal-body">
            <div className="form-group m-2">
              <label htmlFor="companyName">Company Name</label>
              <Select
                type="text"
                className="form-control"
                name="companyName"
                options={companies}
                onChange={this.handleChange}
                value={
                  (Number.isInteger(id)) ?
                    companies.filter(option => {
                      return option.value === ipo.companyName
                    }): null
                }
                required />
            </div>

            <div className="form-group m-2">
              <label htmlFor="stockExchangeNames">Stock Exchanges</label>
              <Select
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="stockExchangeNames"
                placeholder="Stock Exchange Names"
                options={stockExchanges}
                value={
                  (Number.isInteger(id))?
                  stockExchanges.filter(option => {
                    return option.label == ipo.stockExchangeNames
                  })
                  : null
                }
                isMulti
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                onChange={this.handleChange}
                name="pricePerShare"
                placeholder="Price Per Share"
                step=".01"
                value={ipo.pricePerShare}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                onChange={this.handleChange}
                name="totalNumberOfShares"
                placeholder="Number of shares"
                value={ipo.totalNumberOfShares}
                min="0"
                step="1"
                required />
            </div >

            <div className="form-group m-2">
              <label htmlFor="openDateTime">Open Date Time</label>
              <input
                type="datetime-local"
                onChange={this.handleChange}
                className="form-control"
                name="openDateTime"
                placeholder="Open Date time"
                value={ipo.openDateTime}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="remarks"
                placeholder="IPO Remarks"
                value={ipo.remarks}
                minLength="2"
                required />
            </div>
          </div>
          <div className="modal-footer d-flex flex-row justify-content-center">
            <input type="submit" value="Submit" className="btn btn-primary btn-block" />
            <button type="button" className="btn btn-danger" onClick={this.props.handleClose}>Close</button>
          </div>
        </form>
      </div>
    </Modal>
    return (
      <div>
        {Number.isInteger(id) ? updateModal : addModal}
      </div>

    )
  }
}

export default AddIpo;
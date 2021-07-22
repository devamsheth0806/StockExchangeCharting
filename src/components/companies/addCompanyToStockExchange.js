import { Modal } from "@material-ui/core";
import { Component } from "react";
import Select from "react-select";
import companyServices from "../../services/company.services";
import companyStockMapServices from "../../services/companyStockMap.services";
import stockExchangeServices from "../../services/stockExchange.services";

class AddCompanyToStockExchange extends Component {

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
      stockExchanges: [],
      companies: [],
      companyStockMap: {}
    }

    this.getCompanies = this.getCompanies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getCompanies() {
    const response = await companyServices.getCompanies();
    this.setState({
      companies: response.data
    })
  }

  async getStockExchanges() {
    const response = await stockExchangeServices.getAllStockExchanges();
    this.setState({
      stockExchanges: response.data
    })
  }

  async addCompanyToStockExchange(companyStockMap){
    const response = await companyStockMapServices.addCompanyStockMap(companyStockMap);
  }

  async handleSubmit(event){
    event.preventDefault();
    // console.log(this.state.companyStockMap);
    var companyStockMap = this.state.companyStockMap;
    companyStockMap.id = -1;
    this.addCompanyToStockExchange(this.state.companyStockMap);
    this.props.handleClose();
  }

  handleChange = (event) => {
    var companyStockMap = this.state.companyStockMap;
    if (event.target != null)
      companyStockMap[event.target.name] = event.target.value;
    else
      companyStockMap[event.name] = event.value;
    this.setState({ companyStockMap: companyStockMap });
  }

  componentDidMount() {
    this.getCompanies();
    this.getStockExchanges();
  }

  render() {
    const stockExchanges = this.state.stockExchanges.map(stockExchange => {
      return {
        label: stockExchange.name,
        name: "stockExchangeName",
        value: stockExchange.name
      };
    });

    const companies = this.state.companies.map(company => {
      return {
        label: company.companyName,
        name: "companyName",
        value: company.companyName
      };
    });

    return (
      <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className="container" style={this.state.style}>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-header">
              <h3 className="modal-title">Add Company To Stock Exchange</h3>
            </div>
            <div className="modal-body">
              <div className="form-group m-2">
                <input
                  type="text"
                  className="form-control"
                  name="companyCode"
                  placeholder="Company Code"
                  minLength="2"
                  onChange={this.handleChange}
                  required />
              </div>

              <div className="form-group m-2">
                <label htmlFor="companyName" />
                <Select
                  type="text"
                  className="form-control"
                  name="companyName"
                  placeholder="Company Name"
                  minLength="2"
                  options={companies}
                  onChange={this.handleChange}
                  required />
              </div >
              <div className="form-group m-2">
                <label htmlFor="stockExchangeName" />
                <Select
                  type="text"
                  className="form-control"
                  name="stockExchangeName"
                  placeholder="Stock Exchange Name"
                  minLength="2"
                  options={stockExchanges}
                  onChange={this.handleChange}
                  required />
              </div >
              
            </div>
            <div className="modal-footer d-flex flex-row justify-content-center">
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
              <button type="button" className="btn btn-danger" onClick={this.props.handleClose}>Close</button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default AddCompanyToStockExchange;
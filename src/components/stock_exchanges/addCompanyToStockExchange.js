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
      companyStockMap: {company:{}}
    }

    this.getCompanies = this.getCompanies.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchCompanyStockMapById = this.fetchCompanyStockMapById.bind(this);
    this.updateCompanyToStockExchange = this.updateCompanyToStockExchange.bind(this);
    this.addCompanyToStockExchange = this.addCompanyToStockExchange.bind(this);
  }

  async getCompanies() {
    const response = await companyServices.getCompanies();
    this.setState({
      companies: response.data
    })
  }

  async fetchCompanyStockMapById(id) {
    const response = await companyStockMapServices.getCompanyStockMapById(id);
    this.setState({
      companyStockMap: response.data
    });
  }

  async addCompanyToStockExchange(companyStockMap) {
    await companyStockMapServices.addCompanyStockMap(companyStockMap);
    this.props.handleClose();
  }

  async updateCompanyToStockExchange(companyStockMap) {
    await companyStockMapServices.updateCompanyStockMap(companyStockMap);
    this.props.handleClose();
  }

  async handleSubmit(event) {
    event.preventDefault();
    var companyStockMap = this.state.companyStockMap;
    companyStockMap["stockExchangeName"] = this.props.name;
    const id = this.props.id;
    if (!Number.isInteger(id)) {
      companyStockMap.id = -1;
      this.addCompanyToStockExchange(companyStockMap);
    }
    else {
      companyStockMap.companyName = companyStockMap.company.companyName;
      this.updateCompanyToStockExchange(companyStockMap);
    }
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
    if (Number.isInteger(this.props.id)) {
      this.fetchCompanyStockMapById(this.props.id);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.id != this.props.id) {
      if (Number.isInteger(this.props.id)) {
        await this.fetchCompanyStockMapById(this.props.id);
      }
    }
  }

  render() {
    const companies = this.state.companies.map(company => {
      return {
        label: company.companyName,
        name: "companyName",
        value: company.companyName
      };
    });

    const companyStockMap = this.state.companyStockMap;

    const id = this.props.id;

    const addModal = <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
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
                className="form-control"
                name="companyName"
                placeholder="Company Name"
                options={companies}
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

    const updateModal = <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Update Company To Stock Exchange</h3>
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
                value={companyStockMap.companyCode}
                required />
            </div>

            <div className="form-group m-2">
              <label htmlFor="companyName" />
              <Select
                className="form-control"
                name="companyName"
                placeholder="Company Name"
                options={companies}
                onChange={this.handleChange}
                value={
                  (Number.isInteger(id)) ?
                    companies.filter(option => {
                      return option.value == companyStockMap.company.companyName
                    }) : null
                }
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

    return (
      <div>
        {Number.isInteger(id) ? updateModal : addModal}
      </div>
    )
  }
}

export default AddCompanyToStockExchange;
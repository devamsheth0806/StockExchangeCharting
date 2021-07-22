import { Component } from 'react';
import AddCompany from "./addCompany";
import axios from 'axios';
import companyServices from '../../services/company.services';
import AddCompanyToStockExchange from './addCompanyToStockExchange';

class Companies extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showToStock: false,
      companies: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleShowToStock = this.handleShowToStock.bind(this);
    this.handleCloseToStock = this.handleCloseToStock.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllCompanies = this.fetchAllCompanies.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleShowToStock() {
    this.setState({ showToStock: true });
  }

  handleCloseToStock() {
    this.setState({ showToStock: false });
  }

  async handleClose() {
    this.setState({ show: false });
    this.fetchAllCompanies();
  }

  componentDidMount() {
    this.fetchAllCompanies();
  }

  async fetchAllCompanies() {
    const response = await companyServices.getCompanies();
    this.setState({
      companies: response.data
    });
  }

  render() {
    const companies = this.state.companies.map((company) => {
      return <tr>
        <td>{company.companyName}</td>
        <td>{company.ceo}</td>
        <td>{company.turnover}</td>
        <td>{company.sector.sectorName}</td>
        <td>
          <a className="btn btn-secondary btn-sm">
            Edit
          </a>
        </td>
        <td>
          <button className="btn btn-secondary btn-sm">
            Delete
          </button>
        </td>
      </tr>
    });


    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center">
          <h1 className="text-primary">Companies</h1>
        </div>
        <div className="d-flex flex-row-reverse m-2">
          <button className="btn btn-primary" onClick={this.handleShow}>Add Company</button>
          <button className="btn btn-primary" onClick={this.handleShowToStock}>Add Company To Stock Exchange</button>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Company name</th>
                <th>CEO</th>
                <th>Turnover</th>
                <th>Sector</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {companies}
            </tbody>
          </table >
        </div>
        <AddCompany handleClose={this.handleClose} open={this.state.show} />
        <AddCompanyToStockExchange handleClose={this.handleCloseToStock} open={this.state.showToStock} />
      </div >
    )
  }
}

export default Companies;
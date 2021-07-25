import { Component, createRef } from 'react';
import AddCompany from "./addCompany";
import companyServices from '../../services/company.services';
import Select from 'react-select';
import UserContext from "../../contexts/userContext";
class Companies extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      show: false,
      searchedCompany: [],
      companies: [],
      id: null,
      update: false,
      fetched: false
    };

    this.searchRef = createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllCompanies = this.fetchAllCompanies.bind(this);
    this.dosearch = this.dosearch.bind(this);
  }

  handleShow(id) {
    this.setState({ show: true, id: id });
  }

  handleClose() {
    this.setState({ update: true, show: false });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllCompanies();
  }

  dosearch() {
    let searchval = this.searchRef.current.state.value;//get node value or text value
    if (searchval != null) {
      this.searchRef.current.state.value = null;
      this.fetchCompanyById(searchval.value);
    }
    else {
      this.setState({
        searchedCompany: []
      })
      this.fetchAllCompanies();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      this.fetchAllCompanies();
      this.setState({ update: false });
    }
    if (this.state.fetched) {
      this.setState({ fetched: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async delete(id) {
    await companyServices.deleteCompany(id);
    this.setState({
      update: true
    })
  }

  async fetchCompanyById(id) {
    if (this._isMounted) {
      const response = await companyServices.getCompanyById(id);
      this.setState({
        searchedCompany: [response.data],
        fetched: true
      });
    }
  }

  async fetchAllCompanies() {
    if (this._isMounted) {
      const response = await companyServices.getCompanies();
      this.setState({
        companies: response.data,
        fetched: true
      });
    }
  }

  render() {
    var companies;
    if (this.state.searchedCompany.length > 0) {
      companies = this.state.searchedCompany.map((company) => {
        return <tr key={company.id}>
          <td>{company.companyName}</td>
          <td>{company.ceo}</td>
          <td>{company.turnover}</td>
          <td>{company.sector.sectorName}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(company.id)}>
                  Edit
                </button>
              </td>
              :
              null
          }
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(company.id)} >
                  Delete
                </button>
              </td>
              :
              null
          }
        </tr>
      });
    }
    else {
      companies = this.state.companies.map((company) => {
        return <tr key={company.id}>
          <td>{company.companyName}</td>
          <td>{company.ceo}</td>
          <td>{company.turnover}</td>
          <td>{company.sector.sectorName}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(company.id)}>
                  Edit
                </button>
              </td>
              :
              null
          }
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(company.id)} >
                  Delete
                </button>
              </td>
              :
              null
          }
        </tr>
      });
    }

    const companyOptions = this.state.companies.map(company => {
      return {
        label: company.companyName,
        value: company.id
      };
    });


    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center">
          <h1 className="text-primary">Companies</h1>
        </div>
        <div className="d-flex flex-row m-2">
          <div className="m-1 flex-fill">
            <Select
              type="text"
              className="form-control"
              placeholder="Search Companies"
              ref={this.searchRef}
              options={companyOptions}
            />
          </div>
          <button className="btn btn-primary btn-block m-1" type="button" onClick={this.dosearch} >
            Go
          </button>

          {
            this.context.user == "ADMIN"
              ?
              <button className="btn btn-primary m-1 " onClick={this.handleShow}>Add Company</button>
              :
              null
          }
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Company name</th>
                <th>CEO</th>
                <th>Turnover</th>
                <th>Sector</th>
                {
                  this.context.user == "ADMIN"
                    ?
                    <th>Edit </th>
                    :
                    null
                }
                {
                  this.context.user == "ADMIN"
                    ?
                    <th>Delete</th>
                    :
                    null
                }
              </tr>
            </thead>
            <tbody>
              {companies}
            </tbody>
          </table >
        </div>
        <AddCompany handleClose={this.handleClose} open={this.state.show} id={this.state.id} />
      </div >
    )
  }
}

export default Companies;
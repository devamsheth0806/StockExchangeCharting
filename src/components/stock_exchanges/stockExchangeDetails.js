import { Component } from 'react';
import UserContext from '../../contexts/userContext';
import companyStockMapServices from '../../services/companyStockMap.services';
import AddCompanyToStockExchange from './addCompanyToStockExchange';
class StockExchangeDetails extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      update: false,
      fetched: false,
      stockExchange: {},
      companyStockMaps: [],
      id: null
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllCompaniesByStockExchange = this.fetchAllCompaniesByStockExchange.bind(this);
  }

  handleShow(id) {
    this.setState({ show: true, id: id });
  }

  handleClose() {
    this.setState({ show: false, update: true });
  }

  async delete(id) {
    await companyStockMapServices.deleteCompanyStockMap(id);
    this.setState({
      update: true
    })
  }

  async fetchAllCompaniesByStockExchange(stockExchange) {
    if (this._isMounted) {
      const response = await companyStockMapServices.getStockExchangeCompanies(stockExchange);
      this.setState({
        companyStockMaps: response.data,
        fetched: true,
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllCompaniesByStockExchange(this.props.stockExchange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update || prevProps.stockExchange != this.props.stockExchange) {
      this.fetchAllCompaniesByStockExchange(this.props.stockExchange);
      this.setState({ update: false });
    }
    if (this.state.fetched) {
      this.setState({ fetched: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    const companies = this.state.companyStockMaps.map(companyStockMap => {
      return <tr key={companyStockMap.id}>
        <td>{companyStockMap.companyCode}</td>
        <td>{companyStockMap.company.companyName}</td>
        {
          this.context.user == "ADMIN"
            ?
            <td>
              <button className="btn btn-success btn-sm" onClick={() => this.handleShow(companyStockMap.id)}>
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
              <button className="btn btn-danger btn-sm" onClick={() => this.delete(companyStockMap.id)} >
                Delete
              </button>
            </td>
            :
            null
        }

      </tr>
    });
    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center">
          <h1 className="text-primary">{this.props.stockExchange.name}</h1>
        </div>
        {
          this.context.user == "ADMIN"
            ?
            <div className="d-flex flex-row-reverse m-2">
              <button className="btn btn-primary" onClick={this.handleShow}>Add Company</button>
            </div>
            :
            null
        }
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Company Code</th>
                <th>Company Name</th>
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
        <AddCompanyToStockExchange id={this.state.id} name={this.props.stockExchange.name} handleClose={this.handleClose} open={this.state.show} />
      </div >
    )
  }
}

export default StockExchangeDetails;
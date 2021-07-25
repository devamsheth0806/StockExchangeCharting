import { Component, createRef } from 'react';
import AddStockExchange from "./addStockExchange";
import stockExchangeServices from '../../services/stockExchange.services';
import Select from 'react-select';
import StockExchangeDetails from './stockExchangeDetails';
import UserContext from '../../contexts/userContext';
class StockExchanges extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      show: false,
      update: false,
      fetched: false,
      showStock: false,
      searchedStockExchange: [],
      stockExchanges: [],
      stockExchange: null,
      id: null
    };
    this.searchRef = createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseStock = this.handleCloseStock.bind(this);
    this.handleShowStock = this.handleShowStock.bind(this);
    this.fetchAllStockExchanges = this.fetchAllStockExchanges.bind(this);
    this.fetchStockExchangeById = this.fetchStockExchangeById.bind(this);
    this.dosearch = this.dosearch.bind(this);
  }

  handleShow(id) {
    this.setState({ show: true, id: id });
  }

  handleShowStock(stockExchange) {
    this.setState({ showStock: true, stockExchange: stockExchange });
  }

  handleClose() {
    this.setState({ show: false, update: true });
  }

  handleCloseStock() {
    this.setState({ showStock: false, update: true });
  }

  async delete(id) {
    await stockExchangeServices.deleteStockExchange(id);
    this.setState({
      update: true
    })
  }

  async fetchStockExchangeById(id) {
    if (this._isMounted) {
      const response = await stockExchangeServices.getStockExchangeById(id);
      this.setState({
        searchedStockExchange: [response.data],
        fetched: true
      });
    }
  }

  async fetchAllStockExchanges() {
    if (this._isMounted) {
      const response = await stockExchangeServices.getAllStockExchanges();
      this.setState({
        stockExchanges: response.data,
        fetched: true
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllStockExchanges();
  }

  dosearch() {
    let searchval = this.searchRef.current.state.value;//get node value or text value
    if (searchval != null) {
      this.searchRef.current.state.value = null;
      this.fetchStockExchangeById(searchval.value);
    }
    else {
      this.setState({
        searchedStockExchange: []
      })
      this.fetchAllStockExchanges();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      this.fetchAllStockExchanges();
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

    var stockExchanges;
    if (this.state.searchedStockExchange.length > 0) {
      stockExchanges = this.state.searchedStockExchange.map(stockExchange => {
        return <tr key={stockExchange.id}>
          <td>
            <button className="btn btn-link btn-sm" onClick={() => this.handleShowStock(stockExchange)}>
              {stockExchange.name}
            </button>
          </td>
          <td>{stockExchange.address}</td>
          <td>{stockExchange.remarks}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(stockExchange.id)}>
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
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(stockExchange.id)} >
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
      stockExchanges = this.state.stockExchanges.map(stockExchange => {
        return <tr key={stockExchange.id}>
          <td>
            <button className="btn btn-link btn-sm" onClick={() => this.handleShowStock(stockExchange)}>
              {stockExchange.name}
            </button>
          </td>
          <td>{stockExchange.address}</td>
          <td>{stockExchange.remarks}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(stockExchange.id)}>
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
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(stockExchange.id)} >
                  Delete
                </button>
              </td>
              :
              null
          }
        </tr>
      });
    }
    const stockExchangeOptions = this.state.stockExchanges.map(stockExchange => {
      return {
        label: stockExchange.name,
        value: stockExchange.id
      };
    });

    return (
      (!this.state.showStock) ? (
        <div className="container">
          <div className="d-flex flex-row justify-content-center">
            <h1 className="text-primary">Stock Exchanges</h1>
          </div>
          <div className="d-flex flex-row m-2">
            <div className="m-1 flex-fill">
              <Select
                type="text"
                className="form-control"
                placeholder="Search Stock Exchanges"
                ref={this.searchRef}
                options={stockExchangeOptions}
              />
            </div>
            <button className="btn btn-primary btn-block m-1" type="button" onClick={this.dosearch} >
              Go
            </button>
            {
              this.context.user == "ADMIN"
                ?
                <button className="btn btn-primary" onClick={this.handleShow}>Add Stock Exchange</button>
                :
                null
            }

          </div>
          <div className="d-flex flex-row">
            <table className="table table-striped">
              <thead className="thead-inverse thead-dark">
                <tr className="table-dark">
                  <th>Stock exchange name</th>
                  <th>address</th>
                  <th>remarks</th>
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
                {stockExchanges}
              </tbody>
            </table >
          </div>
          <AddStockExchange handleClose={this.handleClose} open={this.state.show} id={this.state.id} />
        </div >)
        :
        (
          <div className="container">
            <button className="btn btn-primary" onClick={this.handleCloseStock} >Back</button>
            <StockExchangeDetails stockExchange={this.state.stockExchange} />
          </div>
        )
    )
  }
}

export default StockExchanges;
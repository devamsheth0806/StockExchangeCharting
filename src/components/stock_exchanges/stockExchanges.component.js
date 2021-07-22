import { Component } from 'react';
import AddStockExchange from "./addStockExchange";
import axios from 'axios';
import stockExchangeServices from '../../services/stockExchange.services';
class StockExchanges extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      stockExchanges: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllStockExchanges = this.fetchAllStockExchanges.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
    this.fetchAllStockExchanges();
  }

  async fetchAllStockExchanges() {
    const response = await stockExchangeServices.getAllStockExchanges();
    this.setState({
      stockExchanges: response.data
    });
  }

  componentDidMount() {
    this.fetchAllStockExchanges();
  }

  render() {
    const stockExchanges = this.state.stockExchanges.map(stockExchange => {
      return <tr>
        <td>{stockExchange.name}</td>
        <td>{stockExchange.address}</td>
        <td>{stockExchange.remarks}</td>
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
          <h1 className="text-primary">Stock Exchanges</h1>
        </div>
        <div className="d-flex flex-row-reverse m-2">
          <button className="btn btn-primary" onClick={this.handleShow}>Add Stock Exchange</button>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Stock exchange name</th>
                <th>address</th>
                <th>remarks</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {stockExchanges}
            </tbody>
          </table >
        </div>
        <AddStockExchange handleClose={this.handleClose} open={this.state.show} />
      </div >
    )
  }
}

export default StockExchanges;
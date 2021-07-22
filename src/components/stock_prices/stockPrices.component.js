import { Component } from 'react';
import UploadStockPrices from './uploadStockPrices';
import axios from 'axios';
class StockPrices extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      stockPrices: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllStockPrices = this.fetchAllStockPrices.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }
  async fetchAllStockPrices() {
    const response = await axios.get("http://localhost:8080/stockprices");
    this.setState({
      stockPrices: response.data
    });
  }
  
  componentDidMount(){
    this.fetchAllStockPrices();
  }

  render() {
    const stockPrices = this.state.stockPrices.map(stockPrice => {
      return <tr key={stockPrice.id}>
        <td>{stockPrice.companyCode}</td>
        <td>{stockPrice.exchangeName}</td>
        <td>{stockPrice.sharePrice}</td>
        <td>{stockPrice.datee}</td>
        <td>{stockPrice.timee}</td>
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
          <h1 className="text-primary">Stock Prices</h1>
        </div>
        <div className="d-flex flex-row-reverse m-2">
          <button className="btn btn-primary" onClick={this.handleShow}>Upload Excel</button>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Company Code</th>
                <th>Stock exchange</th>
                <th>Current Price</th>
                <th>Date</th>
                <th>Time</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {stockPrices}
            </tbody>
          </table >
        </div>
        <UploadStockPrices handleClose={this.handleClose} open={this.state.show} />
      </div >
    )
  }
}

export default StockPrices;
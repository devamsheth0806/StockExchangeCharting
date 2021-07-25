import { Component } from 'react';
import UploadStockPrices from './uploadStockPrices';
import stockPriceServices from '../../services/stockPrice.services';
import UserContext from "../../contexts/userContext";
class StockPrices extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      show: false,
      update: false,
      fetched: false,
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
    this.setState({ show: false, update: true });
  }

  async delete(id) {
    await stockPriceServices.deleteStockPrice(id);
    this.setState({
      update: true
    })
  }

  async fetchAllStockPrices() {
    if (this._isMounted) {
      const response = await stockPriceServices.getStockPrices();
      this.setState({
        stockPrices: response.data,
        fetched: true
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllStockPrices();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      this.fetchAllStockPrices();
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

    const stockPrices = this.state.stockPrices.map(stockPrice => {
      return <tr key={stockPrice.id}>
        <td>{stockPrice.companyCode}</td>
        <td>{stockPrice.exchangeName}</td>
        <td>{stockPrice.sharePrice}</td>
        <td>{stockPrice.datee}</td>
        <td>{stockPrice.timee}</td>
        {
          this.context.user == "ADMIN"
            ?
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => this.delete(stockPrice.id)} >
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
          <h1 className="text-primary">Stock Prices</h1>
        </div>

        <div className="d-flex flex-row-reverse m-2">
          {
            this.context.user == "ADMIN"
              ?
              <button className="btn btn-primary" onClick={this.handleShow}>Upload Excel</button>
              :
              null
          }

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
import { Modal } from "@material-ui/core";
import { Component } from "react";
import stockExchangeServices from "../../services/stockExchange.services";

class AddStockExchange extends Component {

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
      stockExchange: {}
    }
    this.addStockExchange = this.addStockExchange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchStockExchangeById = this.fetchStockExchangeById.bind(this);
    this.updateStockExchange = this.updateStockExchange.bind(this);
  }

  async fetchStockExchangeById(id) {
    const response = await stockExchangeServices.getStockExchangeById(id);
    this.setState({
      stockExchange: response.data
    })
    
  }

  async addStockExchange(stockExchange) {
    await stockExchangeServices.addStockExchange(stockExchange).statusText;
    this.props.handleClose();
  }

  async updateStockExchange(stockExchange) {
    await stockExchangeServices.updateStockExchange(stockExchange).statusText;
    this.props.handleClose();
  }


  handleSubmit(event) {
    event.preventDefault();
    var stockExchange = this.state.stockExchange;
    const id = this.props.id;
    if (!Number.isInteger(id)) {
      stockExchange.id = -1;
      this.addStockExchange(this.state.stockExchange);
    }
    else
      this.updateStockExchange(stockExchange);
    this.props.handleClose();
  }

  handleChange = (event) => {
    var stockExchange = this.state.stockExchange;
    stockExchange[event.target.name] = event.target.value;
    this.setState({ stockExchange: stockExchange });
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.id != this.props.id) {
      if (Number.isInteger(this.props.id)) {
        this.fetchStockExchangeById(this.props.id);
      }
    }
  }

  render() {

    const stockExchange = this.state.stockExchange;

    const addModal = <Modal open={this.props.open} onClose={this.props.handleClose} >
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Add Stock Exchange</h3>
          </div>
          <div className="modal-body">
            <div className="form-group m-2">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="name"
                placeholder="Stock Exchange Name"
                minLength="2"

                required />
            </div>

            <div className="form-group m-2">
              <textarea
                onChange={this.handleChange}
                className="form-control"
                name="brief"
                placeholder="Brief"
                minLength="2"
                required />
            </div >

            <div className="form-group m-2">
              <textarea
                onChange={this.handleChange}
                className="form-control"
                name="address"
                placeholder="Address"
                minLength="2"
                required />
            </div >

            <div className="form-group m-2">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="remarks"
                placeholder="Remarks"
                minLength="2"
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

    const updateModal = <Modal open={this.props.open} onClose={this.props.handleClose} >
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Update Stock Exchange</h3>
          </div>
          <div className="modal-body">
            <div className="form-group m-2">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="name"
                placeholder="Stock Exchange Name"
                minLength="2"
                value={stockExchange.name}
                required />
            </div>

            <div className="form-group m-2">
              <textarea
                onChange={this.handleChange}
                className="form-control"
                name="brief"
                placeholder="Brief"
                minLength="2"
                value={stockExchange.brief}
                required />
            </div >

            <div className="form-group m-2">
              <textarea
                onChange={this.handleChange}
                className="form-control"
                name="address"
                placeholder="Address"
                minLength="2"
                value={stockExchange.address}
                required />
            </div >

            <div className="form-group m-2">
              <input
                onChange={this.handleChange}
                type="text"
                className="form-control"
                name="remarks"
                placeholder="Remarks"
                minLength="2"
                value={stockExchange.remarks}
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

    const id = this.props.id;
    return (
      <div>
        {Number.isInteger(id) ? updateModal : addModal}
      </div>
    )
  }
}

export default AddStockExchange;
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
  }

  async addStockExchange(stockExchange) {
    const response = await stockExchangeServices.addStockExchange(stockExchange).statusText;
    console.log(response);
  }

  handleSubmit(event) {
    event.preventDefault();
    var stockExchange = this.state.stockExchange;
    stockExchange.id = -1;
    this.addStockExchange(this.state.stockExchange);
    this.props.handleClose();
  }

  handleChange = (event) => {
    var stockExchange = this.state.stockExchange;
    stockExchange[event.target.name] = event.target.value;
    this.setState({ stockExchange: stockExchange });
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose} >
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
              <input type="submit" value="Submit" className="btn btn-primary btn-block" data-dismiss="modal" />
              <button type="button" className="btn btn-danger" onClick={this.props.handleClose}>Close</button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default AddStockExchange;
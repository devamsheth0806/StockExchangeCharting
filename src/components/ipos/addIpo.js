import { Modal } from "@material-ui/core";
import { Component } from "react";

class AddIpo extends Component {

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
    }
  }
  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose}>
        <div className="container" style={this.state.style}>
          <form>
            <div className="modal-header">
              <h3 className="modal-title">Add IPO</h3>
            </div>
            <div className="modal-body">
              <div className="form-group m-2">
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  placeholder="Company Name"
                  minLength="2"
                  required />
              </div>

              <div className="form-group m-2">
                <input
                  type="text"
                  className="form-control"
                  name="stockExchangeName"
                  placeholder="Stock Exchange Name"
                  minLength="2"
                  required />
              </div >

              <div className="form-group m-2">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  placeholder="Price Per Share"
                  required />
              </div >

              <div className="form-group m-2">
                <input
                  type="number"
                  className="form-control"
                  name="shares"
                  placeholder="Number of shares"
                  min="0"
                  step="1"
                  required />
              </div >

              <div className="form-group m-2">
                <label htmlFor="openDateTime">Open Date Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="openDateTime"
                  placeholder="Open Date time"
                  required />
              </div >

              <div className="form-group m-2">
                <input
                  type="text"
                  className="form-control"
                  name="remarks"
                  placeholder="IPO Remarks"
                  minLength="2"
                  required />
              </div>
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

export default AddIpo;
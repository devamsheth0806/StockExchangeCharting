import { Modal } from "@material-ui/core";
import { Component } from "react";

class UploadStockPrices extends Component {

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
      <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className="container" style={this.state.style}>
          <form>
            <div className="modal-header">
              <h3 className="modal-title">Upload Stock Prices</h3>
            </div>
            <div className="modal-body">
              <div className="form-group m-2">
                <label for="stockPricesExcelSheet">Upload Excel File</label>
                <input
                  type="file"
                  className="form-control"
                  name="stockPricesExcelSheet"
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

export default UploadStockPrices;
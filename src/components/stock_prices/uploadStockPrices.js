import { Modal } from "@material-ui/core";
import { Component } from "react";
import XLSX from "xlsx";
import stockPriceServices from "../../services/stockPrice.services";
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
      data: [],
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async submitShares(shares) {
    await stockPriceServices.addStockPrices(shares);
    this.props.handleClose();
  }

  handleSubmit(event) {
    event.preventDefault();
    // var data = this.state.data;
    // data.id = -1;
    this.submitShares(this.state.data);
  }

  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {

      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // console.log(ws);

      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
      // console.log(JSON.stringify(data) + "this data needs to be passed to rest endpoint to save prices");

      // remove header row
      data.shift();

      const formattedData = [];
      data.forEach(d => {
        const share = {
          "id": -1,
          "companyCode": d[0].trim(),
          "exchangeName": d[1].trim(),
          "sharePrice": parseFloat(d[2].trim()),
          "datee": d[3].trim(),
          "timee": d[4].trim()
        }
        formattedData.push(share);
      });

      // console.log(formattedData);

      /* Update state */
      this.setState({ data: formattedData });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className="container" style={this.state.style}>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-header">
              <h3 className="modal-title">Upload Stock Prices</h3>
            </div>
            <div className="modal-body">
              <DragDropFile handleFile={this.handleFile}>
                <div className="row">
                  <div className="col-xs-12">
                    <DataInput handleFile={this.handleFile} />
                  </div>
                </div>
              </DragDropFile>
            </div>
            <div className="modal-footer d-flex flex-row justify-content-center">
              <input type="submit" value="Submit" className="btn btn-primary btn-block" />
              <button type="button" className="btn btn-danger" onClick={this.props.handleClose}>Close</button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }

}

const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

class DragDropFile extends Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

class DataInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="file">Spreadsheet</label>
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default UploadStockPrices;
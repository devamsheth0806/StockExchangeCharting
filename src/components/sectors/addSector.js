import { Modal } from "@material-ui/core";
import { Component } from "react";
import sectorServices from "../../services/sector.services";

class AddSector extends Component {

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
      sector:{}
    }
    this.addSector = this.addSector.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async addSector(sector){
    const response = await sectorServices.addSector(sector).statusText;    
    // console.log(response);
  }

  handleSubmit(event){
    event.preventDefault();
    var sector = this.state.sector;
    sector.id = -1;
    // console.log(sector);
    this.addSector(this.state.sector);
    this.props.handleClose();
  }

  handleChange = (event) => {
    var sector = this.state.sector;
    if (event.target != null)
      sector[event.target.name] = event.target.value;
    else
      sector.sectorName = event.value;
    this.setState({ sector: sector });
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.handleClose}>
        <div className="container" style={this.state.style}>
          <form onSubmit={this.handleSubmit}>
            <div className="modal-header">
              <h3 className="modal-title">Add Sector</h3>
            </div>
            <div className="modal-body">
              <div className="form-group m-2">
                <input
                  type="text"
                  className="form-control"
                  name="sectorName"
                  placeholder="Sector Name"
                  minLength="2"
                  onChange={this.handleChange}
                  required />
              </div>

              <div className="form-group m-2">
                <textarea
                  type="text"
                  className="form-control"
                  name="brief"
                  placeholder="Brief"
                  minLength="2"
                  onChange={this.handleChange}
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
    )
  }
}

export default AddSector;
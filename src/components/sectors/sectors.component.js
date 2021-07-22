import AddSector from "./addSector";
import { Component } from "react";
import axios from 'axios';
import sectorServices from "../../services/sector.services";

class Sectors extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      sectors: []
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllSectors = this.fetchAllSectors.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }

  async handleClose() {
    this.setState({ show: false });
    this.fetchAllSectors();
  }

  async fetchAllSectors() {
    const response = await sectorServices.getAllSectors();
    this.setState({
      sectors: response.data
    });
  }

  componentDidMount(){
    this.fetchAllSectors();
  }

  render() {
    const sectors = this.state.sectors.map(sector => {
      return <tr>
        <td>{sector.sectorName}</td>
        <td>{sector.brief}</td>
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
          <h1 className="text-primary">Sectors</h1>
        </div>
        <div className="d-flex flex-row-reverse m-2">
          <button className="btn btn-primary" onClick={this.handleShow}>Add Sector</button>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Sector Name</th>
                <th>Brief</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {sectors}
            </tbody>
          </table >
        </div>
        <AddSector handleClose={this.handleClose} open={this.state.show} />
      </div >
    )
  }
}

export default Sectors;
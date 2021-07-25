import AddSector from "./addSector";
import { Component, createRef } from "react";
import sectorServices from "../../services/sector.services";
import Select from "react-select";
import SectorDetails from "./sectorDetails";
import UserContext from "../../contexts/userContext";

class Sectors extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      show: false,
      showSector: false,
      update: false,
      fetched: false,
      searchedSector: [],
      sector: null,
      sectors: [],
      id: null
    };
    this.searchRef = createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowSector = this.handleShowSector.bind(this);
    this.handleCloseSector = this.handleCloseSector.bind(this);
    this.fetchAllSectors = this.fetchAllSectors.bind(this);
    this.dosearch = this.dosearch.bind(this);
    this.fetchSectorById = this.fetchSectorById.bind(this);
  }

  handleShow(id) {
    this.setState({ show: true, id: id });
  }

  handleShowSector(sector) {
    this.setState({ showSector: true, sector });
  }

  handleClose() {
    this.setState({ show: false, update: true });
  }

  handleCloseSector() {
    this.setState({ showSector: false, sector: null });
  }

  async delete(id) {
    await sectorServices.deleteSector(id);
    this.setState({
      update: true
    })
  }

  async fetchSectorById(id) {
    if (this._isMounted) {
      const response = await sectorServices.getSectorById(id);
      this.setState({
        searchedSector: [response.data],
        fetched: true
      })
    }
  }

  async fetchAllSectors() {
    if (this._isMounted) {
      const response = await sectorServices.getAllSectors();
      this.setState({
        sectors: response.data,
        fetched: true
      });
    }
  }

  dosearch() {
    let searchval = this.searchRef.current.state.value;//get node value or text value
    if (searchval != null) {
      this.searchRef.current.state.value = null;
      this.fetchSectorById(searchval.value);
    }
    else {
      this.setState({
        searchedSector: []
      })
      this.fetchAllSectors();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllSectors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      this.fetchAllSectors();
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
    var sectors;
    if (this.state.searchedSector.length > 0) {
      sectors = this.state.searchedSector.map(sector => {
        return <tr key={sector.id}>
          <td>
            <button className="btn btn-link btn-sm" onClick={() => this.handleShowSector(sector)}>
              {sector.sectorName}
            </button>
          </td>
          <td>{sector.brief}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(sector.id)}>
                  Edit
                </button>
              </td>
              :
              null
          }
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(sector.id)} >
                  Delete
                </button>
              </td>
              :
              null
          }
        </tr>
      });
    }
    else {
      sectors = this.state.sectors.map(sector => {
        return <tr key={sector.id}>
          <td>
            <button className="btn btn-link btn-sm" onClick={() => this.handleShowSector(sector)}>
              {sector.sectorName}
            </button>
          </td>
          <td>{sector.brief}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(sector.id)}>
                  Edit
                </button>
              </td>
              :
              null
          }
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(sector.id)} >
                  Delete
                </button>
              </td>
              :
              null
          }
        </tr>
      });
    }

    const sectorOptions = this.state.sectors.map(sector => {
      return {
        label: sector.sectorName,
        value: sector.id
      };
    });

    return (
      (!this.state.showSector) ? (
        <div className="container">
          <div className="d-flex flex-row justify-content-center">
            <h1 className="text-primary">Sectors</h1>
          </div>
          <div className="d-flex flex-row m-2">
            <div className="m-1 flex-fill">
              <Select
                type="text"
                className="form-control"
                placeholder="Search for Sectors"
                ref={this.searchRef}
                options={sectorOptions}
              />
            </div>
            <button className="btn btn-primary btn-block m-1" type="button" onClick={this.dosearch} >
              Go
            </button>
            {
              this.context.user == "ADMIN"
                ?
                <button className="btn btn-primary" onClick={this.handleShow}>Add Sector</button>
                :
                null
            }
          </div>
          <div className="d-flex flex-row">
            <table className="table table-striped">
              <thead className="thead-inverse thead-dark">
                <tr className="table-dark">
                  <th>Sector Name</th>
                  <th>Brief</th>
                  {
                    this.context.user == "ADMIN"
                      ?
                      <th>Edit </th>
                      :
                      null
                  }
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
                {sectors}
              </tbody>
            </table >
          </div>
          <AddSector handleClose={this.handleClose} open={this.state.show} id={this.state.id} />
        </div >) : (
        <div className="container">
          <button className="btn btn-primary" onClick={this.handleCloseSector} >Back</button>
          <SectorDetails sector={this.state.sector} />
        </div>
      )
    )
  }
}

export default Sectors;
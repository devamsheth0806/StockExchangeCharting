import { Modal } from "@material-ui/core";
import { Component } from "react";
import Select from "react-select";
import sectorServices from "../../services/sector.services";
import companyServices from "../../services/company.services";
class AddCompany extends Component {

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
      sectors: [],
      company: { sector: {} }
    }
    this.getSectors = this.getSectors.bind(this);
    this.addCompany = this.addCompany.bind(this);
    this.fetchCompanyById = this.fetchCompanyById.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getSectors() {
    const response = await sectorServices.getAllSectors();
    this.setState({
      sectors: response.data
    })
  }

  async fetchCompanyById(id) {
    const response = await companyServices.getCompanyById(id);
    this.setState({
      company: response.data
    })
  }

  async updateCompany(company) {
    await companyServices.updateCompany(company);
    this.props.handleClose();
  }

  async addCompany(company) {
    await companyServices.addCompany(company);
    this.props.handleClose();
  }

  async handleSubmit(event) {
    event.preventDefault();
    var company = this.state.company;
    const id = this.props.id;
    if (!Number.isInteger(id)){
      company.id = -1;
      this.addCompany(this.state.company);
    }
    else{
      company = {
        id: company.id,
        companyName:company.companyName,
        turnover:company.turnover,
        ceo: company.ceo,
        boardOfDirectors: company.boardOfDirectors,
        sectorName: company.sector.sectorName,
        companyBrief: company.companyBrief
      }
      this.updateCompany(company);
    }
  }

  handleChange = (event) => {
    var company = this.state.company;
    if (event.target != null)
      company[event.target.name] = event.target.value;
    else
      company.sectorName = event.value;
    this.setState({ company: company });
  }

  componentDidMount() {
    this.getSectors();
    if (Number.isInteger(this.props.id)) {
      this.fetchCompanyById(this.props.id);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.id != this.props.id) {
      if (Number.isInteger(this.props.id)) {
        await this.fetchCompanyById(this.props.id);
      }
    }
  }

  render() {
    
    const sectors = this.state.sectors.map(sector => {
      return {
        label: sector.sectorName,
        value: sector.sectorName
      };
    });

    const company = this.state.company;

    const addModal = <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Add Company</h3>
          </div>
          <div className="modal-body">
            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="companyName"
                placeholder="Company Name"
                minLength="2"
                onChange={this.handleChange}
                required />
            </div>

            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                name="turnover"
                placeholder="Company Turnover"
                step="0.01"
                onChange={this.handleChange}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="ceo"
                placeholder="Chief Executive Officer"
                minLength="2"
                onChange={this.handleChange}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="boardOfDirectors"
                placeholder="Board Of Directors (seperated by comma)"
                minLength="2"
                onChange={this.handleChange}
                required />
            </div>

            <div className="form-group m-2">
              <label htmlFor="sectorName">Sector Name:</label>
              <Select
                className="form-control"
                name="sectorName"
                placeholder="Sector Name"
                options={sectors}
                onChange={this.handleChange}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="companyBrief"
                placeholder="Company Brief"
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

    const updateModal = <Modal open={this.props.open} onClose={this.props.handleClose} aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className="container" style={this.state.style}>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-header">
            <h3 className="modal-title">Update Company</h3>
          </div>
          <div className="modal-body">
            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="companyName"
                placeholder="Company Name"
                minLength="2"
                value={company.companyName}
                onChange={this.handleChange}
                required />
            </div>

            <div className="form-group m-2">
              <input
                type="number"
                className="form-control"
                name="turnover"
                placeholder="Company Turnover"
                step="0.01"
                value={company.turnover}
                onChange={this.handleChange}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="ceo"
                placeholder="Chief Executive Officer"
                minLength="2"
                value={company.ceo}
                onChange={this.handleChange}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="boardOfDirectors"
                placeholder="Board Of Directors (seperated by comma)"
                minLength="2"
                value={company.boardOfDirectors}
                onChange={this.handleChange}
                required />
            </div>

            <div className="form-group m-2">
              <label htmlFor="sectorName">Sector Name:</label>
              <Select
                className="form-control"
                name="sectorName"
                placeholder="Sector Name"
                value={
                  sectors.filter(option => {
                    return option.value === company.sector.sectorName
                  })
                }

                options={sectors}
                onChange={this.handleChange}
                required />
            </div >

            <div className="form-group m-2">
              <input
                type="text"
                className="form-control"
                name="companyBrief"
                placeholder="Company Brief"
                minLength="2"
                value={company.companyBrief}
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

    const id = this.props.id;
    return (
      <div>
        {Number.isInteger(id) ? updateModal : addModal}
      </div>
    )
  }
}

export default AddCompany;
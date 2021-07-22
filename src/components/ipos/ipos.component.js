import {Component} from 'react';
import AddIpo from './addIpo';
import axios from 'axios';
class Ipos extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      ipos:[]
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fetchAllIpos = this.fetchAllIpos.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
  }
  
  handleClose() {
    this.setState({ show: false });
  }

  async fetchAllIpos(){
    const response = await axios.get("http://localhost:8080/ipos");
    this.setState({
      ipos: response.data
    });
  }

  componentDidMount(){
    this.fetchAllIpos();
  }

  render() {
    const ipos = this.state.ipos.map((ipo) => {
      return <tr>
        <td>{ipo.companyName}</td>
        <td>{ipo.pricePerShare}</td>
        <td>{ipo.totalNumberOfShares}</td>
        <td>{ipo.openDateTime}</td>
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
          <h1 className="text-primary">IPOs</h1>
        </div>
        <div className="d-flex flex-row-reverse m-2">
          <button className="btn btn-primary" onClick={this.handleShow}>Add IPO</button>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Company name</th>
                <th>Price Per Share</th>
                <th>Number of Shares</th>
                <th>Open Date Time</th>
                <th>Edit </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {ipos}
            </tbody>
          </table >
        </div>
        <AddIpo handleClose={this.handleClose} open={this.state.show}/>
      </div >
    )
  }
}

export default Ipos;
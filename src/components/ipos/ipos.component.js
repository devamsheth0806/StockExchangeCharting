import { Component, createRef } from 'react';
import AddIpo from './addIpo';
import ipoServices from '../../services/ipo.services';
import Select from 'react-select';
import UserContext from '../../contexts/userContext';
import IpoDetails from './ipoDetails';
import { Container } from '@material-ui/core';
class Ipos extends Component {
  static contextType = UserContext;
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      show: false,
      showIpo: false,
      update: false,
      fetched: false,
      searchedIpo: [],
      ipo: null,
      ipos: [],
      id: null
    };
    this.searchRef = createRef();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowIpo = this.handleShowIpo.bind(this);
    this.handleCloseIpo = this.handleCloseIpo.bind(this);
    this.fetchAllIpos = this.fetchAllIpos.bind(this);
    this.dosearch = this.dosearch.bind(this);
  }

  handleShow(id) {
    this.setState({ show: true, id: id });
  }

  handleShowIpo(ipo) {
    this.setState({ showIpo: true, ipo });
  }

  handleClose() {
    this.setState({ show: false, update: true });
  }

  handleCloseIpo() {
    this.setState({ showIpo: false, ipo: null });
  }

  async fetchAllIpos() {
    if (this._isMounted) {
      const response = await ipoServices.getAllIpos();
      this.setState({
        ipos: response.data,
        fetched: true
      });
    }
  }

  async fetchIpoById(id) {
    if (this._isMounted) {
      const response = await ipoServices.getIpoById(id);
      this.setState({
        searchedIpo: [response.data],
        fetched: true
      });
    }
  }

  async delete(id) {
    if (this._isMounted) {
      await ipoServices.deleteIpo(id);
      this.setState({
        fetched: true
      })
    }
  }

  dosearch() {
    let searchval = this.searchRef.current.state.value;//get node value or text value
    if (searchval != null) {
      this.searchRef.current.state.value = null;
      this.fetchIpoById(searchval.value);
    }
    else {
      this.setState({
        searchedIpo: []
      })
      this.fetchAllIpos();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllIpos();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update) {
      this.fetchAllIpos();
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
    var ipos;
    if (this.state.searchedIpo.length > 0) {
      ipos = this.state.searchedIpo.map((ipo) => {
        return <tr key={ipo.id}>
          <td>
            <button className="btn btn-link btn-sm" onClick={() => this.handleShowIpo(ipo)}>
              {ipo.companyName}
            </button>
          </td>
          <td>{ipo.pricePerShare}</td>
          <td>{ipo.totalNumberOfShares}</td>
          <td>{ipo.openDateTime.split("T").join(" ")}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(ipo.id)}>
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
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(ipo.id)} >
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
      ipos = this.state.ipos.map((ipo) => {
        return <tr key={ipo.id}>
          <td>
            <button className="btn btn-link btn-sm" onClick={() => this.handleShowIpo(ipo)}>
              {ipo.companyName}
            </button>
          </td>
          <td>{ipo.pricePerShare}</td>
          <td>{ipo.totalNumberOfShares}</td>
          <td>{ipo.openDateTime.split("T").join(" ")}</td>
          {
            this.context.user == "ADMIN"
              ?
              <td>
                <button className="btn btn-success btn-sm" onClick={() => this.handleShow(ipo.id)}>
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
                <button className="btn btn-danger btn-sm" onClick={() => this.delete(ipo.id)} >
                  Delete
                </button>
              </td>
              :
              null
          }
        </tr>
      });
    }

    const ipoOptions = this.state.ipos.map(ipo => {
      return {
        label: ipo.companyName,
        value: ipo.id
      };
    });

    return (
      (!this.state.showIpo) ?
        (<div className="container">
          <div className="d-flex flex-row justify-content-center">
            <h1 className="text-primary">IPOs</h1>
          </div>
          <div className="d-flex flex-row m-2">
            <div className="m-1 flex-fill">
              <Select
                type="text"
                className="form-control"
                placeholder="Search IPOs"
                ref={this.searchRef}
                options={ipoOptions}
              />
            </div>
            <button className="btn btn-primary btn-block m-1" type="button" onClick={this.dosearch} >
              Go
            </button>
            {
              this.context.user == "ADMIN"
                ?
                <button className="btn btn-primary" onClick={this.handleShow}>Add IPO</button>
                :
                null
            }
          </div>
          <div className="d-flex flex-row">
            <table className="table table-striped">
              <thead className="thead-inverse thead-dark">
                <tr className="table-dark">
                  <th>Company name</th>
                  <th>Price Per Share</th>
                  <th>Number of Shares</th>
                  <th>Open Date Time</th>
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
                {ipos}
              </tbody>
            </table >
          </div>
          <AddIpo handleClose={this.handleClose} open={this.state.show} id={this.state.id} />
        </div >
        )
        :
        (
          <div className="container">
            <div className="row">
              <div className="col-xs-4">
                <button className="btn btn-primary m-2" onClick={this.handleCloseIpo} >Back</button>
              </div>
            </div>
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6 text-center">
                <IpoDetails ipo={this.state.ipo} />
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        )
    )
  }
}

export default Ipos;
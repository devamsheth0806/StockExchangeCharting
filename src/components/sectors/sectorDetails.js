import { Component } from 'react';
import sectorServices from '../../services/sector.services';
class SectorDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
    };
    this.fetchAllCompaniesBySector = this.fetchAllCompaniesBySector.bind(this);
  }

  async fetchAllCompaniesBySector(id) {
    if(this._isMounted){
    const response = await sectorServices.getSectorCompanies(id);
    this.setState({
      companies:response.data
    });}
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchAllCompaniesBySector(this.props.sector.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.sector != this.props.sector) {
      this.fetchAllCompaniesBySector(this.props.sector.id)
    }
  }

  componentWillUnmount(){
    this._isMounted=false;
  }

  render() {
    const companies = this.state.companies.map(company => {
      let stockExchanges = company.ipo.stockExchanges.map(stockExchange => {
        return stockExchange.name;
      })
      return <tr key={company.id}>
        <td>{company.companyName}</td>
        <td>{company.turnover}</td>
        <td>{company.ceo}</td>
        <td>{stockExchanges.join(",")}</td>
        <td>{company.companyBrief}</td>
      </tr>
    });
    return (
      <div className="container">
        <div className="d-flex flex-row justify-content-center">
          <h1 className="text-primary">{this.props.sector.sectorName}</h1>
        </div>
        <div className="d-flex flex-row">
          <table className="table table-striped">
            <thead className="thead-inverse thead-dark">
              <tr className="table-dark">
                <th>Company Name</th>
                <th>Turnover</th>
                <th>CEO</th>
                <th>Stock Exchanges</th>
                <th>Brief</th>
              </tr>
            </thead>
            <tbody>
              {companies}
            </tbody>
          </table >
        </div>
      </div >
    )
  }
}

export default SectorDetails;
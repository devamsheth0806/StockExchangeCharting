import { Card, CardContent, CardHeader, Grid, Paper } from "@material-ui/core";
import { Component } from "react";

class CompanyDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
  }
  render() {
    const company = this.props.company;
    const stockExchanges = company.ipo.stockExchanges.map(stockExchange => {
      return stockExchange.name;
    })
    return (
      <Card>
        <CardHeader title={`${company.companyName}`} />
        <CardContent>
          <Grid container spacing={2} >
            <Grid item xs={4} alignContent="flex-end">
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                Company Name
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                {company.companyName}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                CEO
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                {company.ceo}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                Board Of Directors
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                <ul>
                  {company.boardOfDirectors.split(",").map(element => {
                    return <li>{element}</li>
                  })
                  }
                </ul>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                Turnover
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                {company.turnover}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                Sector
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                {company.sector.sectorName}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                Stock Exchanges
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                {stockExchanges.join(", ")}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{ textAlign: "right", padding: "5px" }}>
                Brief
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{ textAlign: "left", padding: "5px" }}>
                {company.companyBrief}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

}

export default CompanyDetails;
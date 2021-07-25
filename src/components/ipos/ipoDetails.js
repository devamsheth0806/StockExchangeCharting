import { Card, CardContent, CardHeader, Grid, Paper } from "@material-ui/core";
import { Component } from "react";

class IpoDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
  }
  render() {
    const ipo = this.props.ipo;
    const stockExchanges = ipo.stockExchanges.map(stockExchange => {
      return stockExchange.name;
    })
    return (
      <Card>
        <CardHeader title={`IPO details of ${ipo.companyName}`} />
        <CardContent>
          <Grid container spacing={2} >
            <Grid item xs={4} alignContent="flex-end">
              <Paper style={{textAlign: "right", padding:"5px"}}>
                Company Name
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{textAlign: "left", padding:"5px"}}>
                {ipo.companyName}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{textAlign: "right", padding:"5px"}}>
                Open Date and Time
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{textAlign: "left", padding:"5px"}}>
                {ipo.openDateTime.split("T").join(" ")}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{textAlign: "right", padding:"5px"}}>
                Price Per Share
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{textAlign: "left", padding:"5px"}}>
                {ipo.pricePerShare}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{textAlign: "right", padding:"5px"}}>
                Number of Shares
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{textAlign: "left", padding:"5px"}}>
                {ipo.totalNumberOfShares}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{textAlign: "right", padding:"5px"}}>
                Stock Exchanges
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{textAlign: "left", padding:"5px"}}>
                {stockExchanges.join(", ")}
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={2} >
            <Grid item xs={4}>
              <Paper style={{textAlign: "right", padding:"5px"}}>
                Remarks
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper style={{textAlign: "left", padding:"5px"}}>
                {ipo.remarks}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

}

export default IpoDetails;
import React, { Component } from 'react';

import MetricUtils from '/src/app/shared/MetricUtils';
import GridList from 'material-ui/GridList';
import RaisedButton from 'material-ui/Button';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { red900, blue900, green900 } from 'material-ui/styles/colors';

import * as styles from './ForecastSummary.css';

const style = {
  backgroundColor: blue900,
};

export default class ForecastSummary extends Component {
  constructor(props) {
    super(props);

  }
  state = {
    height: '400px',
  };

  static propTypes = {
    metrics: React.PropTypes.array,
  };

  static defaultProps = {
    metrics: [],
  };

  renderTotalCost = () => {
    const metricsArray = this.props.timeAllocation;
    let totalCost = 0;
    for (let i = 0; i < metricsArray.length; i++){
      totalCost += metricsArray[i].CnB
    }
    return totalCost;
  }

  renderTotalRevenue = () => {
    const metricsArr = this.props.timeAllocation;
    let totalRevenue = 0;
    for (let i =0; i < metricsArr.length; i++) {
      totalRevenue += metricsArr[i].RnB
    }
    return totalRevenue;
  }

  renderCPR = () => {
    let cost = this.renderTotalCost();
    let revenue = this.renderTotalRevenue();
    const timeAllocationArray = this.props.timeAllocation;
    let addCPR = 0
    for (let i = 0; i < timeAllocationArray.length; i++) {
      addCPR += timeAllocationArray[i].nbCPR
    }
    let meanCPR = (addCPR/timeAllocationArray.length);
    return meanCPR.toPrecision(3);
  }

  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>Forecast Summary (Non-Brand)</h2>
        <Paper className={styles.totalsContainer} zDepth={2}>
          <Paper
            zDepth={0}
            className={styles.cprTotals}>
            <p className={styles.metricName}>Total Cost</p>
            <p className={styles.metrics}>{MetricUtils.toDollars(this.renderTotalCost())}</p>
          </Paper>
          <Paper
            zDepth={0}
            className={styles.cprTotals}>
            <p className={styles.metricName}>Total Revenue</p>
            <p className={styles.metrics}>{MetricUtils.toDollars(this.renderTotalRevenue())}</p>
          </Paper>
          <Paper
            zDepth={0}
            className={styles.cprTotals}>
            <p className={styles.metricName}>CPR</p>
            <p className={styles.metrics}>{this.renderCPR()}</p>
          </Paper>
        </Paper>
        <GridList className={styles.grid}>
          <Table
            className={styles.table}
            height={this.state.height}
            selectable
            multiSelectable>

            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                <TableHeaderColumn tooltip="Division">Division</TableHeaderColumn>
                <TableHeaderColumn tooltip="Engine">Engine</TableHeaderColumn>
                <TableHeaderColumn tooltip="BBID">BBID</TableHeaderColumn>
                <TableHeaderColumn tooltip="Device">Device</TableHeaderColumn>
                <TableHeaderColumn tooltip="Cost">Cost</TableHeaderColumn>
                <TableHeaderColumn tooltip="Revenue">Revenue</TableHeaderColumn>
              </TableRow>
            </TableHeader>

            <TableBody
              deselectOnClickaway
              displayRowCheckbox={false}
              showRowHover
              stripedRows>
              {this.props.metrics.map( (metric, index) => (
                <TableRow
                  key={index}
                  selected={metric.selected}>
                  <TableRowColumn>{metric.Date.split("T")[0]}</TableRowColumn>
                  <TableRowColumn>{metric.Division}</TableRowColumn>
                  <TableRowColumn>{metric.Engine}</TableRowColumn>
                  <TableRowColumn>{metric.BBID}</TableRowColumn>
                  <TableRowColumn>{metric.Device}</TableRowColumn>
                  <TableRowColumn>{MetricUtils.toDollars(metric.CnB)}</TableRowColumn>
                  <TableRowColumn>{MetricUtils.toDollars(metric.RnB)}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </GridList>
      </div>
    );
  }
}

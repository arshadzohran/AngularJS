import React, { Component } from 'react';
import FixedDataTable from 'fixed-data-table';
import MetricUtils from '/src/app/shared/MetricUtils';
import 'fixed-data-table/dist/fixed-data-table.min.css';

const {Table, Column, Cell} = FixedDataTable;

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class ForecastDataTable extends React.Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    metrics: React.PropTypes.array,
  };

  static defaultProps = {
    metrics: [],
  };

  render() {
    return (
      <Table
        rowHeight={50}
        rowsCount={this.props.metrics.length}
        headerHeight={50}
        width={1000}
        height={500}
        {...this.props}>
        {this.props.metrics.map((metric, index) => (
          <div>
            <Column
              header={<Cell>Date</Cell>}
              cell={<TextCell data={metric.Date} col="firstName" />}
              fixed={true}
              width={100}
            />
            <Column
              header={<Cell>Division</Cell>}
              cell={<TextCell data={metric.Division} col="lastName" />}
              fixed={true}
              width={100}
            />
            <Column
              header={<Cell>Engine</Cell>}
              cell={<TextCell data={metric.Engine} col="city" />}
              width={100}
            />
            <Column
              header={<Cell>BBID</Cell>}
              cell={<TextCell data={metric.BBID} col="street" />}
              width={200}
            />
            <Column
              header={<Cell>Device</Cell>}
              cell={<TextCell data={metric.Device} col="zipCode" />}
              width={200}
            />
            <Column
              header={<Cell>Cost</Cell>}
              cell={<TextCell data={MetricUtils.toDollars(metric.CnB)} col="email" />}
              width={200}
            />
            <Column
              header={<Cell>Revenue</Cell>}
              cell={<TextCell data={MetricUtils.toDollars(metric.RnB)} col="date" />}
              width={200}
            />
          </div>
        ))}
      </Table>
    );
  }
}

module.exports = ForecastDataTable;

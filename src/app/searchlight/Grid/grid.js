import React, { Component } from 'react';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/Button';
import GridList from 'material-ui/GridList';
import RaisedButton from 'material-ui/Button';
import ExpandLess from 'material-ui-next/SvgIcon/navigation/expand-less';
import ExpandMore from 'material-ui-next/SvgIcon/navigation/expand-more';

// Utils
import _ from 'lodash';
import MetricUtils from '/src/app/shared/MetricUtils';

import * as styles from './Grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    }
  }

  static propTypes = {
    metrics: React.PropTypes.array,
    metricFormat: React.PropTypes.object,
  };

  static defaultProps = {
    metrics: [],
    metricFormat: {},
  };

  handleGridExpandClick(event) {
    this.setState({expanded: !this.state.expanded});
  }

  renderTableHeader() {
    return Object.keys(this.props.metrics[0] || {}).map((metricKey) => (
      <TableHeaderColumn tooltip={metricKey}>{MetricUtils.upperFirstLetter(metricKey)}</TableHeaderColumn>
    ));
  }

  renderTableRows() {
    const self = this;
    return this.props.metrics.map((metric, index) => {
      const cols = Object.keys(metric).map((metricKey) => {
        const value = MetricUtils.applyMetricFormat(self.props.metricFormat[metricKey], metric[metricKey]);
        return <TableRowColumn>{value}</TableRowColumn>;
      });

      return (
        <TableRow
          key={_.uniqueId('grid_metric_')}
          selected={metric.selected}>
          {cols}
        </TableRow>
      );
    });
  }

  render() {
    return (
      <div className={`${this.props.className} ${styles.container}`}>
        <GridList className={this.state.expanded ? styles.gridListMore : styles.gridListLess}>
          <Table
            className={styles.gridTable}
            selectable
            multiSelectable>

            <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
              <TableRow>
                {this.renderTableHeader()}
              </TableRow>
            </TableHeader>

            <TableBody
              deselectOnClickaway
              displayRowCheckbox={false}
              showRowHover>
              {this.renderTableRows()}
            </TableBody>

          </Table>
        </GridList>

        <FlatButton
          className={styles.expandIcon}
          icon={this.state.expanded ? <ExpandLess /> : <ExpandMore />}
          onClick={this.handleGridExpandClick.bind(this)}
          primary={true}
          />

      </div>
    );
  }
};

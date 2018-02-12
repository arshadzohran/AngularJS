import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import MetricUtils from '/src/app/shared/MetricUtils';

import * as styles from './RecentList.css';

export default class RecentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      budget: '',
      division: null,
      endDate: null,
      startDate: null,
      efficiency_target: '',
      efficiency_type: null,
    }
  }

  static propTypes = {
    recentOpts: React.PropTypes.array,
  };

  static defaultProps = {
    recentOpts: [],
  };

  handleSelectRecent(index) {
    const filters = {
      budget: this.props.recentOpts[index].Budget,
      filters: MetricUtils.divisionToCombo(this.props.recentOpts[index].Combo),
      daterange: [this.props.recentOpts[index].StartDate, this.props.recentOpts[index].EndDate],
      cpr: this.props.recentOpts[index].EfficiencyTarget,
      returnfunction: 'ROAS',
    };
    console.log(filters);
  }

  render() {
    return (
      <div className={styles.container}>
      {this.props.recentOpts.map((recent, index) => (
          <Paper
            className={styles.recentsContainer}
            zDepth={2}
            key={index}
            onTouchTap={() => this.handleSelectRecent(index)}>
            <div className={styles.dateDiv}>
              <p><b>Date Range</b></p>
              <p>{recent.StartDate + ' to ' + recent.EndDate}</p>
            </div>
            <div className={styles.metaDiv}>
              <p><b>Budget</b></p>
              <p>{recent.Budget}</p>
            </div>
            <div className={styles.metaDiv}>
              <p><b>Efficiency Target</b></p>
              <p>{recent.EfficiencyTarget}</p>
            </div>
            <div className={styles.metaDiv}>
              <p><b>Efficiency Type</b></p>
              <p>{recent.ReturnFunction}</p>
            </div>
            <div className={styles.metaDiv}>
              <p><b>Division</b></p>
              <p>{recent.Combo}</p>
            </div>
          </Paper>
      ))}
      </div>
    );
  }
}

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { red500 } from 'material-ui/styles/colors';

import * as styles from './dashboards.css';

const style = {
  height: 150,
  width: 350,
  margin: 20,
  display: 'inline-block',
  backgroundColor: red500,
  color: '#FFF',
};

export default class Kpi extends Component {
  render() {
    return (
      <div className={styles.topRow}>
        <Paper
          style={style}
          zDepth={1}
          className={styles.paper}>
          <p className={styles.metrics}>276</p>
          <p className={styles.metricName}>Active Campaign Accounts</p>
        </Paper>
        <Paper
          style={style}
          zDepth={1}
          className={styles.paper}>
          <p className={styles.metrics}>8,455</p>
          <p className={styles.metricName}>Lines of Business</p>
        </Paper>
        <Paper
          style={style}
          zDepth={1}
          className={styles.paper}>
          <p className={styles.metrics}>98.6%</p>
          <p className={styles.metricName}>Click Conversion</p>
        </Paper>
        <Paper
          style={style}
          zDepth={1}
          className={styles.paper}>
          <p className={styles.metrics}>10.4K</p>
          <p className={styles.metricName}>Ads Produced Daily</p>
        </Paper>
      </div>
    )
  }
};

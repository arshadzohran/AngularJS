import React, { Component } from 'react';
import Kpi from './dashboard/kpi';
import Dashboard from './dashboard/dashboard';
import EditorBubbleChart from 'material-ui-next/SvgIcon/editor/bubble-chart';

import * as styles from './operations.css';

export default class Operations extends Component {
  render() {
    return (
      <div className={styles.operations}>
        <EditorBubbleChart style={{ height: '40px', width: '40px' }} />
        <h2 className={styles.header}>JCPenney Operations Dashboard</h2>
        <Kpi />
        <Dashboard />
      </div>
    )
  }
};

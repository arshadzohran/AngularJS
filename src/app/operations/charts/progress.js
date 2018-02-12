import React from 'react';

//Utils
import c3 from 'c3';

import * as styles from './progress.css';

export default class Progress extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  // static propTypes = {
  //  data: React.PropTypes.number,
  // };

  componentDidUpdate() {
    this.createChart(this.props);
  }

  createChart(props) {
    const chartId = props.chartId;
    const chartSelector = `#${chartId}`;
    // const data = props.data;

    let chart = c3.generate({
      data: {
        columns: [
          ['data', 51.4]
        ],
        type: 'gauge'
      },
      bindto: chartSelector,
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
        threshold: {
            values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 120,
      }
    });
  }

  render() {
    return (
      <div>
        <p className={styles.label}>{this.props.label}</p>
        <div id={this.props.chartId} />
      </div>
    );
  }
};

import React from 'react';

//Utils
import c3 from 'c3';

// Styles
import * as styles from './charts.css';

const chartId = "searchlightChart";
const chartSelector = `#${chartId}`;

export default class Charts extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    metrics: React.PropTypes.array,
  };

  componentDidUpdate() {
    this.createChart(this.props);
  }

  createChart(props) {
    const Sessions = props.metrics.map(metric => metric.conversions);

    Sessions.unshift('Sessions');

    let chart = c3.generate({
      data: {
        columns: [
          Sessions,
        ],
        types: {
          Sessions: 'area'
        }
      },
      bindto: chartSelector,
      size: {
        width: 1500,
        height: 400,
      }
    });
  }

  render() {
    return (
      <div className={`${this.props.className} ${styles.contentWrapper}`}>
        <h3 style={{paddingLeft: '2%'}} className={styles.header}>
          Client Hub / Extranet
        </h3>
        <p style={{paddingLeft: '2%'}}>Get the latest updates across all your campaigns in progress</p>
        <p style={{paddingLeft: '2%'}}>Client Hub Data: 3/6/2017 to 3/11/2017</p>

        <div className={styles.chartContainer}>
          <div
            id={chartId}
            className={styles.chartArea}>
          </div>
        </div>

      </div>
    );
  }
};
